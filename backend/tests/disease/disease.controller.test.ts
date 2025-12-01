import request from "supertest";
import express, { Express } from "express";
import { DiseaseController } from "../../src/disease/disease.controller";
import { IDiseaseService } from "../../src/disease/disease.interfaces";
import { Logger } from "../../src/utils/logger";

describe("DiseaseController (e2e)", () => {
  let app: Express;
  let serviceMock: jest.Mocked<IDiseaseService>;

  beforeAll(() => {
    serviceMock = {
      findAll: jest.fn(),
      findAllRiskFactors: jest.fn(),
      findAllSymptoms: jest.fn(),
    } as unknown as jest.Mocked<IDiseaseService>;

    const logger = new Logger();

    app = express();
    app.use(express.json());

    const diseaseController = new DiseaseController(serviceMock, logger);
    app.use("/diseases", diseaseController.router);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /diseases → returns diseases", async () => {
    serviceMock.findAll.mockResolvedValue([
      { id: 1, code: "I10", name: "Hypertension", symptoms: ["Headache"], risks: ["Smoking"] },
    ]);

    const res = await request(app).get("/diseases");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(serviceMock.findAll).toHaveBeenCalledWith({
      pagination: { skip: 0, take: 6 },
      filter: {},
      language: "en",
    });
  });

  it("GET /diseases → pagination works", async () => {
    serviceMock.findAll.mockResolvedValue([]);

    await request(app).get("/diseases?skip=6&take=6");

    expect(serviceMock.findAll).toHaveBeenCalledWith({
      pagination: { skip: 6, take: 6 },
      filter: {},
      language: "en",
    });
  });

  it("GET /diseases?symptom=Headache", async () => {
    serviceMock.findAll.mockResolvedValue([]);

    await request(app).get("/diseases?symptom=Headache");

    expect(serviceMock.findAll).toHaveBeenCalledWith({
      pagination: { skip: 0, take: 6 },
      filter: { symptom: "Headache" },
      language: "en",
    });
  });

  it("GET /diseases?locale=ru → returns translated values", async () => {
    serviceMock.findAll.mockResolvedValue([
      { id: 1, code: "I10", name: "Гипертония", symptoms: [], risks: [] },
    ]);

    const res = await request(app).get("/diseases?locale=ru");

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe("Гипертония");
    expect(serviceMock.findAll).toHaveBeenCalledWith({
      pagination: { skip: 0, take: 6 },
      filter: {},
      language: "ru",
    });
  });

  it("GET /diseases → returns message if no diseases", async () => {
    serviceMock.findAll.mockResolvedValue([]);

    const res = await request(app).get("/diseases");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("No disease found.");
  });

  it("GET /diseases/risk-factors → returns risk factors (en by default)", async () => {
    serviceMock.findAllRiskFactors.mockResolvedValue([
      { code: "RF001", name: "Smoking", definition: "Tobacco use" },
    ]);

    const res = await request(app).get("/diseases/risk-factors");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(serviceMock.findAllRiskFactors).toHaveBeenCalledWith("en");
  });

  it("GET /diseases/risk-factors?locale=ru → passes ru to service", async () => {
    serviceMock.findAllRiskFactors.mockResolvedValue([
      { code: "RF001", name: "Курение", definition: "Употребление табака" },
    ]);

    const res = await request(app).get("/diseases/risk-factors?locale=ru");

    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe("Курение");
    expect(serviceMock.findAllRiskFactors).toHaveBeenCalledWith("ru");
  });

  it("GET /diseases/symptoms → returns symptoms (en by default)", async () => {
    serviceMock.findAllSymptoms.mockResolvedValue([
      { code: "S001", term: "Headache", category: "symptom" },
    ]);

    const res = await request(app).get("/diseases/symptoms");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(serviceMock.findAllSymptoms).toHaveBeenCalledWith("en");
  });

  it("GET /diseases/symptoms?locale=ru → passes ru to service", async () => {
    serviceMock.findAllSymptoms.mockResolvedValue([
      { code: "S001", term: "Головная боль", category: "symptom" },
    ]);

    const res = await request(app).get("/diseases/symptoms?locale=ru");

    expect(res.statusCode).toBe(200);
    expect(res.body[0].term).toBe("Головная боль");
    expect(serviceMock.findAllSymptoms).toHaveBeenCalledWith("ru");
  });
});
