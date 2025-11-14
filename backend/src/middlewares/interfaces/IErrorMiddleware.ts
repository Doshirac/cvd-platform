import { Request, Response, NextFunction } from 'express';

export interface IErrorMiddleware {
  execute(err: Error, req: Request, res: Response, next: NextFunction): void;
}