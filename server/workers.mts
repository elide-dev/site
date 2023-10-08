import * as React from "react";
import { renderBlocking as render } from "../entry/server";
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

// @ts-ignore
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

async function serveAsset(url: URL, request: Request, env: any, ctx: any) {
  // slice URL to remove `/dist` prefix
  const cloned = new URL(request.url);
  cloned.pathname = url.pathname.slice(5);
  const assetReq = new Request(cloned, {
    headers: request.headers,
    method: request.method,
  });

  return await getAssetFromKV(
    {
      request: assetReq,
      waitUntil: ctx.waitUntil.bind(ctx),
    },
    {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: assetManifest,
    },
  );
}

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/dist") && request.method === "GET") {
      try {
        return serveAsset(url, request, env, ctx);
      } catch (err) {
        return new Response("Not found", {
          status: 404,
          statusText: "Not Found",
        });
      }
    }
    return await render(request);
  },
};
