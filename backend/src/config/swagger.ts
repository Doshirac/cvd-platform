import path from "path";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { Application } from "express";
import { configService, Keys } from "./index";

/**
 * Configure Swagger/OpenAPI documentation
 * @param app Express application instance
 */
export const setupSwagger = (app: Application): void => {
  const isProd = process.env.NODE_ENV === "production";

  const options = {
    info: {
      version: "0.0.1",
      title: "News API",
      description: "A modern backend API for news content",
      license: { name: "MIT" },
      contact: {
        name: "Developer Team",
        url: "",
        email: "",
      },
    },
    security: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    // Set the base directory for the API files
    // In development (ts-node) → scan .ts files under src
    // In production (compiled) → scan .js files under dist
    baseDir: isProd ? path.resolve(process.cwd(), "dist") : path.resolve(process.cwd(), "src"),
    filesPattern: isProd
      ? ["./**/*.js"] // Scan compiled JavaScript files in production
      : ["./**/*.ts"], // Scan TypeScript source files in development

    // URL where SwaggerUI will be rendered
    swaggerUIPath: "/api-docs",
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose OpenAPI JSON Docs at a specific path
    exposeApiDocs: true,
    // Path to serve OpenAPI JSON Docs
    apiDocsPath: "/api-docs.json",
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // Customize Swagger UI appearance
    swaggerUiOptions: {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "News API Documentation",
      // Add cache busting
      cacheBust: Date.now().toString(),
    },
    // Define API servers
    servers: [
      {
        url: configService.get(Keys.API_URL) || "http://localhost:4000/api",
        description: "Development server",
      },
    ],
    // Force file re-scanning
    watch: process.env.NODE_ENV === "development",
  };

  // Initialize express-jsdoc-swagger -> returns validated Swagger spec in JSON format
  expressJSDocSwagger(app)(options);
};
