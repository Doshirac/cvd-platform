export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogPayload = {
  message: string;
  meta?: Record<string, unknown>;
  error?: unknown;
};

export type Transport = (level: LogLevel, payload: LogPayload) => void;

export type SerializedError = {
  name: string;
  message: string;
  stack?: string;
};

export type ErrorEventMeta = {
  filename?: string;
  lineno?: number;
  colno?: number;
};
