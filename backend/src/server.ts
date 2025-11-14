import { appInstance } from "./main.js";
import { configService, Keys } from "./config/index.js";
import { logger } from "./utils/logger";
import { systemMessages } from "../src/constants/messages.js";

const port = configService.getNumber(Keys.PORT, 3000);
let isShuttingDown = false;

const server = appInstance.app.listen(port, () => {
  logger.log(`${systemMessages.SERVER_STARTED}${port}`);
});

// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.log(`${signal} ${systemMessages.GRACEFUL_SHUTDOWN_INITIATED}`);

  try {
    server.close(async (err?: Error) => {
      if (err) {
        logger.error(`${systemMessages.HTTP_SERVER_ERROR} ${err.message}`);
        process.exit(1);
      }

      logger.log(systemMessages.HTTP_SERVER_CLOSED);

      try {
        await cleanupResources();
        logger.log(systemMessages.RESOURCES_CLEANED);
        process.exit(0);
      } catch (cleanupError) {
        logger.error(`${systemMessages.CLEANUP_ERROR} ${cleanupError}`);
        process.exit(1);
      }
    });
  } catch (error) {
    logger.error(`${systemMessages.SHUTDOWN_ERROR} ${error}`);
    process.exit(1);
  }

  // Force shutdown after timeout
  setTimeout(() => {
    logger.error(systemMessages.SHUTDOWN_TIMEOUT);
    process.exit(1);
  }, 10000);
};

// Cleanup function for closing resources
const cleanupResources = async () => {
  // Example placeholders – replace with your actual cleanup logic
  // await dbConnection.close();
  // await redisClient.quit();
  // await someBackgroundWorker.stop();
};

["SIGINT", "SIGTERM"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error(`${systemMessages.UNHANDLED_REJECTION} ${reason}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error(`${systemMessages.UNCAUGHT_EXCEPTION} ${error.message}`);
  gracefulShutdown("Uncaught Exception");
});
