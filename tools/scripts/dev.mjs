import concurrently from "concurrently";

const { result } = concurrently([
  "pnpm run dev:client",
  "pnpm run dev:server",
  "open http://localhost:3000",
]);
result.then(
  () => console.info("Dev success."),
  (err) => console.error("Dev error", err),
);
