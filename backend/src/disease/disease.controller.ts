import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "../controllers/baseController";
import { IDiseaseService, PaginationParams, DiseaseFilterParams } from "./disease.interfaces";
import { diseaseMessages as msg } from "../constants/messages";
import { Logger } from "../utils/logger";
import { types } from "../types";
import { NextFunction } from "http-proxy-middleware/dist/types";
import { createApiError } from "../errors";

@injectable()
export class DiseaseController extends BaseController {
  constructor(
    @inject(types.DiseaseService) private readonly diseaseService: IDiseaseService,
    @inject(types.Logger) logger: Logger,
  ) {
    super(logger);

    this.bindRoutes([
      { path: "/", method: "get", func: this.getDiseases },
      { path: "/by-letter", method: "get", func: this.getDiseasesByLetter },
      { path: "/risk-factors", method: "get", func: this.getRiskFactors },
      { path: "/symptoms", method: "get", func: this.getSymptoms },
    ]);
  }

  /**
   * GET /diseases
   * @summary Retrieve diseases with pagination and filtering
   * @tags Diseases
   * @param {integer} skip.query - Number of records to skip (default: 0, min: 0)
   * @param {integer} take.query - Number of records to take (default: 6, min: 1, max: 100)
   * @param {string} symptom.query - Filter by symptom (term or SNOMED code)
   * @param {string} riskFactor.query - Filter by risk factor (name or code)
   * @param {string} search.query - Free text search across diseases, symptoms, risk factors
   * @param {string} locale.query - Language locale ("en" or "ru", default: "en")
   * @return {array<Disease>} 200 - List of diseases - application/json
   * @return {ErrorResponse} 400 - Invalid query parameters - application/json
   * @return {ErrorResponse} 500 - Internal server error - application/json
   * @example response - 200 - Success with results
   * [
   *   {
   *     "id": 1,
   *     "code": "CAD",
   *     "name": "Coronary Artery Disease",
   *     "description": "A condition where the coronary arteries become narrowed or blocked",
   *     "prevention": "Regular exercise, healthy diet, quit smoking",
   *     "symptoms": ["chest pain", "shortness of breath", "fatigue"],
   *     "risks": ["smoking", "high cholesterol", "diabetes"]
   *   }
   * ]
   * @example response - 200 - No diseases found
   * {
   *   "message": "No diseases found"
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
   *   "message": "Can't reach database server at localhost:5432"
   * }
   */
  public async getDiseases(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { skip, take, symptom, riskFactor, locale, search } = req.query;

      const skipValue = skip ? parseInt(skip as string, 10) : 0;
      const takeValue = take ? parseInt(take as string, 10) : 6;

      if (isNaN(skipValue) || skipValue < 0) {
        throw createApiError.badRequest(msg.SKIP_PARAM_INCORRECT);
      }

      if (isNaN(takeValue) || takeValue < 1 || takeValue > 100) {
        throw createApiError.badRequest(msg.TAKE_PARAM_INCORRECT);
      }

      const pagination: PaginationParams = {
        skip: skipValue,
        take: takeValue,
      };

      const filter: DiseaseFilterParams = {
        symptom: symptom as string,
        riskFactor: riskFactor as string,
        search: search as string,
      };

      const language = locale === "ru" ? "ru" : "en";

      const diseases = await this.diseaseService.findAll({ pagination, filter, language });

      // Always return array (even empty) for consistent API response
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
   * @param {string} locale.query - Language locale ("en" or "ru", default: "en")
   * @return {array<RiskFactorDTO>} 200 - List of risk factors - application/json
   * @return {ErrorResponse} 500 - Internal server error - application/json
   * @example response - 200 - Success with results
   * [
   *   {
   *     "code": "SM",
   *     "name": "Smoking",
   *     "definition": "Tobacco use including cigarettes, cigars, and pipes"
   *   },
   *   {
   *     "code": "HG",
   *     "name": "High cholesterol",
   *     "definition": "Elevated levels of cholesterol in the blood"
   *   }
   * ]
   * @example response - 500 - Database error
   * {
   *   "success": false,
   *   "message": "Failed to fetch risk factors from database"
   * }
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

  public async getDiseasesByLetter(req: Request, res: Response, next: NextFunction): Promise<void> {
    /**
     * GET /diseases/by-letter
     * @summary Retrieve diseases by initial letter (locale-aware)
     * @tags Diseases
     * @param {string} letter.query - Initial letter to filter by (single character)
     * @param {integer} skip.query - Number of records to skip (default: 0)
     * @param {integer} take.query - Number of records to take (default: 6)
     * @param {string} locale.query - Language locale ("en" or "ru", default: "en")
     * @return {array<Disease>} 200 - List of diseases - application/json
     * @return {ErrorResponse} 400 - Invalid query parameters - application/json
     */
    try {
      const { skip, take, locale, letter } = req.query;

      const skipValue = skip ? parseInt(skip as string, 10) : 0;
      const takeValue = take ? parseInt(take as string, 10) : 6;

      if (isNaN(skipValue) || skipValue < 0) {
        throw createApiError.badRequest(msg.SKIP_PARAM_INCORRECT);
      }

      if (isNaN(takeValue) || takeValue < 1 || takeValue > 100) {
        throw createApiError.badRequest(msg.TAKE_PARAM_INCORRECT);
      }

      const letterStr = typeof letter === "string" ? letter.trim() : "";
      if (!letterStr || letterStr.length !== 1) {
        throw createApiError.badRequest(msg.LETTER_PARAM_INCORRECT || "Parameter 'letter' must be a single character");
      }

      const pagination: PaginationParams = {
        skip: skipValue,
        take: takeValue,
      };

      const filter: DiseaseFilterParams = {
        letter: letterStr,
      };

      const language = locale === "ru" ? "ru" : "en";

      const diseases = await this.diseaseService.findByAlphabet({ pagination, filter, language });

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
   * GET /diseases/symptoms
   * @summary Get all symptoms with codes
   * @tags Diseases
   * @param {string} locale.query - Language locale ("en" or "ru", default: "en")
   * @return {array<SymptomDTO>} 200 - List of symptoms - application/json
   * @return {ErrorResponse} 500 - Internal server error - application/json
   * @example response - 200 - Success with results
   * [
   *   {
   *     "code": "CP",
   *     "term": "Chest pain",
   *     "category": "Cardiovascular"
   *   },
   *   {
   *     "code": "SOB",
   *     "term": "Shortness of breath",
   *     "category": "Respiratory"
   *   }
   * ]
   * @example response - 500 - Database error
   * {
   *   "success": false,
   *   "message": "Failed to fetch symptoms from database"
   * }
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
 * @property {number} id - Disease identifier
 * @property {string} code - ICD-10 code
 * @property {string} name - Disease name
 * @property {string} description - Detailed description
 * @property {string} prevention - Prevention recommendations
 * @property {array<string>} symptoms - List of symptoms
 * @property {array<string>} risks - List of risk factors
 */

/**
 * A Risk Factor
 * @typedef {object} RiskFactorDTO
 * @property {string} code - Risk factor code
 * @property {string} name.required - Risk factor name
 * @property {string} definition - Risk factor definition
 */

/**
 * A Symptom
 * @typedef {object} SymptomDTO
 * @property {string} code - SNOMED CT code
 * @property {string} term.required - Symptom term
 * @property {string} category - Symptom category
 */
