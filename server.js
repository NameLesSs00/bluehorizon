const http = require("http");
const next = require("next");

process.env.NODE_ENV = "production";

const dir = __dirname;
const rawPort = process.env.PORT || "3000";
const isNamedPipe =
  typeof rawPort === "string" && rawPort.startsWith("\\\\.\\pipe\\");
const hostname = process.env.HOSTNAME || "0.0.0.0";

const app = next({
  dev: false,
  dir,
  hostname: isNamedPipe ? undefined : hostname,
  port: isNamedPipe ? undefined : Number(rawPort) || 3000,
});

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      handle(req, res).catch((err) => {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
    });

    if (isNamedPipe) {
      server.listen(rawPort, () => {
        console.log(`> Blue Horizon ready on IIS named pipe: ${rawPort}`);
      });
    } else {
      const numericPort = Number(rawPort) || 3000;
      server.listen(numericPort, hostname, () => {
        console.log(`> Blue Horizon ready on http://${hostname}:${numericPort}`);
      });
    }
  })
  .catch((err) => {
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
