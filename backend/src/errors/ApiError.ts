/**
 * Custom API Error class with additional propreties
 */
export class ApiError extends Error {
    statusCode: number;
    errors?: string[] | { field: string; errors: string[] }[]; 
    stack?: string;

    constructor(message: string, statusCode = 500, errors: string[] = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}