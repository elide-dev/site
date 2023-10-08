import { esmClient } from "../targets/client.mjs";

function status(msg) {
  console.log(`[elide-browser] ${msg}`);
}

status("Building client...");
await esmClient.build();

status("Watching for client changes...");
await esmClient.watch();
