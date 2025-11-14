import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './interfaces/IMiddleware';

export class NotFoundMiddleware implements IMiddleware {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(req: Request, res: Response, next: NextFunction): void {
    res.status(404).json({ 
        success: false,
        message: `Resource not found: ${req.originalUrl}`,
    });
  }
}