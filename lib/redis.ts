import Redis from "ioredis"
import invariant from "tiny-invariant"

// ENV
require('dotenv').config();

export function ConnectRedis(): Redis {
  const REDIS_URL = process.env.REDIS_URL;
  invariant(REDIS_URL, "REDIS URL NOT SET!");
  const redis = new Redis(REDIS_URL);
  return redis;
};

export function PubSub(channel: string): {subscriber: Redis, producer: Redis} {
  const redis = ConnectRedis();
  const subscriber = redis.duplicate();
  const producer = redis.duplicate();

  subscriber.subscribe(channel, async (err, count) => {
    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
      )
    }
  });

  return {subscriber, producer}
}

export async function PushToQueue(producer: Redis, key: string, {params} ): Promise<void> {
  try {
    await producer.lpop(key, 0);
    await producer.lpush(key, JSON.stringify(params));
    console.log('Items added to queue: ' + JSON.stringify(params))
  } catch (error) {
    console.error(error);
  }
}

export async function GetQueue(key: string, redis: Redis): Promise<Array<string>>{
  const list = await redis.lrange(key, 0, -1);
  return list;
}