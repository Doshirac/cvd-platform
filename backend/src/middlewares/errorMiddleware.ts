import { Request, Response, NextFunction } from 'express';
import { IErrorMiddleware } from './interfaces/IErrorMiddleware';
import { logger } from '../utils/logger';
import { configService, Keys } from '../config/index';
import { ApiError } from '../errors/index';
// import * as Sentry from '@sentry/node';

/**
 * Error handling middleware
 */
export class ErrorMiddleware implements IErrorMiddleware {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(err: Error, req: Request, res: Response, next: NextFunction): void {
        // Log error
        logger.error(`API Error: ${err.message}\nStack: ${err.stack}\nPath: ${req.path}\nMethod: ${req.method}`);
        // Report error to Sentry
        // Sentry.captureException(err);

        // Default error values
        const statusCode = (err as ApiError).statusCode || 500;
        const errors = (err as ApiError).errors || [];
        const message = statusCode === 500 && err.message === 'Server Error' ? 'Internal Server Error' : err.message;

        res.status(statusCode).json({
            success: false,
            message: message,
            errors: errors.length > 0 ? errors : undefined,
            // Include stack treace only in development
            stack: configService.get(Keys.NODE_ENV) === 'development' ? err.stack : undefined,
        });
    }
}