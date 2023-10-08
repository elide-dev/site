
# elide website

This repository hosts the frontend code for the [Elide website][0]. It uses [Bun][1], [TypeScript][2], [React][3], [pnpm][4], [esbuild][5], [Cloudflare][6], [MUI][7], [Turbo][8], [Buildless][9], and, of course, [Elide][10].

## How it works

The dev stack for this project is designed to be flexible, with the ability to ship to servers like Express (on Node), Deno, Bun, and Elide. This allows benchmarking, testing, and development flexibility as those runtimes mature.

### Architecture

The Elide site uses [hybrid SSR][11]. In this serving model, the application is rendered <b>server side<b> on the initial page hit, and fully returned to the client (including styles).

Once the client receives the page, it is directed to download and execute a specialized client-side bundle which knows how to "rehydrate" the server-returned markup.

Part of the complexity handled by this app, and therefore provided for benchmarking/testing, involves the proper building, serving, and fast rendering of this ("hybrid SSR") model.

**Supported servers:**
- Express, via Node
- Cloudflare Workers
- Bun's built-in server
- Elide's built-in server
- Deno's built-in server

## Working on the code

The code is equipped with NPM scripts (run from `bun` or `pnpm`), and a `Makefile`.

### Structure

Most of the UI is in the `components` directory, and those are stitched together into the website via the `app` directory. This is then rendered via client/server use in the `entry` directory, and served via the `server` directory.

To summarize:
```
+ site
\
 |- app             # Main application (website) pages and logic.
 |- components      # Reusable React/Lit components.
 |- entry           # Entrypoints for client/server use.
 |- packages        # Utility and API packages.
 |- server          # Different server scripts.
 |- tools           # Build and dev tooling.
```

[0]: https://elide.dev
[1]: https://bun.sh
[2]: https://www.typescriptlang.org/
[3]: https://react.dev
[4]: https://pnpm.io/
[5]: https://esbuild.github.io/
[6]: https://workers.cloudflare.com
[7]: https://mui.com
[8]: https://turbo.build
[9]: https://less.build
[10]: https://github.com/elide-dev
[11]: https://web.dev/rendering-on-the-web/#streaming-server-side-rendering-and-progressive-rehydration
