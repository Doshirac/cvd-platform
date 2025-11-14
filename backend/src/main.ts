// import "./config/instrument.js";
import { container } from "./container.js";
import { types } from "./types.js";
import { App } from "./app/app.js";

export const appInstance = container.get<App>(types.App);

// import * as Sentry from "@sentry/node";
// Sentry.captureException(new Error("Sentry is here! I will display errors in `sentry.io/issues`.`"));