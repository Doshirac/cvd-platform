import request from "supertest";
import express, { Express } from "express";
import { DiseaseController } from "../../src/disease/disease.controller";
import { IDiseaseService } from "../../src/disease/disease.interfaces";
import { Logger } from "../../src/utils/logger";
import { diseaseMessages as msg } from "../../src/constants/messages";
import { ErrorMiddleware } from "../../src/middlewares/errorMiddleware";

describe("DiseaseController (e2e)", () => {
  let app: Express;
  let serviceMock: jest.Mocked<IDiseaseService>;
  let errorMiddleware: ErrorMiddleware;

  beforeAll(() => {
    serviceMock = {
      findAll: jest.fn(),
      findAllRiskFactors: jest.fn(),
      findAllSymptoms: jest.fn(),
      findByAlphabet: jest.fn(),
    } as unknown as jest.Mocked<IDiseaseService>;

    const logger = new Logger();
    errorMiddleware = new ErrorMiddleware();

    app = express();
    app.use(express.json());

    const diseaseController = new DiseaseController(serviceMock, logger);
    app.use("/diseases", diseaseController.router);
    
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      errorMiddleware.execute(err, req, res, next);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /diseases", () => {
    it("returns diseases with default pagination", async () => {
      serviceMock.findAll.mockResolvedValue([
        { id: 1, code: "I10", name: "Hypertension", symptoms: ["Headache"], risks: ["Smoking"] },
      ]);

      const res = await request(app).get("/diseases");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("pagination works with custom skip and take", async () => {
      serviceMock.findAll.mockResolvedValue([]);

      await request(app).get("/diseases?skip=6&take=12");

      expect(serviceMock.findAll).toHaveBeenCalledWith({
        pagination: { skip: 6, take: 12 },
        filter: { symptom: undefined, riskFactor: undefined, search: undefined },
        language: "en",
      });
    });

    it("filters by symptom", async () => {
      serviceMock.findAll.mockResolvedValue([]);

      await request(app).get("/diseases?symptom=Headache");

      expect(serviceMock.findAll).toHaveBeenCalledWith({
        pagination: { skip: 0, take: 6 },
        filter: { symptom: "Headache", riskFactor: undefined, search: undefined },
        language: "en",
      });
    });

    it("returns translated values with locale=ru", async () => {
      serviceMock.findAll.mockResolvedValue([
        { id: 1, code: "I10", name: "Гипертония", symptoms: [], risks: [] },
      ]);

      const res = await request(app).get("/diseases?locale=ru");

      expect(res.statusCode).toBe(200);
      expect(res.body[0].name).toBe("Гипертония");
    });

    it("returns message when no diseases found", async () => {
      serviceMock.findAll.mockResolvedValue([]);

      const res = await request(app).get("/diseases");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBeDefined();
    });
  });

  describe("GET /diseases/by-letter and /diseases/letters", () => {
    it("returns diseases for a given letter", async () => {
      serviceMock.findByAlphabet.mockResolvedValue([
        { id: 1, code: "I10", name: "Hypertension", symptoms: ["Headache"], risks: ["Smoking"] },
      ]);

      const res = await request(app).get("/diseases/by-letter?letter=H");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it("forwards locale to service for letter search", async () => {
      serviceMock.findByAlphabet.mockResolvedValue([]);

      await request(app).get("/diseases/by-letter?letter=Г&locale=ru");

      expect(serviceMock.findByAlphabet).toHaveBeenCalledWith({
        pagination: { skip: 0, take: 6 },
        filter: { letter: "Г" },
        language: "ru",
      });
    });

    it("validates letter parameter", async () => {
      const res = await request(app).get("/diseases/by-letter?letter=AB");

      expect(res.statusCode).toBe(400);
    });
  });

  describe("GET /diseases - validation", () => {
    it("returns 400 when skip is negative", async () => {
      const res = await request(app).get("/diseases?skip=-5");

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(msg.SKIP_PARAM_INCORRECT);
    });

    it("returns 400 when skip is not a number", async () => {
      const res = await request(app).get("/diseases?skip=abc");

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(msg.SKIP_PARAM_INCORRECT);
    });

    it("returns 400 when take is zero", async () => {
      const res = await request(app).get("/diseases?take=0");

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(msg.TAKE_PARAM_INCORRECT);
    });

    it("returns 400 when take is greater than 100", async () => {
      const res = await request(app).get("/diseases?take=150");

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe(msg.TAKE_PARAM_INCORRECT);
    });

    it("accepts take=1 and take=100 (boundary values)", async () => {
      serviceMock.findAll.mockResolvedValue([]);

      const res1 = await request(app).get("/diseases?take=1");
      expect(res1.statusCode).toBe(200);

      const res2 = await request(app).get("/diseases?take=100");
      expect(res2.statusCode).toBe(200);
    });
  });

  describe("GET /diseases/risk-factors", () => {
    it("returns risk factors with default locale (en)", async () => {
      serviceMock.findAllRiskFactors.mockResolvedValue([
        { code: "RF001", name: "Smoking", definition: "Tobacco use" },
      ]);

      const res = await request(app).get("/diseases/risk-factors");

      expect(res.statusCode).toBe(200);
      expect(serviceMock.findAllRiskFactors).toHaveBeenCalledWith("en");
    });

    it("returns risk factors with locale=ru", async () => {
      serviceMock.findAllRiskFactors.mockResolvedValue([
        { code: "RF001", name: "Курение", definition: "Употребление табака" },
      ]);

      const res = await request(app).get("/diseases/risk-factors?locale=ru");

      expect(res.statusCode).toBe(200);
      expect(serviceMock.findAllRiskFactors).toHaveBeenCalledWith("ru");
    });

    it("handles errors", async () => {
      serviceMock.findAllRiskFactors.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/diseases/risk-factors");

      expect(res.statusCode).toBe(500);
    });
  });

  describe("GET /diseases/symptoms", () => {
    it("returns symptoms with default locale (en)", async () => {
      serviceMock.findAllSymptoms.mockResolvedValue([
        { code: "S001", term: "Headache", category: "symptom" },
      ]);

      const res = await request(app).get("/diseases/symptoms");

      expect(res.statusCode).toBe(200);
      expect(serviceMock.findAllSymptoms).toHaveBeenCalledWith("en");
    });

    it("returns symptoms with locale=ru", async () => {
      serviceMock.findAllSymptoms.mockResolvedValue([
        { code: "S001", term: "Головная боль", category: "symptom" },
      ]);

      const res = await request(app).get("/diseases/symptoms?locale=ru");

      expect(res.statusCode).toBe(200);
      expect(serviceMock.findAllSymptoms).toHaveBeenCalledWith("ru");
    });

    it("handles errors", async () => {
      serviceMock.findAllSymptoms.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/diseases/symptoms");

      expect(res.statusCode).toBe(500);
    });
  });
});
