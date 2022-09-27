import express, { NextFunction, Request, Response } from "express";
import { getSeasonsEpisodeCount } from "../graphql/season-episode-counts";
import { adminRequestHeaders } from "../app";
import { characters } from '../constants/characters'
import { getCharactersWithImages } from "../graphql/get-character-with-image";
import { getSeasonEpDetails } from "../graphql/get-season-episode-details";
import { v4 as uuidv4 } from 'uuid';
const MongoClient = require('mongodb').MongoClient
import invariant from "tiny-invariant";

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
  // Set up MongoDB for session storage
  const connection = process.env.MONGO
  invariant(connection, "MONGODB URI NOT SET!")

  MongoClient.connect(connection, async (err, client) => {
    if (err) throw err
    const db = client.db('always-sunny-picker')


    // Check if they have a previous session and update their user in the DB
    if (req.signedCookies._session) {
      const localUser = req.signedCookies._session.id
      const dbUser = await db.collection('sessions').findOne({ "user.id": { $eq: localUser } })
      if (localUser === dbUser?.user.id) {
        db.collection('sessions').findOneAndUpdate(
          { "user.id": { $eq: localUser } },
          { $set: { "user.time": Date.now() }, $inc: { "user.visits": + 1 } },
          { upsert: false, returnNewDocument: true }
        );
      }
    } else {

      // Set up a cookie for the session
      res.cookie(`_session`, {
        id: uuidv4(),
        time: Date.now(),
        visits: +1
      },
        {
          secure: true,
          signed: true,
        });

      // Throw em in the db for persistence
      db.collection('sessions').insertOne({ user: req.signedCookies._session }, (err: any, result: any) => {
        if (err) throw err
        console.log(result)
      })
    };
  });

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

  // Store the season / episode in the user's session as ints to make my queries easier
  res.cookie('_recommendation', {
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

router.get('/details', async (req: Request, res: Response, next: NextFunction) => {
  const { season, episode, image, name } = await req.signedCookies._recommendation;
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