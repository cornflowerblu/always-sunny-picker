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
    return redis = new Redis(process.env.REDIS_URL || '', {
      db: 0,
      tls: {
        rejectUnauthorized: true,
        requestCert: true,
      },
      retryStrategy(times: number): number {
        const delay = Math.min(times * 10, 1000);
        return delay;
      },
    });
  }
} (redisEnv);