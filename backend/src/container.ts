import "reflect-metadata";
import { Container } from "inversify";
import { types } from "./types.js";
import { App } from "./app/app.js";
import { configService } from "./config/index.js";
import { logger } from "./utils/logger.js";
import router from "./routes/index.js";
import { DiseaseController } from "./disease/disease.controller";
import { DiseaseService } from "./disease/disease.service";
import { DiseaseRepository } from "./disease/disease.repository";

const container = new Container();

container.bind(types.ConfigService).toConstantValue(configService);
container.bind(types.Logger).toConstantValue(logger);
container.bind(types.Router).toConstantValue(router);
container.bind(types.App).to(App);
container.bind(types.DiseaseController).to(DiseaseController);
container.bind(types.DiseaseService).to(DiseaseService);
container.bind(types.DiseaseRepository).to(DiseaseRepository);

export { container };
