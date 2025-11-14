import { Request, Response, NextFunction } from 'express';
import { IMiddleware} from "../../middlewares/interfaces/IMiddleware";
import { HTTPMethod } from '../types/controller.types';

export interface IControllerRoute {
    path: string;
    method: HTTPMethod;
    func: (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
    middlewares?: IMiddleware[];
}