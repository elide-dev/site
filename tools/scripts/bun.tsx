import { withHtmlLiveReload } from "bun-html-live-reload";
import { renderCSR as render } from '../../entry/server';
// @ts-ignore
import { clientJs } from "./targets/client.mjs";

const port = 3000
const staticPath = "./dist"

export default withHtmlLiveReload({
  port,
  fetch: async (request: Request) => {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/dist')) {
      const filePath = staticPath + (url.pathname.slice(5));
      return new Response(Bun.file(filePath));
    }
    return render(request)
  },
}, {
  buildConfig: {
    ...clientJs,
    outdir: '.dev'
  }
});
