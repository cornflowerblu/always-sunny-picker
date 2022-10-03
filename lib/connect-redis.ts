import Redis from "ioredis"
import invariant from "tiny-invariant"

export default function ConnectRedis() {
  const REDIS_URL = process.env.REDIS_URL;
  invariant(REDIS_URL, "REDIS URL NOT SET!");
  return new Redis(REDIS_URL);
};
