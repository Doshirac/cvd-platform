import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import type { IncomingMessage, ServerResponse } from "http";
import type { ServerOptions } from "http-proxy";
import { logger } from "./utils/logger";
import { configService, Keys } from "./config/index";

const app = express();
const port = 8080;

const rawApiUrl = configService.get(Keys.API_URL);
const apiTarget = rawApiUrl.endsWith("/api") ? rawApiUrl.replace(/\/api$/, "") : rawApiUrl;

app.use(
  "/api",
  createProxyMiddleware<IncomingMessage, ServerResponse>({
    target: apiTarget,
    changeOrigin: true,
    cookieDomainRewrite: {
      "*": "localhost",
    },
    onProxyRes: (proxyRes: IncomingMessage) => {
      const headers = proxyRes.headers;
      const cookies = headers["set-cookie"];
      if (cookies) {
        headers["set-cookie"] = cookies.map((cookie: string) => cookie.replace(/; secure/gi, ""));
      }
    },
  } as ServerOptions),
);

app.use(
  "/",
  createProxyMiddleware<IncomingMessage, ServerResponse>({
    target: configService.get(Keys.CLIENT_URL),
    changeOrigin: true,
  }),
);

app.listen(port, () => {
  logger.log(`🚀 Dev proxy running at http://localhost:${port}`);
});
