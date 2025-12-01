import Redis from "ioredis";
import { configService, Keys } from "../config/index";

export const redis = new Redis({
  host: configService.get(Keys.REDIS_HOST) ?? "localhost",
  port: Number(process.env.REDIS_PORT ?? 6379),
});
