import { ApiError } from "./ApiError";
import { apiErrors as msg } from "../constants/messages";

/**
 * Function to create specific API errors
 */
export const createApiError = {
  badRequest: (message = msg.BAD_REQUEST, errors: string[] = []) => new ApiError(message, 400, errors),
  unauthorized: (message = msg.UNAUTHORIZED, errors: string[] = []) => new ApiError(message, 401, errors),
  forbidden: (message = msg.FORBIDDEN, errors: string[] = []) => new ApiError(message, 403, errors),
  notFound: (message = msg.NOT_FOUND, errors: string[] = []) => new ApiError(message, 404, errors),
  methodNotAllowed: (message = msg.METHOD_NOT_ALLOWED, errors: string[] = []) => new ApiError(message, 405, errors),
  conflict: (message = msg.CONFLICT, errors: string[] = []) => new ApiError(message, 409, errors),
  internal: (message = msg.INTERNAL_SERVER_ERROR, errors: string[] = []) => new ApiError(message, 500, errors),
};
