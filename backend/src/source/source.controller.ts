import * as Sentry from "@sentry/node";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "../controllers/baseController";
import { ISourceService, SourcePaginationParams } from "./source.interfaces";
import { sourceMessages as msg } from "../constants/messages";
import { Logger } from "../utils/logger";
import { types } from "../types";

@injectable()
export class SourceController extends BaseController {
  constructor(
    @inject(types.SourceService) private readonly sourceService: ISourceService,
    @inject(types.Logger) logger: Logger,
  ) {
    super(logger);

    this.bindRoutes([{ path: "/", method: "get", func: this.getSources }]);
  }

  /**
   * GET /sources
   * @summary Get sources with pagination and optional search
   * @tags Sources
   * @param {integer} skip.query - Number of records to skip (default 0)
   * @param {integer} take.query - Number of records to take (default 6)
   * @param {string} search.query - Search by source / organization name
   * @return {array<SourceDTO>} 200 - List of sources - application/json
   */
  public async getSources(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skip, take, search } = req.query;

      const pagination: SourcePaginationParams = {
        skip: skip ? parseInt(skip as string, 10) : 0,
        take: take ? parseInt(take as string, 10) : 6,
      };

      const sources = await this.sourceService.findAll({
        pagination,
        search: search as string,
      });

      if (!sources.length) {
        res.status(200).json({ message: msg.SOURCES_NOT_FOUND });
        return;
      }
      res.status(200).json(sources);
    } catch (error) {
      Sentry.captureException(error);
      next(error);
    }
  }
}

/**
 * @typedef {object} SourceDTO
 * @property {number} id
 * @property {string} name   - Source / organization name
 * @property {string} link   - URL to the data source
 */
