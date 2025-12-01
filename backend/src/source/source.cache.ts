import { redis } from "../cache/redisClient";
import { SourceDTO, SourcePaginationParams } from "./source.interfaces";

const TTL_SECONDS = 300; // 5 minutes

function makeKey(pagination: SourcePaginationParams, search?: string) {
  return `sources:${pagination.skip}:${pagination.take}:${search ?? ""}`;
}

export async function getCachedSources(
  pagination: SourcePaginationParams,
  search?: string,
): Promise<SourceDTO[] | null> {
  const key = makeKey(pagination, search);
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as SourceDTO[]) : null;
}

export async function setCachedSources(
  pagination: SourcePaginationParams,
  search: string | undefined,
  data: SourceDTO[],
): Promise<void> {
  const key = makeKey(pagination, search);
  await redis.set(key, JSON.stringify(data), "EX", TTL_SECONDS);
}
