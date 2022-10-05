import { createSessions } from "../graphql/add-sessions";
import { getCharactersWithImages } from "../graphql/get-character-with-image";
import { getSeasonsEpisodeCount } from "../graphql/season-episode-counts";
import { ConnectRedis, PubSub, PushToQueue, GetQueue } from "../lib/redis";
import InitGraphQL from "../lib/graphql";
import { safelyParseJSON } from "../lib/utils";

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
    const seasonEpisode = await getSeasonsEpisodeCount({}, client.adminRequestHeaders);
    const charactersWithImages = await getCharactersWithImages({ show: '950e38a3-3242-44dc-8585-fd30ced6627e' }, client.adminRequestHeaders)
    const item = seasonEpisode.seasons[Math.floor(Math.random() * seasonEpisode.seasons.length)];
    const season = item.season_number
    const episodeCount = item.episodes_aggregate.aggregate.count
    const episode = getEpisode(episodeCount)
    let random = Math.floor(Math.random() * charactersWithImages.characters.length);
    const character = charactersWithImages.characters[random]

    const result = { image: character.image_url, name: character.first_name, season: season, episode: episode }
    await PushToQueue(producer, key, { params: result })
  }
});

function getEpisode(max: number): number {
  return Math.floor(Math.random() * (max - 1) + 1);
}