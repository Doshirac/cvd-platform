import { redis } from "../cache/redisClient";
import { Disease } from "./disease.interfaces";
import { PaginationParams, DiseaseFilterParams } from "./disease.interfaces";

const TTL_SECONDS = 300; // 5 minutes
const TTL_LETTER_SECONDS = 300; // 5 minutes for letter-filtered lists

function makeKey(pagination: PaginationParams, filter: DiseaseFilterParams, language: string): string {
  const base = `diseases:${language}:${pagination.skip}:${pagination.take}`;
  const parts = [filter.symptom ?? "", filter.riskFactor ?? "", filter.search ?? ""];
  return `${base}:${parts.join(":")}`;
}

export async function getCachedDiseases(
  pagination: PaginationParams,
  filter: DiseaseFilterParams,
  language: string,
): Promise<Disease[] | null> {
  const key = makeKey(pagination, filter, language);
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as Disease[]) : null;
}

export async function setCachedDiseases(
  pagination: PaginationParams,
  filter: DiseaseFilterParams,
  language: string,
  data: Disease[],
): Promise<void> {
  const key = makeKey(pagination, filter, language);
  await redis.set(key, JSON.stringify(data), "EX", TTL_SECONDS);
}

function makeLetterKey(pagination: PaginationParams, letter: string, language: string): string {
  return `diseases_by_letter:${language}:${letter}:${pagination.skip}:${pagination.take}`;
}

export async function getCachedDiseasesByLetter(
  pagination: PaginationParams,
  letter: string,
  language: string,
): Promise<Disease[] | null> {
  const key = makeLetterKey(pagination, letter, language);
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as Disease[]) : null;
}

export async function setCachedDiseasesByLetter(
  pagination: PaginationParams,
  letter: string,
  language: string,
  data: Disease[],
): Promise<void> {
  const key = makeLetterKey(pagination, letter, language);
  await redis.set(key, JSON.stringify(data), "EX", TTL_LETTER_SECONDS);
}
