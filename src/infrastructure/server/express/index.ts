import express, { Express, RequestHandler } from "express";
import morgan from "morgan";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch" | "all";

export interface Route {
  path?: string;
  method: HttpMethod;
  handler: RequestHandler;
  middlewares?: RequestHandler[];
}

export interface Router {
  basePath: string;
  routes: Route[];
  middlewares?: RequestHandler[];
  requireAuth?: boolean;
}

export interface ServerConfig {
  routers: Router[];
  globalMiddlewares?: RequestHandler[];
  auth?: RequestHandler;
  enableRequestLogging?: boolean;
}

class ExpressServer {
  private readonly app: Express;
  private readonly methods: HttpMethod[] = [
    "get",
    "post",
    "put",
    "delete",
    "patch",
    "all",
  ];

  constructor(config: ServerConfig) {
    this.app = express();

    if (config.enableRequestLogging) {
      this.app.use(morgan("tiny"));
    }

    this.buildRouters(config);
    config.globalMiddlewares && this.app.use(...config.globalMiddlewares);
  }

  private buildRouters(config: ServerConfig) {
    config.routers.forEach((router) => {
      const newRouter = express.Router({ caseSensitive: true });

      if (router.requireAuth && config.auth) {
        newRouter.use(config.auth);
      }

      router.routes.forEach((route) => this.registerRoute(newRouter, route));

      this.app.use(router.basePath, ...(router.middlewares ?? []), newRouter);
    });
  }

  private registerRoute(router: express.Router, route: Route) {
    this.validateRoute(route);

    const path = route.path ?? "/";

    router[route.method](path, ...(route.middlewares ?? []), route.handler);

    console.log(`[${route.method.toUpperCase()}][${path}] -> route register`);
  }

  private validateRoute(route: Route) {
    if (!this.methods.includes(route.method)) {
      throw new Error(`${route.method} method is a not valid method`);
    }
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  }
}

export default ExpressServer;
