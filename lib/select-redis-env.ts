import Redis from "ioredis";
import { parse } from "url";
import invariant from "tiny-invariant";
require('dotenv').config();

// Redis Variables
const REDIS_URL = process.env.REDIS_URL
invariant(REDIS_URL, "REDIS URL NOT SET!")
const redis_uri = parse(REDIS_URL);

// Local Dev
let redis;
export async function redisEnv(): Promise<Redis> {
  if (process.env.NODE_ENV === 'development') {
    return redis = new Redis(process.env.REDIS_URL || '', {
      tls: {
        rejectUnauthorized: false
      }
    });
  } else {
    // Production connection
    return redis = new Redis({
      port: Number(redis_uri.port) + 1,
      host: redis_uri.hostname || '',
      password: redis_uri.auth?.split(':')[1],
      db: 0,
      tls: {
        rejectUnauthorized: true,
        requestCert: true,
      },
      timeout: 0,
      retryStrategy(times: number): number {
        const delay = Math.min(times * 10, 1000);
        return delay;
      },
    });
  }
} (redisEnv);