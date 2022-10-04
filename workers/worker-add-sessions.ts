import { createSessions } from "../graphql/add-sessions";
import {ConnectRedis, PubSub, PushToQueue, GetQueue} from "../lib/redis";
import InitGraphQL from "../lib/setup-graphql";

// ENV
require('dotenv').config();

// Ininitialize GraphQL
const client = InitGraphQL();

// Redis Pub/Sub
const redis = ConnectRedis();
const {subscriber, producer} = PubSub('channel');
const key = "user:queue:id"

subscriber.on("message", async (channel, message) => {
  const { id, season, episode, name } = JSON.parse(message)
  await PushToQueue(producer, key, {params: {id, season, episode, name}})
  const list = await GetQueue(key, redis);
    
  list.length < 50 ? list : list
    .filter(element => element.length > 0)
    .forEach(async element => 
      await createSessions({sessions: [JSON.parse(element)]}, client.adminRequestHeaders)
    .then(async () => await redis.del(key)),        
    console.log("Redis queue purged.")
)});