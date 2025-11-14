import "reflect-metadata";
import { Container } from "inversify";
import { types } from "./types.js";
import { App } from "./app/app.js";
import { configService } from "./config/index.js";
import { logger } from "./utils/logger.js";
import router from "./routes/index.js";

const container = new Container();

container.bind(types.ConfigService).toConstantValue(configService);
container.bind(types.Logger).toConstantValue(logger);
container.bind(types.Router).toConstantValue(router);
container.bind(types.App).to(App);

export { container };
