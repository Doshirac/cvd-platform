import * as Sentry from "@sentry/node";
import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "../controllers/baseController";
import { ISourceService, SourcePaginationParams } from "./source.interfaces";
import { sourceMessages as msg } from "../constants/messages";
import { Logger } from "../utils/logger";
import { createApiError } from "../errors/createApiError";
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
   * @param {integer} skip.query - Number of records to skip (default: 0, min: 0)
   * @param {integer} take.query - Number of records to take (default: 6, min: 1, max: 100)
   * @param {string} search.query - Search by source / organization name
   * @return {array<SourceDTO>} 200 - List of sources - application/json
   * @return {ErrorResponse} 400 - Invalid query parameters - application/json
   * @return {ErrorResponse} 500 - Internal server error - application/json
   * @example response - 200 - Success with results
   * [
   *   {
   *     "id": 1,
   *     "name": "World Health Organization",
   *     "link": "https://www.who.int"
   *   },
   *   {
   *     "id": 2,
   *     "name": "American Heart Association",
   *     "link": "https://www.heart.org"
   *   }
   * ]
   * @example response - 200 - No sources found
   * {
   *   "message": "No sources found"
   * }
   * @example response - 400 - Invalid skip parameter
   * {
   *   "success": false,
   *   "message": "Parameter 'skip' must be a non-negative integer"
   * }
   * @example response - 400 - Invalid take parameter
   * {
   *   "success": false,
   *   "message": "Parameter 'take' must be between 1 and 100"
   * }
   * @example response - 500 - Database connection error
   * {
   *   "success": false,
   *   "message": "Can't reach database server at localhost:5432",
   *   "stack": "PrismaClientInitializationError: ..."
   * }
   */
  public async getSources(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skip, take, search } = req.query;

      const skipValue = skip ? parseInt(skip as string, 10) : 0;
      const takeValue = take ? parseInt(take as string, 10) : 6;

      if (isNaN(skipValue) || skipValue < 0) {
        throw createApiError.badRequest(msg.SKIP_PARAM_INCORRECT);
      }

      if (isNaN(takeValue) || takeValue < 1 || takeValue > 100) {
        throw createApiError.badRequest(msg.TAKE_PARAM_INCORRECT);
      }

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
 * Source Data Transfer Object
 * @typedef {object} SourceDTO
 * @property {number} id
 * @property {string} name   - Source / organization name
 * @property {string} link   - URL to the data source
 */

/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {boolean} success - Always false for errors
 * @property {string} message.required - Human-readable error message
 * @property {array<string>} errors - Additional validation errors (optional)
 */