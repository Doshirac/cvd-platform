import type { LogLevel, Transport, SerializedError, ErrorEventMeta } from './logger.types';
import { logMessages } from '@shared/constants/constants';

const levelOrder: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const safeSerializeError = (err: unknown): SerializedError | unknown => {
  if (err instanceof Error) {
    return { name: err.name, message: err.message, stack: err.stack };
  }
  return err;
};

const redactMeta = (meta?: Record<string, unknown>) => {
  if (!meta) return meta;
  const clone: Record<string, unknown> = { ...meta };
  const sensitive = ['authorization', 'cookie', 'set-cookie', 'token', 'password'];
  for (const k of Object.keys(clone)) {
    if (sensitive.includes(k.toLowerCase())) clone[k] = '[REDACTED]';
  }
  return clone;
};

export const createConsoleTransport = (service = 'frontend'): Transport => {
  return (level, payload) => {
    const time = new Date().toISOString();
    const meta = redactMeta(payload.meta);
    const error = payload.error ? safeSerializeError(payload.error) : undefined;
    const line = `[${time}] [${service}] ${level.toUpperCase()}: ${payload.message}`;
    const fn =
      level === 'debug'
        ? console.debug
        : level === 'info'
          ? console.info
          : level === 'warn'
            ? console.warn
            : console.error;
    fn(line, ...(meta ? [meta] : []), ...(error ? [error] : []));
  };
};

export class Logger {
  private readonly minLevel: LogLevel;
  private readonly transports: Transport[];

  constructor(opts: { minLevel: LogLevel; transports: Transport[] }) {
    this.minLevel = opts.minLevel;
    this.transports = opts.transports;
  }

  private shouldLog(level: LogLevel) {
    return levelOrder[level] >= levelOrder[this.minLevel];
  }

  private emit(level: LogLevel, message: string, meta?: Record<string, unknown>, error?: unknown) {
    if (!this.shouldLog(level)) return;
    for (const t of this.transports) t(level, { message, meta, error });
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.emit('debug', message, meta);
  }
  info(message: string, meta?: Record<string, unknown>) {
    this.emit('info', message, meta);
  }
  warn(message: string, meta?: Record<string, unknown>) {
    this.emit('warn', message, meta);
  }
  error(message: string, error?: unknown, meta?: Record<string, unknown>) {
    this.emit('error', message, meta, error);
  }
}

type ViteEnvLike = {
  VITE_LOG_LEVEL?: string;
  DEV?: boolean;
  MODE?: string;
};

const tryGetViteEnv = (): ViteEnvLike | undefined => {
  try {
    return new Function(
      'try { return import.meta && import.meta.env ? import.meta.env : undefined } catch { return undefined }'
    )() as ViteEnvLike | undefined;
  } catch {
    return undefined;
  }
};

const resolveMinLevel = (): LogLevel => {
  const viteEnv = tryGetViteEnv();
  const rawLevel = (viteEnv?.VITE_LOG_LEVEL ?? process.env.VITE_LOG_LEVEL) as string | undefined;
  const fromEnv = rawLevel?.toLowerCase() as LogLevel | undefined;
  if (fromEnv && fromEnv in levelOrder) return fromEnv;

  const isDev =
    typeof viteEnv?.DEV === 'boolean'
      ? viteEnv.DEV
      : (process.env.NODE_ENV ?? 'development') !== 'production';
  return isDev ? 'debug' : 'warn';
};

const resolveTransports = (): Transport[] => {
  const service = 'frontend';
  const transports: Transport[] = [createConsoleTransport(service)];
  return transports;
};

export const logger = new Logger({
  minLevel: resolveMinLevel(),
  transports: resolveTransports(),
});

export const setupGlobalErrorLogging = () => {
  window.addEventListener('error', (event: ErrorEvent) => {
    const meta: ErrorEventMeta = {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    };
    logger.error(logMessages.UNHANDLED_ERROR, event.error ?? event.message, meta);
  });

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    logger.error(logMessages.UNHANDLED_REJECTION, event.reason);
  });
};
