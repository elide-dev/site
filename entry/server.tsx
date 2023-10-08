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

const fontFamilies = [
  'Inter+Tight:wght@300;400;500;800',
  'Inter:wght@300;400;500;700',
  'JetBrains+Mono:wght@300;400;600',
].map((i) => `family=${i}`).join('&')

const fontSpec = [
  fontFamilies,
  'display=swap',
].join('&')

function renderFullPage(
  html: string,
  css: string,
  servingMode: string = "ssr",
) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Elide | Bun</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?${fontSpec}" rel="stylesheet">
    ${!!css ? '<meta name="emotion-insertion-point" content="" />' : ""}
    ${css}
  </head>
  <body data-serving-mode=${servingMode}>
    <${elementType} id="${elementId}">${html}</${elementType}>
    <script defer type="module" src="/dist/client.js"></script>
  </body>
</html>`;
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
  const headers = new Headers();
  headers.set("Content-Type", "text/html;charset=utf-8");
  return new Response(renderFullPage("", "", "csr"), {
    headers,
  });
}

export async function renderHtmlString(request: Request) {
  const { router } = await prepareServerRouter(request)
  const html = renderToString(<App cache={cache} router={router} />)
  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)
  const responseData = renderFullPage(html, emotionCss)
  return {
    responseData,
    html,
    emotionCss,
    emotionChunks,
  }
}

export async function renderBlocking(request: Request) {
  const { html } = await renderHtmlString(request)
  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)
  const headers = new Headers()
  headers.set("Content-Type", "text/html;charset=utf-8")
  return new Response(renderFullPage(html, emotionCss), {
    headers,
  })
}

const defaultUrl = new URL("https://elide.dev/");
const defaultRequest = new Request(defaultUrl.toString());

export async function renderStream(request?: Request) {
  const { router } = await prepareServerRouter(request || defaultRequest)
  return await renderToReadableStream(<App cache={cache} router={router} />)
}

export const render = renderStream;
