import * as React from "react";
import { Request as ExpressRequest } from "express";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import {
  renderToReadableStream,
  renderToString,
  // @ts-ignore
} from "react-dom/server.browser";
import {
  createStaticRouter,
  createStaticHandler,
  StaticHandlerContext,
} from "react-router-dom/server";
import { createFetchRequest } from "../app/util/fetch";
import { allRoutes } from "../app/routes";

import App from "../app/App";

import { elementId, elementType } from "../app/dom";

export function createEmotionCache() {
  return createCache({ key: "css" });
}

const cache = createEmotionCache();
const { extractCriticalToChunks, constructStyleTagsFromChunks } =
  createEmotionServer(cache);

const commonStyles = '/dist/app/styles/common.css'
const clientScript = '/dist/entry/client.js'

const fontFamilies = [
  'Inter+Tight:wght@300;400;500;800',
  'Inter:wght@300;400;500;700',
  'JetBrains+Mono:wght@300;400;600',
].map((i) => `family=${i}`).join('&')

const fontSpec = [
  fontFamilies,
  'display=swap',
].join('&')

export const htmlMinifyConfig = {
  do_not_minify_doctype: true,
  keep_spaces_between_attributes: true,
  keep_comments: false,
}

const assetNonce = __asset_nonce__

enum ResponseType {
  PAGE = 'page',
  ASSET = 'asset',
  API = 'api'
}

export function responseHeaders(headers: Headers, pageType: ResponseType) {
  // nothing yet
  if (pageType == ResponseType.PAGE) {
    headers.set("Content-Type", "text/html;charset=utf-8");
  }
  return headers;
}

function renderFullPage(
  html: string,
  css: string,
  servingMode: string = "ssr",
) {
  return `<!doctype html>
<html lang="en">
  <head>
    <title>Elide | Polyglot app runtime and framework, JVM-based Node alternative</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link href="${commonStyles}" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?${fontSpec}" rel="stylesheet">
    ${!!css ? '<meta name="emotion-insertion-point" content="" />' : ""}
    ${css}
  </head>
  <body data-serving-mode=${servingMode}>
    <${elementType} id="${elementId}">${html}</${elementType}>
    <script defer type="module" nonce="${assetNonce}" src="${clientScript}"></script>
  </body>
</html>`;
}

let serverInitialized = false;
async function initServer() {
  if (!serverInitialized) {
    serverInitialized = true;
    // nothing at this time
  }
}

async function prepareServerRouter(originalRequest: Request | ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(allRoutes);
  let request: Request;

  if ((originalRequest as ExpressRequest).get) {
    const express = originalRequest as ExpressRequest;
    request = createFetchRequest(express);
  } else {
    request = originalRequest as Request;
  }

  const context = await query(request);
  const router = createStaticRouter(
    dataRoutes,
    context as StaticHandlerContext,
  );
  return { router, context };
}

// @ts-ignore
export async function renderCSR(request: Request) {
  // initialize server, begin preparing headers/render
  await initServer();
  return new Response(renderFullPage("", "", "csr"), {
    headers: responseHeaders(new Headers(), ResponseType.PAGE),
  });
}

export async function renderHtmlString(request: Request) {
  // initialize server, begin rendering
  await initServer();
  const { router } = await prepareServerRouter(request)
  const html = renderToString(<App
    cache={cache}
    router={router}
    renderMode={'ssr'}
    location={request.url}
  />)

  // prepare style chunks, headers, render page, return
  const headers = responseHeaders(new Headers(), ResponseType.PAGE)
  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)
  const responseData = renderFullPage(html, emotionCss)
  return {
    responseData,
    html,
    emotionCss,
    emotionChunks,
    headers,
  }
}

export async function renderBlocking(request: Request) {
  // initialize server, begin rendering
  await initServer();
  const { html } = await renderHtmlString(request)
  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)

  // prepare response headers, render page, return
  return new Response(renderFullPage(html, emotionCss), {
    headers: responseHeaders(new Headers(), ResponseType.PAGE),
  })
}

const defaultUrl = new URL("https://elide.dev/");
const defaultRequest = new Request(defaultUrl.toString());

export async function renderStream(request?: Request) {
  await initServer();
  const { router } = await prepareServerRouter(request || defaultRequest)
  return await renderToReadableStream(<App
    cache={cache}
    router={router}
    renderMode={'ssr'}
    location={request?.url || '/'}
  />)
}

export async function renderStreamResponse(request?: Request) {
  await initServer();
  return new Response(await renderStream(request), {
    headers: responseHeaders(new Headers(), ResposeType.PAGE)
  })
}

export const render = renderStream;
