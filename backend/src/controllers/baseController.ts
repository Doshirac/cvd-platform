import { Router } from "express";
import { IControllerRoute } from "./interfaces/IControllerRoute";
import { Logger } from "../utils/logger";

export abstract class BaseController {
    public readonly router: Router;
    protected readonly logger: Logger;
    private readonly boundRoutes: string[] = [];

    constructor(logger: Logger) {
        this.router = Router();
        this.logger = logger;
    }

    protected bindRoutes(routes: IControllerRoute[]): void {
        routes.forEach(({ path, method, func, middlewares = [] }) => {
            const handler = func.bind(this);
            const middlewareHandlers = middlewares.map((m) => m.execute.bind(m));
            this.router[method](path, ...middlewareHandlers, handler);
            this.boundRoutes.push(`${method.toUpperCase()} ${path}`);
        });

        if (this.logger?.logAvailableRoutes) {
            this.logger.logAvailableRoutes(this.boundRoutes);
        }
    }
}