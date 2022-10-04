import { WebSocket } from "ws";
import { createSessions } from "../graphql/add-sessions";
import ConnectRedis from "../lib/connect-redis";
import InitGraphQL from "../lib/setup-graphql";


require('dotenv').config();
const WEB_SOCKET_PORT = 8000
const client = InitGraphQL();

// Create & Start the WebSocket server
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT });
console.log("WebSocket server started at ws://locahost:" + WEB_SOCKET_PORT);

// Redis Pub/Sub
const redis = ConnectRedis();
const subscriber = redis.duplicate();
const producer = subscriber.duplicate();

subscriber.subscribe('channel', async (err, count) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    )
  }
});

subscriber.on("message", async (channel, message) => {
  const msg = message;
  await BackgroundSessionWork(msg);

  const list = await GetQueue();
    if (list.length < 50) {
      console.log("Queue not ready to purge")
    } else {
      list
        .filter(element => element.length > 0)
        .forEach(async element => await createSessions({sessions: [JSON.parse(element)]}, client.adminRequestHeaders)
        .then(async () => await redis.del("user:queue:id"))
        .finally(() => console.log("Redis queue purged."))
      )};
});

// Functions
async function BackgroundSessionWork(msg: string): Promise<void> {
  try {
    producer.lpush('user:queue:id', msg);
    const { id, season, episode, name } = JSON.parse(msg)
    console.log('Items added to queue.' + JSON.stringify({
      id: id,
      season: season,
      episode: episode,
      name: name
    }))
  } catch (error) {
    console.error(error);
  }
}

async function GetQueue(): Promise<Array<string>>{
  const list = await redis.lrange("user:queue:id", 0, -1);
  return list;
}