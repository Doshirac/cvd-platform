import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "../controllers/baseController";
import { IDiseaseService, PaginationParams, DiseaseFilterParams } from "./disease.interfaces";
import { diseaseMessages as msg } from "../constants/messages";
import { Logger } from "../utils/logger";
import { types } from "../types";
import { NextFunction } from "http-proxy-middleware/dist/types";

@injectable()
export class DiseaseController extends BaseController {
  constructor(
    @inject(types.DiseaseService) private readonly diseaseService: IDiseaseService,
    @inject(types.Logger) logger: Logger,
  ) {
    super(logger);

    this.bindRoutes([
      { path: "/", method: "get", func: this.getDiseases },
      { path: "/risk-factors", method: "get", func: this.getRiskFactors },
      { path: "/symptoms", method: "get", func: this.getSymptoms },
    ]);
  }

  /**
   * GET /diseases
   * @summary Retrieve diseases with pagination and filtering
   * @tags Diseases
   * @param {integer} skip.query - Number of records to skip
   * @param {integer} take.query - Number of records to take
   * @param {string} symptom.query - Filter by symptom (term or code)
   * @param {string} riskFactor.query - Filter by risk factor (name or code)
   * @param {string} search.query - Free text search across diseases, symptoms, risk factors
   * @param {string} locale.query - Language locale ("en" or "ru")
   * @return {array<Disease>} 200 - List of diseases - application/json
   */
  public async getDiseases(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skip, take, symptom, riskFactor, locale, search } = req.query;

      const pagination: PaginationParams = {
        skip: skip ? parseInt(skip as string, 10) : 0,
        take: take ? parseInt(take as string, 10) : 6,
      };

      const filter: DiseaseFilterParams = {
        symptom: symptom as string,
        riskFactor: riskFactor as string,
        search: search as string,
      };

      const language = locale === "ru" ? "ru" : "en";

      const diseases = await this.diseaseService.findAll({ pagination, filter, language });

      if (!diseases.length) {
        res.status(200).json({ message: msg.DISEASES_NOT_FOUND });
        return;
      }
      res.status(200).json(diseases);
    } catch (error) {
      Sentry.captureException(error);
      next(error);
    }
  }

  /**
   * GET /diseases/risk-factors
   * @summary Get all risk factors with codes
   * @tags Diseases
   * @param {string} locale.query - Language locale ("en" or "ru")
   * @return {array<RiskFactorDTO>} 200 - List of risk factors - application/json
   */
  public async getRiskFactors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { locale } = req.query;
      const language = locale === "ru" ? "ru" : "en";

      const riskFactors = await this.diseaseService.findAllRiskFactors(language);
      res.status(200).json(riskFactors);
    } catch (error) {
      Sentry.captureException(error);
      next(error);
    }
  }

  /**
   * GET /diseases/symptoms
   * @summary Get all symptoms with codes
   * @tags Diseases
   * @param {string} locale.query - Language locale ("en" or "ru")
   * @return {array<SymptomDTO>} 200 - List of symptoms - application/json
   */
  public async getSymptoms(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { locale } = req.query;
      const language = locale === "ru" ? "ru" : "en";

      const symptoms = await this.diseaseService.findAllSymptoms(language);
      res.status(200).json(symptoms);
    } catch (error) {
      Sentry.captureException(error);
      next(error);
    }
  }
}

/**
 * A Disease
 * @typedef {object} Disease
 * @property {number} id
 * @property {string} code
 * @property {string} name
 * @property {string} description
 * @property {string} prevention
 * @property {array<string>} symptoms
 * @property {array<string>} risks
 */

/**
 * A Risk Factor
 * @typedef {object} RiskFactorDTO
 * @property {string} code
 * @property {string} name.required
 * @property {string} definition
 */

/**
 * A Symptom
 * @typedef {object} SymptomDTO
 * @property {string} code
 * @property {string} term.required
 * @property {string} category
 */
