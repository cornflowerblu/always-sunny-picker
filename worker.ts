import { WebSocket } from "ws";
import invariant from "tiny-invariant";
import Redis from "ioredis";
import ConnectRedis from "./lib/connect-redis";


require('dotenv').config();
const WEB_SOCKET_PORT = 8000
let subscriber;

async function BackgroundSessionWork(msg?: string): Promise<void> {

  const redis = ConnectRedis();

  const subscriber = redis.duplicate();

  const producer = subscriber.duplicate();

  subscriber.on("message", async (channel, message) => {
    const msg = message;
    await BackgroundSessionWork(msg);
  });


  await subscriber.subscribe('channel', async (err, count) => {

    if (err) {
      console.error("Failed to subscribe: %s", err.message);
    } else {
      console.log(
        `Subscribed successfully! This client is currently subscribed to ${count} channels.`
      )
    }
  });


  if (msg === undefined) {
    return
  } else {
    try {
      await producer.lpush('user:queue:id', msg);
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
}

// Create & Start the WebSocket server
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT });
Promise.resolve().then(async () => await BackgroundSessionWork());


console.log("WebSocket server started at ws://locahost:" + WEB_SOCKET_PORT);

// Register event for client connection
server.on('connection', async function connection(ws) {
  subscriber.on('channel', async function (channel, message) {
    // some day we'll do something here...
  });
});
