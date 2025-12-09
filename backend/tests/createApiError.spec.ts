import { ApiError, createApiError} from '../src/errors/index';

describe('createApiError', () => {
  it('creates badRequest error with default message', () => {
    const error = createApiError.badRequest();
    
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Bad Request');
    expect(error.errors).toEqual([]);
  });

  it('creates badRequest error with custom message', () => {
    const error = createApiError.badRequest('Invalid input');
    
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Invalid input');
  });

  it('creates badRequest error with custom message and errors', () => {
    const errors = ['Field "email" is required', 'Field "password" is too short'];
    const error = createApiError.badRequest('Validation failed', errors);
    
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Validation failed');
    expect(error.errors).toEqual(errors);
  });

  it('creates unauthorized error with default message', () => {
    const error = createApiError.unauthorized();
    
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Unauthorized');
    expect(error.errors).toEqual([]);
  });

  it('creates unauthorized error with custom message', () => {
    const error = createApiError.unauthorized('Auth required');
    
    expect(error.statusCode).toBe(401);
    expect(error.message).toBe('Auth required');
  });

  it('creates forbidden error with default message', () => {
    const error = createApiError.forbidden();
    
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Forbidden');
    expect(error.errors).toEqual([]);
  });

  it('creates forbidden error with custom message', () => {
    const error = createApiError.forbidden('Access denied');
    
    expect(error.statusCode).toBe(403);
    expect(error.message).toBe('Access denied');
  });

  it('creates notFound error with default message', () => {
    const error = createApiError.notFound();
    
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
    expect(error.errors).toEqual([]);
  });

  it('creates notFound error with custom message', () => {
    const error = createApiError.notFound('Resource not found');
    
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Resource not found');
  });

  it('creates methodNotAllowed error with default message', () => {
    const error = createApiError.methodNotAllowed();
    
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(405);
    expect(error.message).toBe('Method Not Allowed');
    expect(error.errors).toEqual([]);
  });

  it('creates methodNotAllowed error with custom message', () => {
    const error = createApiError.methodNotAllowed('POST method is not supported');
    
    expect(error.statusCode).toBe(405);
    expect(error.message).toBe('POST method is not supported');
  });

  it('creates conflict error with default message', () => {
    const error = createApiError.conflict();
    
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(409);
    expect(error.message).toBe('Conflict');
    expect(error.errors).toEqual([]);
  });

  it('creates conflict error with custom message', () => {
    const error = createApiError.conflict('Email already exists');
    
    expect(error.statusCode).toBe(409);
    expect(error.message).toBe('Email already exists');
  });

  it('creates internal error with default message', () => {
    const error = createApiError.internal();
    
    expect(error).toBeInstanceOf(ApiError);
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Internal Server Error');
    expect(error.errors).toEqual([]);
  });

  it('creates internal error with custom message', () => {
    const error = createApiError.internal('Database connection failed');
    
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Database connection failed');
  });

  it('creates internal error with custom message and errors', () => {
    const errors = ['Connection timeout', 'Retry limit exceeded'];
    const error = createApiError.internal('Service unavailable', errors);
    
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Service unavailable');
    expect(error.errors).toEqual(errors);
  });

  // Тест для проверки, что ошибки имеют правильный stack trace
  it('has stack trace', () => {
    const error = createApiError.badRequest('Test error');
    
    expect(error.stack).toBeDefined();
    expect(typeof error.stack).toBe('string');
    expect(error.stack).toContain('Test error');
  });

  // Тест для проверки, что это экземпляр Error
  it('is instance of Error', () => {
    const error = createApiError.badRequest();
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
  });
});
