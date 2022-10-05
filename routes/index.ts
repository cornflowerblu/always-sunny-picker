import express, { NextFunction, Request, Response } from "express";
import { getSeasonsEpisodeCount } from "../graphql/season-episode-counts";
import { adminRequestHeaders } from "../app";
import { characters } from '../constants/characters'
import { getCharactersWithImages } from "../graphql/get-character-with-image";
import { getSeasonEpDetails } from "../graphql/get-season-episode-details";
import { v4 as uuidv4 } from 'uuid';
import { ConnectRedis, GetQueue } from "../lib/redis";

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

  // Try to grab from cache first
  const redis = ConnectRedis();
  const id = req.signedCookies._sunnysession?.id
  const list = await GetQueue(id, redis);


  if (list.length > 0) {
    let i: number = list.length - list.length;
    const parsed = JSON.parse(list[i]);
    await redis.lpop(id);

    res.cookie('_sunnysession', {
      id: id,
      time: Date.now(),
      season: parsed.season,
      episode: parsed.episode,
      title: "Always Sunny Episode Picker",
      image: parsed.image,
      name: parsed.name,
    },
      {
        secure: true,
        signed: true,
      });

    redis.publish('episode-cache', req.signedCookies._sunnysession);

    res.render('index',
      {
        title: "Always Sunny Episode Picker",
        image: parsed.image,
        name: parsed.name,
        season: parsed.season,
        episode: parsed.episode,
      });

    return;
  }



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

  // Set up the session variables to store the season / episode in the user's session as ints to make my queries easier
  let returningId;
  let newId;

  // Render the view
  if (req.signedCookies._sunnysession) {
    returningId = req.signedCookies._sunnysession.id
  } else {
    newId = uuidv4();
  }

  res.cookie('_sunnysession', {
    id: newId ? newId : returningId,
    time: Date.now(),
    season: season,
    episode: episode,
    title: "Always Sunny Episode Picker",
    image: character.image_url,
    name: character.first_name,
  },
    {
      secure: true,
      signed: true,
    });


  // Connect to redis (if available) and queue up the cookie data
  const session = JSON.stringify(req.signedCookies._sunnysession)
  redis.publish('channel', session);
  redis.publish('episode-cache', session);


  res.render('index',
    {
      title: "Always Sunny Episode Picker",
      image: character.image_url,
      name: character.first_name,
      season: season,
      episode: episode
    })
});

router.get('/details', async (req: Request, res: Response, next: NextFunction) => {
  const { season, episode, image, name } = await req.signedCookies._sunnysession;
  const details = await getSeasonEpDetails({ season: season, episode: episode }, adminRequestHeaders);

  const episodeDetails = {
    title: details.episodes[0].title,
    description: details.episodes[0].description,
  }

  Promise.resolve().then(() => res.render('index', {
    title: "Always Sunny Episode Picker",
    image: image,
    name: name,
    season: season,
    episode: episode,
    details: episodeDetails
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