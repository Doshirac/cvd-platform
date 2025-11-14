import { Router } from "express";
import { logger } from "../utils/logger";
import { HealthController } from "../controllers/healthController";

const router = Router();

const healthController = new HealthController(logger);

router.use("/health", healthController.router);

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

export default router;
