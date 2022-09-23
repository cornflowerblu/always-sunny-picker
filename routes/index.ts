import express, { NextFunction, Request, Response } from "express";
import { createEpisode } from "../graphql/create-episode";
import { getSeasonById } from "../graphql/get-season-id";
import { getSeasonsEpisodeCount } from "../graphql/season-episode-counts";
import { adminRequestHeaders } from "../app";
import invariant from "tiny-invariant";

export const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  const season = getSeasonOrEpisode(1, 15);
  const episode = getSeasonOrEpisode(1, 10)
  const characters = [
    { name: 'Dennis', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/a5e1ae2c-a7b7-4c32-260e-6a4e8dec9e00/public" },
    { name: 'Sweet Dee', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/b8b93534-e6b1-4654-374d-ca008fe7ee00/public" },
    { name: 'Mac', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/d3bee4d2-78ef-47c6-00e7-22460693ef00/public" },
    { name: 'Charlie', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/67269d96-eefc-4081-fa01-9db49cccb500/public" },
    { name: 'Frank', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/75fb99c2-fae1-4a28-d86c-201b560c5400/public" }
  ]

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

// v2 pulls seasons and episode counts from the db because different seasons can have different numbers of episodes
router.get('/v2', async function (req: Request, res: Response, next: NextFunction) {
  const seasonEpisode = await getSeasonsEpisodeCount({}, adminRequestHeaders);
  const item = seasonEpisode.seasons[Math.floor(Math.random()*seasonEpisode.seasons.length)];

  const season = item.season_number
  const episodeCount = item.episodes_aggregate.aggregate.count
  const episode = getEpisode(episodeCount)

  const characters = [
    { name: 'Dennis', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/a5e1ae2c-a7b7-4c32-260e-6a4e8dec9e00/public" },
    { name: 'Sweet Dee', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/b8b93534-e6b1-4654-374d-ca008fe7ee00/public" },
    { name: 'Mac', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/d3bee4d2-78ef-47c6-00e7-22460693ef00/public" },
    { name: 'Charlie', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/67269d96-eefc-4081-fa01-9db49cccb500/public" },
    { name: 'Frank', image: "https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/75fb99c2-fae1-4a28-d86c-201b560c5400/public" }
  ]

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

router.get('/episode', async (req: Request, res: Response, next: NextFunction) => {
  const token = process.env.AUTH_TOKEN

  invariant(token, "AUTH_TOKEN not set!")
  if (req.headers.auth === token) {
    res.render('create-episode')
  }
  res.render('error');
});

router.post('/episode/new', async (req: Request, res: Response, next: NextFunction) => {
  const token = process.env.AUTH_TOKEN

  invariant(token, "AUTH_TOKEN not set!")
  if (req.headers.auth === token) {
    const seasonId = await getSeasonById({
      seasonNumber: req.body.season_number
    }, adminRequestHeaders);

    const data = await createEpisode({
      episode:
      {
        season_id: seasonId.seasons[0].id,
        episode_number: req.body.episode_number,
        title: req.body.title,
        description: req.body.description
      }
    }, adminRequestHeaders);
    res.render('create-episode', { data })
  }
  res.render('error');
});

function getSeasonOrEpisode(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function getEpisode(max: number): number {
  return Math.floor(Math.random() * (max - 1) + 1);
}

module.exports = router;