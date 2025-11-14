import { Application } from "express";
import morgan from "morgan";
import { configService, Keys } from "../config/index";
import { logStream } from "./logger";

/**
 * Configure request logging middleware for the application
 * @param app Express application instance
 */
export const setupRequestLogger = (app: Application): void => {
  // Define the format based on environment
  const format =
    configService.get(Keys.NODE_ENV) === "development"
      ? "dev"
      : ":remote-addr :method :url :status :res[content-length] - :response-time ms";

  // Apply morgan middleware
  app.use(
    morgan(format as unknown as morgan.FormatFn, {
      stream: logStream,
      // Skip logging for health check endpoints to reduce noise
      skip: (req) => Boolean(req.url && (req.url === "/health" || req.url.startsWith("/health/"))),
    }),
  );
};
