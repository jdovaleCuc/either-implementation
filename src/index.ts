import ExpressServer, { ServerConfig } from "./infrastructure/server/express";
import { helloController } from "./infrastructure/server/express/controllers/hello.controller";
import userRouter from "./infrastructure/server/express/controllers/users";

const serverConfig: ServerConfig = {
  enableRequestLogging: true,
  routers: [
    {
      basePath: "/hello",
      routes: [{ method: "get", handler: helloController }],
    },
    userRouter,
  ],
};

async function bootstrap(serverConfig: ServerConfig) {
  const server = new ExpressServer(serverConfig);

  server.listen(3000);
}

bootstrap(serverConfig);
