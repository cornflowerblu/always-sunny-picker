import { WebSocket } from "ws";
import InitGraphQL from "../lib/setup-graphql";
import { createSessions } from "../graphql/add-sessions";
import ConnectRedis from "../lib/connect-redis";

require('dotenv').config();

const client = InitGraphQL();

const url = 'ws://localhost:8000'
const server = new WebSocket(url)
console.log("WebSocket client started");

// Redis Pub/Sub
const redis = ConnectRedis();

async function GetQueue(): Promise<Array<string>>{
  const list = await redis.lrange("user:queue:id", 0, -1);
  return list;
} 

server.on('message', async () => {
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



  