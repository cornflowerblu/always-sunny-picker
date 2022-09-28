import { createClient } from "redis";
import { WebSocket } from "ws";

require('dotenv').config();
const WEB_SOCKET_PORT = 8000

async function BackgroundSessionWork(msg?: string) {

  const client = createClient({ url: process.env.STACKHERO_REDIS_URL_TLS })
  await client.connect();

  const subscriber = client.duplicate();
  await subscriber.connect();

  await subscriber.subscribe('channel', async (message) => {
    const msg = message;
    await BackgroundSessionWork(msg)
  });


  if (msg === undefined) {
    return
  } else {
    await client.LPUSH('user:queue:id', msg);
    // I had graphql here that REALLY should have worked....
  }
}

// Create & Start the WebSocket server
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT });
Promise.resolve().then(async () => await BackgroundSessionWork());


console.log("WebSocket server started at ws://locahost:" + WEB_SOCKET_PORT);

// Register event for client connection
server.on('connection', async function connection(ws) {
  ws.on('channel', async function (channel, message) {
    // some day we'll do something here...
  });
});