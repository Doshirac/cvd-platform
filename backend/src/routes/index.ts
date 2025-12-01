import { Router } from "express";
import { logger } from "../utils/logger";
import { HealthController } from "../controllers/healthController";
import { DiseaseController } from "../disease/disease.controller";
import { DiseaseService } from "../disease/disease.service";
import { DiseaseRepository } from "../disease/disease.repository";
import { SourceController } from "../source/source.controller";
import { SourceService } from "../source/source.service";
import { SourceRepository } from "../source/source.repository";

const router = Router();

const diseaseRepository = new DiseaseRepository();
const sourceRepository = new SourceRepository();

const diseaseService = new DiseaseService(diseaseRepository);
const sourceService = new SourceService(sourceRepository);

const healthController = new HealthController(logger);
const diseaseController = new DiseaseController(diseaseService, logger);
const sourceController = new SourceController(sourceService, logger);

router.use("/health", healthController.router);
router.use("/diseases", diseaseController.router);
router.use("/sources", sourceController.router);

/**
 * GET /
 * @summary Get API information
 * @tags API
 * @return {object} 200 - API info
 */
router.get("/", (_req, res) => {
  res.json({
    name: "CVD API",
    version: "0.0.1",
    description: "A modern backend API for CVD content",
  });
});

/**
 * GET /debug-sentry
 * @summary Debug endpoint for Sentry testing
 * @tags API
 * @return {Error} 500 - Internal server error (intentional)
 */
router.get("/debug-sentry", () => {
  throw new Error("Sentry testing error");
});

export default router;
