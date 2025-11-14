import winston from "winston";
import { configService, Keys } from "../config/index";

const formats = [winston.format.timestamp(), winston.format.json()];

const developmentFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}${info.splat ? info.splat : " "}`),
);

export class Logger {
  private logger = winston.createLogger({
    level: configService.get(Keys.LOG_LEVEL),
    format: winston.format.combine(...formats),
    defaultMeta: { service: "news-api" },
    transports: [
      new winston.transports.Console({
        format:
          configService.get(Keys.NODE_ENV) === "development" ? developmentFormat : winston.format.combine(...formats),
      }),
      new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  logAvailableRoutes(routes: string[]) {
    this.logger.info(`Available routes: ${routes.join(", ")}`);
  }

  init() {
    this.logger.info("Base controller initialized");
  }

  stop() {
    this.logger.info("Base controller stopped");
  }
}

export const logger = new Logger();

// Add a stream for Morgan middleware integration
export const logStream = {
  write: (message: string) => {
    logger.log(message.trim());
  },
};
