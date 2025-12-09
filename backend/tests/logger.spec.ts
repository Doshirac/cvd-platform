import { Logger, logStream } from '../src/utils/logger';
import winston from 'winston';

interface MockWinstonLogger {
  info: jest.Mock;
  warn: jest.Mock;
  error: jest.Mock;
}

jest.mock('winston', () => {
  const mockLogger: MockWinstonLogger = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  return {
    createLogger: jest.fn(() => mockLogger),
    format: {
      timestamp: jest.fn(() => ({})),
      json: jest.fn(() => ({})),
      colorize: jest.fn(() => ({})),
      printf: jest.fn(() => ({})),
      combine: jest.fn((...args: unknown[]) => args),
    },
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  };
});

describe('Logger', () => {
  let logger: Logger;
  let mockWinstonLogger: MockWinstonLogger;

  beforeEach(() => {
    jest.clearAllMocks();
    
    logger = new Logger();
    mockWinstonLogger = (winston.createLogger as jest.Mock).mock.results[0].value as MockWinstonLogger;
  });

  describe('log method', () => {
    it('calls winston info with message', () => {
      const message = 'Test info message';
      
      logger.log(message);
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith(message);
      expect(mockWinstonLogger.info).toHaveBeenCalledTimes(1);
    });

    it('handles multiple log calls', () => {
      logger.log('First message');
      logger.log('Second message');
      
      expect(mockWinstonLogger.info).toHaveBeenCalledTimes(2);
      expect(mockWinstonLogger.info).toHaveBeenNthCalledWith(1, 'First message');
      expect(mockWinstonLogger.info).toHaveBeenNthCalledWith(2, 'Second message');
    });
  });

  describe('warn method', () => {
    it('calls winston warn with message', () => {
      const message = 'Test warning message';
      
      logger.warn(message);
      
      expect(mockWinstonLogger.warn).toHaveBeenCalledWith(message);
      expect(mockWinstonLogger.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('error method', () => {
    it('calls winston error with message', () => {
      const message = 'Test error message';
      
      logger.error(message);
      
      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message);
      expect(mockWinstonLogger.error).toHaveBeenCalledTimes(1);
    });

    it('handles error messages with stack traces', () => {
      const errorMessage = 'Database connection failed\nStack: at line 42';
      
      logger.error(errorMessage);
      
      expect(mockWinstonLogger.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('logAvailableRoutes method', () => {
    it('logs available routes as comma-separated string', () => {
      const routes = ['/api/health', '/api/diseases', '/api/sources'];
      
      logger.logAvailableRoutes(routes);
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        'Available routes: /api/health, /api/diseases, /api/sources'
      );
    });

    it('handles empty routes array', () => {
      const routes: string[] = [];
      
      logger.logAvailableRoutes(routes);
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith('Available routes: ');
    });

    it('handles single route', () => {
      const routes = ['/api/health'];
      
      logger.logAvailableRoutes(routes);
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith('Available routes: /api/health');
    });
  });

  describe('init method', () => {
    it('logs initialization message', () => {
      logger.init();
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith('Base controller initialized');
    });
  });

  describe('stop method', () => {
    it('logs stop message', () => {
      logger.stop();
      
      expect(mockWinstonLogger.info).toHaveBeenCalledWith('Base controller stopped');
    });
  });

  describe('winston logger configuration', () => {
    it('creates logger with correct configuration', () => {
      expect(winston.createLogger).toHaveBeenCalled();
      
      const createLoggerCall = (winston.createLogger as jest.Mock).mock.calls[0][0] as {
        level: string;
        format: unknown;
        defaultMeta: { service: string };
        transports: unknown[];
      };
      
      expect(createLoggerCall).toHaveProperty('level');
      expect(createLoggerCall).toHaveProperty('format');
      expect(createLoggerCall).toHaveProperty('defaultMeta');
      expect(createLoggerCall.defaultMeta).toEqual({ service: 'news-api' });
      expect(createLoggerCall).toHaveProperty('transports');
    });

    it('configures Console transport', () => {
      expect(winston.transports.Console).toHaveBeenCalled();
    });

    it('configures File transport for errors', () => {
      expect(winston.transports.File).toHaveBeenCalledWith({
        filename: 'logs/error.log',
        level: 'error',
      });
    });
  });
});

describe('logStream', () => {
  let logger: Logger;
  let mockWinstonLogger: MockWinstonLogger;

  beforeEach(() => {
    jest.clearAllMocks();
    logger = new Logger();
    mockWinstonLogger = (winston.createLogger as jest.Mock).mock.results[0].value as MockWinstonLogger;
  });

  it('has write method', () => {
    expect(logStream).toHaveProperty('write');
    expect(typeof logStream.write).toBe('function');
  });

  it('write method trims and logs message', () => {
    const message = '  Test message with spaces  \n';
    
    logStream.write(message);
    
    expect(mockWinstonLogger.info).toHaveBeenCalledWith('Test message with spaces');
  });

  it('handles messages without extra whitespace', () => {
    const message = 'Clean message';
    
    logStream.write(message);
    
    expect(mockWinstonLogger.info).toHaveBeenCalledWith('Clean message');
  });

  it('can be used with Morgan middleware', () => {
    const morganMessage = 'GET /api/health 200 15ms\n';
    
    logStream.write(morganMessage);
    
    expect(mockWinstonLogger.info).toHaveBeenCalledWith('GET /api/health 200 15ms');
  });
});
