// import * as Sentry from "@sentry/node";
// import cookieParser from "cookie-parser";

import express, { Express, Router } from "express";
import cors from "cors";
import { injectable, inject } from "inversify";
import { ErrorMiddleware } from "../middlewares/errorMiddleware.js";
import { NotFoundMiddleware } from "../middlewares/notFoundMiddleware.js";
import { setupRequestLogger } from "../utils/requestLogger.js";
import { setupSwagger } from "../config/swagger.js";
import { Keys as keys } from "../config/keys";
import { types } from "../types.js";
import { ConfigService } from "../config/configService.js";
import { Logger } from "../utils/logger.js";
import { systemMessages } from "../constants/messages.js";

@injectable()
export class App {
  public app: Express;
  private configService: ConfigService;
  private router: Router;
  private logger: Logger;

  constructor(
    @inject(types.ConfigService) configService: ConfigService,
    @inject(types.Router) router: Router,
    @inject(types.Logger) logger: Logger,
  ) {
    this.app = express();
    // this.app.use(Sentry.Handlers.requestHandler());
    setupRequestLogger(this.app);
    setupSwagger(this.app);

    this.configService = configService;
    this.logger = logger;
    this.router = router;

    this.init();
  }

  public useMiddleware() {
    this.app
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(
        cors({
          origin: this.configService.get(keys.CORS_ORIGIN),
          credentials: true,
        }),
      );
  }

  public useRoutes() {
    this.app.use("/api", this.router);
    this.app.get("/", (req, res) => {
      res.redirect("/api-docs");
    });
  }

  public useExceptionFilters() {
    const errorHandler = new ErrorMiddleware();
    const notFoundHandler = new NotFoundMiddleware();

    this.app.use(notFoundHandler.execute.bind(notFoundHandler));
    this.app.use(errorHandler.execute.bind(errorHandler));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.logger.log(`Application configured in ${this.configService.get(keys.NODE_ENV)} mode`);
  }

  public close(): void {
    this.logger.log(systemMessages.RESOURCE_CLEAR);
  }
}
