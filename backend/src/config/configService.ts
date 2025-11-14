import dotenv from "dotenv";
import { Keys } from "./index";

dotenv.config();

export class ConfigService {
  get(key: Keys, defaultValue?: string): string {
    const value = process.env[key] ?? defaultValue;

    if (!value) {
      throw new Error(`Environment variable ${key} is required`);
    }

    return value;
  }

  getNumber(key: Keys, defaultValue?: number): number {
    return parseInt(this.get(key, defaultValue?.toString()), 10);
  }
}

export const configService = new ConfigService();
 