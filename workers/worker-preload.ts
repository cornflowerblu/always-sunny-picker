import { createSessions } from "../graphql/add-sessions";
import { getCharactersWithImages } from "../graphql/get-character-with-image";
import { getSeasonsEpisodeCount } from "../graphql/season-episode-counts";
import { ConnectRedis, PubSub, PushToQueue, GetQueue } from "../lib/redis";
import InitGraphQL from "../lib/graphql";
import { safelyParseJSON } from "../lib/utils";
import { renderEpisode } from "../lib/shows";

// ENV
require('dotenv').config();

// Ininitialize GraphQL
const client = InitGraphQL();

// Redis Pub/Sub
const redis = ConnectRedis();
const { subscriber, producer } = PubSub('episode-cache');


subscriber.on("message", async (channel, message) => {

  const { id } = safelyParseJSON(message);

  if (id === null || id === undefined) {
    console.error('ID is null or undefined... moving on.')
    return;
  }

  const key = id;

  for (let i = 0; i <= 10; i++) {
    const {season, episode, character} = await renderEpisode(0);
    const result = { image: character.image_url, name: character.first_name, season: season, episode: episode }
    await PushToQueue(producer, key, { params: result })
  }
});