import express, { Request, Response } from "express";
import { renderHtmlString as render } from "../entry/server";
import { createFetchRequest } from "../app/util/fetch";

// @ts-ignore
async function handleRender(req: Request, res: Response) {
  const fetchReq = createFetchRequest(req)
  const { responseData } = await render(fetchReq)

  // Send the rendered page back to the client.
  res.status(200).send(responseData);
}

const app = express();

app.use("/dist", express.static("dist"));
app.use("/assets", express.static("assets"));
app.use(handleRender);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
