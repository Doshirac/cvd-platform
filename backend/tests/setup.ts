import { jest } from "@jest/globals";
import type { Request, Response, NextFunction } from "express";

jest.mock("@sentry/node", () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  addBreadcrumb: jest.fn(),
  configureScope: jest.fn(),
  setTag: jest.fn(),
  setContext: jest.fn(),
  setUser: jest.fn(),
  Handlers: {
    requestHandler: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
    errorHandler: jest.fn(() => (err: Error, req: Request, res: Response, next: NextFunction) => next(err)),
  },
}));

process.env.SENTRY_DNS = "https://mock-dsn@fake-sentry.ingest.sentry.io/1234567";
process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "silent";
