import { Request, Response, NextFunction } from "express";
import { SourceController } from "../../src/source/source.controller";
import { ISourceService, SourceDTO } from "../../src/source/source.interfaces";
import { Logger } from "../../src/utils/logger";
import { sourceMessages as msg } from "../../src/constants/messages";

interface MockResponse {
  status: jest.Mock<MockResponse, [number]>;
  json: jest.Mock<MockResponse, [unknown]>;
}

interface MockRequest {
  query: Record<string, string | undefined>;
}

describe("SourceController", () => {
  let controller: SourceController;
  let serviceMock: jest.Mocked<ISourceService>;
  let logger: Logger;

  const createRes = (): MockResponse => {
    const res = {} as MockResponse;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<ISourceService>;

    logger = new Logger();

    controller = new SourceController(serviceMock, logger);
  });

  it("GET /sources: builds pagination defaults and calls service", async () => {
    const req: MockRequest = { query: {} };
    const res = createRes();
    const next = jest.fn();

    const sources: SourceDTO[] = [
      { id: 1, name: "WHO", link: "https://who.int" },
    ];
    serviceMock.findAll.mockResolvedValue(sources);

    await controller.getSources(req as Request, res as unknown as Response, next as NextFunction);

    expect(serviceMock.findAll).toHaveBeenCalledWith({
      pagination: { skip: 0, take: 6 },
      search: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(sources);
    expect(next).not.toHaveBeenCalled();
  });

  it("GET /sources: parses query params and returns not-found message when empty", async () => {
    const req: MockRequest = {
      query: { skip: "10", take: "5", search: "cardio" },
    };
    const res = createRes();
    const next = jest.fn();

    serviceMock.findAll.mockResolvedValue([]);

    await controller.getSources(req as Request, res as unknown as Response, next as NextFunction);

    expect(serviceMock.findAll).toHaveBeenCalledWith({
      pagination: { skip: 10, take: 5 },
      search: "cardio",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: msg.SOURCES_NOT_FOUND,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("GET /sources: passes database error to next", async () => {
    const req: MockRequest = { query: {} };
    const res = createRes();
    const next = jest.fn();

    const err = new Error("DB down");
    serviceMock.findAll.mockRejectedValue(err);

    await controller.getSources(req as Request, res as unknown as Response, next as NextFunction);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(err);
  });

  describe("skip parameter validation", () => {
    test.each([
      { skip: "-5", take: "10", description: "negative number" },
      { skip: "abc", take: "10", description: "not a number" },
      { skip: "-100", take: "10", description: "large negative number" },
    ])(
      "throws BadRequest error when skip is $description",
      async ({ skip, take }) => {
        const req: MockRequest = { query: { skip, take } };
        const res = createRes();
        const next = jest.fn();

        await controller.getSources(req as Request, res as unknown as Response, next as NextFunction);

        expect(next).toHaveBeenCalledTimes(1);

        const error = next.mock.calls[0][0] as { statusCode: number; message: string };
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe(msg.SKIP_PARAM_INCORRECT);
        expect(serviceMock.findAll).not.toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      }
    );
  });

  describe("take parameter validation", () => {
    test.each([
      { skip: "0", take: "0", description: "zero" },
      { skip: "0", take: "-1", description: "negative number" },
      { skip: "0", take: "101", description: "greater than 100" },
      { skip: "0", take: "150", description: "much greater than 100" },
      { skip: "0", take: "xyz", description: "not a number" },
    ])(
      "throws BadRequest error when take is $description",
      async ({ skip, take }) => {
        const req: MockRequest = { query: { skip, take } };
        const res = createRes();
        const next = jest.fn();

        await controller.getSources(req as Request, res as unknown as Response, next as NextFunction);

        expect(next).toHaveBeenCalledTimes(1);

        const error = next.mock.calls[0][0] as { statusCode: number; message: string };
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe(msg.TAKE_PARAM_INCORRECT);
        expect(serviceMock.findAll).not.toHaveBeenCalled();
      }
    );
  });

  describe("valid boundary values", () => {
    const sources: SourceDTO[] = [
      { id: 1, name: "WHO", link: "https://who.int" },
    ];

    beforeEach(() => {
      serviceMock.findAll.mockResolvedValue(sources);
    });

    test.each([
      { skip: "0", take: "1", description: "minimum take value" },
      { skip: "0", take: "100", description: "maximum take value" },
      { skip: "0", take: "50", description: "middle range take value" },
      { skip: "10", take: "20", description: "valid skip and take" },
    ])(
      "accepts $description (skip=$skip, take=$take)",
      async ({ skip, take }) => {
        const req: MockRequest = { query: { skip, take } };
        const res = createRes();
        const next = jest.fn();

        await controller.getSources(req as Request, res as unknown as Response, next as NextFunction);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(sources);
        expect(serviceMock.findAll).toHaveBeenCalledWith({
          pagination: { skip: parseInt(skip), take: parseInt(take) },
          search: undefined,
        });
      }
    );
  });
});
