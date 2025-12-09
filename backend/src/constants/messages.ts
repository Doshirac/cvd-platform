export const systemMessages = {
  RESOURCE_CLEAR: "Application resources cleaned up, shutting down",
  SERVER_STARTED: "Server started on http://localhost:",
  GRACEFUL_SHUTDOWN_INITIATED: "received - initiating graceful shutdown",
  HTTP_SERVER_ERROR: "Error during HTTP server close:",
  HTTP_SERVER_CLOSED: "HTTP server closed",
  RESOURCES_CLEANED: "All resources cleaned up successfully",
  CLEANUP_ERROR: "Error during resource cleanup:",
  SHUTDOWN_ERROR: "Unexpected error during shutdown:",
  SHUTDOWN_TIMEOUT: "Graceful shutdown timed out. Forcing exit.",
  UNHANDLED_REJECTION: "Unhandled Promise Rejection:",
  UNCAUGHT_EXCEPTION: "Uncaught Exception:",
};

export const diseaseMessages = {
  DISEASES_NOT_FOUND: "No disease found.",
  TAKE_PARAM_INCORRECT: "Parameter 'take' must be between 1 and 100",
  SKIP_PARAM_INCORRECT: "Parameter 'skip' must be a non-negative integer",
};

export const sourceMessages = {
  SOURCES_NOT_FOUND: "No source found.",
  SKIP_PARAM_INCORRECT: "Parameter 'skip' must be a non-negative integer",
  TAKE_PARAM_INCORRECT: "Parameter 'take' must be between 1 and 100",
};

export const apiErrors = {
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  METHOD_NOT_ALLOWED: "Method Not Allowed",
  CONFLICT: "Conflict",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
}
