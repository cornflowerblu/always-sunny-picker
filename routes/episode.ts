import express, { NextFunction, Request, Response } from "express";
import { createEpisode } from "../graphql/create-episode";
import { getSeasonById } from "../graphql/get-season-id";
import { adminRequestHeaders } from "../app";
import invariant from "tiny-invariant";
import { getShows } from "../graphql/select-episode/get-shows";
import { getSeasons } from "../graphql/select-episode/get-seasons";
import { getSingleShow } from "../graphql/select-episode/get-single-show";
import { getSingleSeason } from "../graphql/select-episode/get-single-season";
import { getEpisodesBySeason } from "../graphql/select-episode/get-episodes-by-season";

// "Global" variables in scope for the entire file
const router = express.Router();
const token = process.env.AUTH_TOKEN

// Blank entry form protected by query string auth
router.get('/episode', async (req: Request, res: Response, next: NextFunction) => {
  invariant(token, "AUTH_TOKEN not set!")
  if (req.query.auth === token) {
    res.render('create-episode')
  } else {
    res.render('error');
  }
});

// The form post action and error handling
router.post('/episode/new', async (req: Request, res: Response, next: NextFunction) => {
  const values = Object.assign({}, req.body)
  const { season_number, episode_number, title, description } = req.body

  if (!season_number || !episode_number || !title || !description)
    return res.render('create-episode', { values, message: 'All fields on this form are required.' });

  try {
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
  } catch {
    if (values) {
      res.render('create-episode', { values, message: 'There was a problem submitting your form, please try again.' });
    } else {
      res.render('error');
    }
  }
});

router.get('/episode/edit', async (req: Request, res: Response, next: NextFunction) => {
  const shows = await getShows({}, adminRequestHeaders);
  res.render('update-episode', shows);
});

router.all('/episode/edit/:showId', async (req: Request, res: Response, next: NextFunction) => {
  const singleShow = await getSingleShow({ id: req.params.showId }, adminRequestHeaders);
  const seasons = await getSeasons({ showId: req.params.showId }, adminRequestHeaders);
  const showsAndSeasons = { seasons: seasons.seasons, show: singleShow.shows_by_pk }

  res.render('update-episode', showsAndSeasons);
});

router.all('/episode/edit/:showId/:seasonId', async (req: Request, res: Response, next: NextFunction) => {
  const singleShow = await getSingleShow({ id: req.params.showId }, adminRequestHeaders);
  const singleSeason = await getSingleSeason({ id: req.params.seasonId }, adminRequestHeaders);
  const seasons = await getSeasons({ showId: req.params.showId }, adminRequestHeaders);
  const episodes = await getEpisodesBySeason({ seasonId: req.params.seasonId }, adminRequestHeaders);

  const showsAndSeasonsAndEpisodes = {
    seasons: seasons.seasons,
    show: singleShow.shows_by_pk,
    episodes: episodes.episodes,
    singleSeason: singleSeason.seasons_by_pk
  }

  res.render('update-episode', showsAndSeasonsAndEpisodes);
});

module.exports = router;