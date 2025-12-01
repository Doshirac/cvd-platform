import * as Sentry from "@sentry/node";
import { configService } from "./configService";
import { Keys as keys } from "./keys";

Sentry.init({
  dsn: configService.get(keys.SENTRY_DSN),
  environment: configService.get(keys.NODE_ENV) || "development",
  sendDefaultPii: true,
  debug: false,
  tracesSampleRate: 1.0,
});
