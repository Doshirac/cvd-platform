import os from "os";
import { Request, Response } from "express";
import { configService, Keys } from "../config/index";
import { BaseController } from "./baseController";
import { Logger } from "../utils/logger";

/**
 * @typedef {object} MemoryInfo
 * @property {string} total
 * @property {string} free
 * @property {string} usage
 */

/**
 * @typedef {object} SystemInfo
 * @property {string} platform
 * @property {string} nodeVersion
 * @property {MemoryInfo} memory
 * @property {string} cpu
 * @property {number} cores
 */

/**
 * @typedef {object} HealthCheck
 * @property {string} status
 * @property {string} timestamp
 * @property {number} uptime
 * @property {string} environment
 * @property {SystemInfo} system
 */

/**
 * Health controller with detailed system information
 */
export class HealthController extends BaseController {
  constructor(logger: Logger) {
    super(logger);

    this.bindRoutes([
      { path: "/", method: "get", func: this.simpleHealthCheck },
      { path: "/details", method: "get", func: this.healthCheck },
    ]);
  }

  /**
   * GET /health/details
   * @summary Detailed health check
   * @tags Health
   * @return {HealthCheck} 200 - Detailed health information - application/json
   */

  public healthCheck(_req: Request, res: Response): void {
    const healthInfo = {
      status: "ok",
      timestamp: new Date(),
      uptime: process.uptime(),
      environment: configService.get(Keys.NODE_ENV),
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        memory: {
          total: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
          free: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
          usage: `${Math.round((1 - os.freemem() / os.totalmem()) * 100)}%`,
        },
        cpu: os.cpus()[0].model,
        cores: os.cpus().length,
      },
    };

    res.status(200).json(healthInfo);
  }

  /**
   * GET /health
   * @summary Simple health check
   * @tags Health
   * @return 204 - No Content
   */

  public simpleHealthCheck(_req: Request, res: Response): void {
    res.sendStatus(204);
  }
}
