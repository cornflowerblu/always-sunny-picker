import { WebSocket } from "ws";
import InitGraphQL from "../lib/setup-graphql";
import { createSessions } from "../graphql/add-sessions";
import ConnectRedis from "../lib/connect-redis";
import net from 'net';

require('dotenv').config();

const client = InitGraphQL();

const url = process.env.WSS_URL || 'ws://localhost:8000'

let server;

function init() {
  testWebSocket();
}

function testWebSocket() {
  server = new WebSocket(url);

  server.onopen = function(evt) {
     onOpen(evt)
  };

  server.onclose = function(evt) {
     onClose(evt)
  };

  server.onerror = function(evt) {
     onError(evt)
  };
}

function onOpen(evt) {
  console.log("CONNECTED");
  console.log("WebSocket client ready....");
}

function onClose(evt) {
  console.log("DISCONNECTED");
  init();
}

function onError(evt) {
  console.log("ERROR");
} 

init();

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