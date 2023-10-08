import targets from "./targets/index.mjs";

async function runFullBuild() {
  return Promise.all(
    targets.allTargets.map((i) => {
      return new Promise((accept, reject) => {
        return i.invoke(accept, reject);
      });
    }),
  );
}
await runFullBuild();
