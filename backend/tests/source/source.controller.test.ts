import { SourceController } from "../../src/source/source.controller";
import { ISourceService, SourceDTO } from "../../src/source/source.interfaces";
import { Logger } from "../../src/utils/logger";
import { sourceMessages as msg } from "../../src/constants/messages";

describe("SourceController", () => {
  let controller: SourceController;
  let serviceMock: jest.Mocked<ISourceService>;
  let logger: Logger;

  const createRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as any;
  };

  beforeEach(() => {
    serviceMock = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<ISourceService>;

    logger = new Logger();

    controller = new SourceController(serviceMock, logger);
  });

  it("GET /sources: builds pagination defaults and calls service", async () => {
    const req: any = { query: {} };
    const res = createRes();
    const next = jest.fn();

    const sources: SourceDTO[] = [
      { id: 1, name: "WHO", link: "https://who.int" },
    ];
    serviceMock.findAll.mockResolvedValue(sources);

    await controller.getSources(req, res, next);

    expect(serviceMock.findAll).toHaveBeenCalledWith({
      pagination: { skip: 0, take: 6 },
      search: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(sources);
    expect(next).not.toHaveBeenCalled();
  });

  it("GET /sources: parses query params and returns not-found message when empty", async () => {
    const req: any = {
      query: { skip: "10", take: "5", search: "cardio" },
    };
    const res = createRes();
    const next = jest.fn();

    serviceMock.findAll.mockResolvedValue([]);

    await controller.getSources(req, res, next);

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

  it("GET /sources: passes error to next", async () => {
    const req: any = { query: {} };
    const res = createRes();
    const next = jest.fn();

    const err = new Error("DB down");
    serviceMock.findAll.mockRejectedValue(err);

    await controller.getSources(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(err);
  });
});