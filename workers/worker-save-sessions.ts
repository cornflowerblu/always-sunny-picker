import { WebSocket } from "ws";
import InitGraphQL from "../lib/setup-graphql";
import { createSessions } from "../graphql/add-sessions";
import ConnectRedis from "../lib/connect-redis";

require('dotenv').config();
const WEB_SOCKET_PORT = 8001

const client = InitGraphQL();

const server = new WebSocket.Server({ port: WEB_SOCKET_PORT });
console.log("WebSocket server started at ws://locahost:" + WEB_SOCKET_PORT);

// Redis Pub/Sub
const redis = ConnectRedis();

async function GetQueue(): Promise<Array<string>>{
  const list = await redis.lrange("user:queue:id", 0, -1);
  return list;
} 


Promise.resolve()
  .then(async () => (await GetQueue())
  .filter(element => element.length > 0)
  .forEach(async element => await createSessions({sessions: [JSON.parse(element)]}, client.adminRequestHeaders)))