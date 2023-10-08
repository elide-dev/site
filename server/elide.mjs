// access the built-in HTTP server engine
const app = Elide.http;

// register a route handler
app.router.handle("GET", "/hello/:name", (request, response, context) => {
  // respond using the captured path variables
  response.send(200, `Hello, ${context.params.name}`);
});

// configure the server binding options
app.config.port = 3000;

// receive a callback when the server starts
app.config.onBind(() => {
  console.log(`Server listening at "http://localhost:${app.config.port}"! 🚀`);
});

// start the server
app.start();
