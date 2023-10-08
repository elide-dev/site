import * as client from "./client.mjs";
import * as server from "./server.mjs";

export default {
  allTargets: client.allTargets.concat(server.allTargets),
};

export * from "./client.mjs";
export * from "./server.mjs";
