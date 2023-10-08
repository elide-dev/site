import * as React from 'react';
import { renderToReadableStream, renderToString } from 'react-dom/server.browser';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';
import App from '../app/App';

export function createEmotionCache() {
  return createCache({ key: 'css' });
}

const cache = createEmotionCache();
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);


function renderFullPage(html: string, css: string, servingMode: string = 'ssr') {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Elide | Bun</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
    />
    ${!!css ? '<meta name="emotion-insertion-point" content="" />' : ''}
    ${css}
  </head>
  <body data-serving-mode=${servingMode}>
    <div id="root">${html}</div>
    <script defer type="module" src="/dist/client.js"></script>
  </body>
</html>`;
}

export async function renderCSR(request: Request) {
  const headers = new Headers();
  headers.set('Content-Type', 'text/html;charset=utf-8');
  return new Response(renderFullPage('', '', 'csr'), {
    headers
  });
}

export async function renderBlocking(request: Request) {
  const html = renderToString(<App cache={cache} />);
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  const headers = new Headers();
  headers.set('Content-Type', 'text/html;charset=utf-8');
  return new Response(renderFullPage(html, emotionCss), {
    headers
  });
}

export async function renderStream(request?: Request) {
  return await renderToReadableStream(<App cache={cache} />);
}

export const render = renderStream;
