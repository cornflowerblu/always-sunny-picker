import Redis from "ioredis"
import invariant from "tiny-invariant"

export default function ConnectRedis(): Redis {
  const REDIS_URL = process.env.REDIS_URL;
  invariant(REDIS_URL, "REDIS URL NOT SET!");
  const redis = new Redis(REDIS_URL);
  return redis;
};
