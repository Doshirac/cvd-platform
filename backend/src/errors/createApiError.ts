import { ApiError } from './ApiError';

/**
 * Function to create specific API errors
 */
export const createApiError = {
    badRequest: (message = 'Bad Request', errors: string[] = []) => new ApiError(message, 400, errors),
    unauthorized: (message = 'Unauthorized', errors: string[] = []) => new ApiError(message, 401, errors),
    forbidden: (message = 'Forbidden', errors: string[] = []) => new ApiError(message, 403, errors),
    notFound: (message = 'Not Found', errors: string[] = []) => new ApiError(message, 404, errors),
    methodNotAllowed: (message = 'Method Not Allowed', errors: string[] = []) => new ApiError(message, 405, errors),
    conflict: (message = 'Conflict', errors: string[] = []) => new ApiError(message, 409, errors),
    internal: (message = 'Internal Server Error', errors: string[] = []) => new ApiError(message, 500, errors),
}