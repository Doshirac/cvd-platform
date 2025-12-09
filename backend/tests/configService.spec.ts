import { ConfigService } from '../src/config/configService';
import { Keys } from '../src/config/keys';

describe('ConfigService', () => {
  let configService: ConfigService;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    
    configService = new ConfigService();
  });

  afterEach(() => {

    process.env = originalEnv;
  });

  describe('get method', () => {
    it('returns environment variable value when it exists', () => {
      process.env[Keys.NODE_ENV] = 'test';
      
      const result = configService.get(Keys.NODE_ENV);
      
      expect(result).toBe('test');
    });

    it('returns default value when env variable is not set', () => {
      delete process.env[Keys.PORT];
      
      const result = configService.get(Keys.PORT, '3000');
      
      expect(result).toBe('3000');
    });

    it('returns actual value even if default is provided', () => {
      process.env[Keys.NODE_ENV] = 'production';
      
      const result = configService.get(Keys.NODE_ENV, 'development');
      
      expect(result).toBe('production');
    });

    it('handles empty string as valid value', () => {
      process.env[Keys.API_URL] = '';
      
      expect(() => {
        configService.get(Keys.API_URL);
      }).toThrow(`Environment variable ${Keys.API_URL} is required`);
    });

    it('handles whitespace values', () => {
      process.env[Keys.LOG_LEVEL] = '  ';
      
      const result = configService.get(Keys.LOG_LEVEL);
      
      expect(result).toBe('  ');
    });
  });

  describe('getNumber method', () => {
    it('returns number from environment variable', () => {
      process.env[Keys.PORT] = '4000';
      
      const result = configService.getNumber(Keys.PORT);
      
      expect(result).toBe(4000);
      expect(typeof result).toBe('number');
    });

    it('returns default number when env variable is not set', () => {
      delete process.env[Keys.PORT];
      
      const result = configService.getNumber(Keys.PORT, 3000);
      
      expect(result).toBe(3000);
    });

    it('returns NaN for non-numeric string', () => {
      process.env[Keys.PORT] = 'not-a-number';
      
      const result = configService.getNumber(Keys.PORT);
      
      expect(result).toBeNaN();
    });

    it('throws error when env variable is missing and no default', () => {
      delete process.env[Keys.PORT];
      
      expect(() => {
        configService.getNumber(Keys.PORT);
      }).toThrow(`Environment variable ${Keys.PORT} is required`);
    });

    it('handles negative numbers', () => {
      process.env[Keys.PORT] = '-100';
      
      const result = configService.getNumber(Keys.PORT);
      
      expect(result).toBe(-100);
    });

    it('handles zero', () => {
      process.env[Keys.PORT] = '0';
      
      const result = configService.getNumber(Keys.PORT);
      
      expect(result).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('handles floating point numbers in getNumber', () => {
      process.env[Keys.PORT] = '3000.5';
      
      const result = configService.getNumber(Keys.PORT);
      
      expect(result).toBe(3000);
    });
  });

  describe('multiple calls', () => {
    it('returns consistent results on multiple calls', () => {
      process.env[Keys.NODE_ENV] = 'production';
      
      const result1 = configService.get(Keys.NODE_ENV);
      const result2 = configService.get(Keys.NODE_ENV);
      const result3 = configService.get(Keys.NODE_ENV);
      
      expect(result1).toBe('production');
      expect(result2).toBe('production');
      expect(result3).toBe('production');
    });

    it('reflects env variable changes between calls', () => {
      process.env[Keys.NODE_ENV] = 'development';
      const result1 = configService.get(Keys.NODE_ENV);
      
      process.env[Keys.NODE_ENV] = 'production';
      const result2 = configService.get(Keys.NODE_ENV);
      
      expect(result1).toBe('development');
      expect(result2).toBe('production');
    });
  });
});
