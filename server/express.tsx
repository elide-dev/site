import express, { Request, Response } from "express";
import { minify } from "@minify-html/wasm";
import { renderHtmlString as render, htmlMinifyConfig } from "../entry/server";
import { createFetchRequest } from "../app/util/fetch";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function response(res: Response, status: number, headers: Headers) {
  res.status(status)
  if (headers) {
    headers.forEach((value, key) => {
      res.set(key, value)
    })
  }
  return res
}

// @ts-ignore
async function handleRender(req: Request, res: Response) {
  const fetchReq = createFetchRequest(req)
  const { responseData, headers } = await render(fetchReq)
  let returnData = responseData;
  if (headers && (headers.get('Content-Type') || '').indexOf('html') !== -1) {
    returnData = decoder.decode(minify(
      encoder.encode(responseData),
      htmlMinifyConfig,
    ))
  }

  // Send the rendered page back to the client.
  response(res, 200, headers).send(returnData)
}

const app = express();

app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));
app.use(handleRender);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
