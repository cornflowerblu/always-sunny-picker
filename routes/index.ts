import express, { NextFunction, Request, Response } from "express";
import { getSeasonsEpisodeCount } from "../graphql/season-episode-counts";
import { adminRequestHeaders } from "../app";
import { characters } from '../constants/characters'
import { getCharactersWithImages } from "../graphql/get-character-with-image";

const router = express.Router();

// The OG shuffler pulling from memory w/o all episodes because they vary per season
router.get('/v1', (req: Request, res: Response, next: NextFunction) => {
  const season = getSeasonOrEpisode(1, 15);
  const episode = getSeasonOrEpisode(1, 10)

  let random = Math.floor(Math.random() * characters.length);

  const character = characters[random]
  Promise.resolve().then(() => res.render('index',
    {
      title: "Always Sunny Episode Picker",
      image: character.image,
      name: character.name,
      season: season,
      episode: episode
    })).catch(next);

});

// v2 pulls all content from the db via GraphQL & Hasura and is now the default index route
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // The queries needed for this view
  const seasonEpisode = await getSeasonsEpisodeCount({}, adminRequestHeaders);
  const charactersWithImages = await getCharactersWithImages({ show: '950e38a3-3242-44dc-8585-fd30ced6627e' }, adminRequestHeaders)

  // Process the data
  const item = seasonEpisode.seasons[Math.floor(Math.random() * seasonEpisode.seasons.length)];
  const season = item.season_number
  const episodeCount = item.episodes_aggregate.aggregate.count
  const episode = getEpisode(episodeCount)
  let random = Math.floor(Math.random() * charactersWithImages.characters.length);
  const character = charactersWithImages.characters[random]

  // Render the view
  Promise.resolve().then(() => res.render('index',
    {
      title: "Always Sunny Episode Picker",
      image: character.image_url,
      name: character.first_name,
      season: season,
      episode: episode
    })).catch(next);

});

// Functions leveraged in the controllers above
function getSeasonOrEpisode(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function getEpisode(max: number): number {
  return Math.floor(Math.random() * (max - 1) + 1);
}

module.exports = router;