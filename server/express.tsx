import express, { Request, Response } from "express";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import App from "@site/App";

export function createEmotionCache() {
  return createCache({ key: "css" });
}

function renderFullPage(html: string, css: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Elide | Expres</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
    />
    <meta name="emotion-insertion-point" content="" />
    ${css}
  </head>
  <body data-serving-mode=ssr>
    <main id="root">${html}</main>
    <script defer type="module" src="/dist/client.js"></script>
  </body>
</html>`;
}

function handleRender(req: Request, res: Response) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(<App cache={cache} />);

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, emotionCss));
}

const app = express();

app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));
app.use(handleRender);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
