import express, { NextFunction, Request, Response } from "express";
import { createEpisode } from "../graphql/create-episode";
import { getSeasonById } from "../graphql/get-season-id";
import { adminRequestHeaders } from "../app";
import invariant from "tiny-invariant";
import { getShows } from "../graphql/select-episode-filters/get-shows";
import { getSeasons } from "../graphql/select-episode-filters/get-seasons";
import { getSingleShow } from "../graphql/select-episode-filters/get-single-show";
import { getSingleSeason } from "../graphql/select-episode-filters/get-single-season";
import { getEpisodesBySeason } from "../graphql/select-episode-filters/get-episodes-by-season";
import { getSingleEpisode } from "../graphql/select-episode-filters/get-single-episode";
import { updateEpisode } from "../graphql/update-episode";
import { getIdBySeasonAndEpisode } from '../graphql/get-id-by-season-and-episode'

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

    
  const id = await getIdBySeasonAndEpisode({season: {_eq: season_number}, episode: {_eq: episode_number} }, adminRequestHeaders)
  const formattedId = id.episodes[0]?.id

  if (formattedId != undefined){

  const checkEpisodeExists = async () => await getSingleEpisode({id: formattedId}, adminRequestHeaders)
  
  if (formattedId === (await checkEpisodeExists()).episodes_by_pk.id) {

      const seasonId = await getSeasonById({
        seasonNumber: req.body.season_number
      }, adminRequestHeaders);
  
      const data = await updateEpisode({id: {id: formattedId,},
        episode: {
          episode_number: episode_number,
          title: title,
          description: description,
          season_id: seasonId.seasons[0].id
        }}, adminRequestHeaders)
        res.render('create-episode', { data })
    }
  }
  else {
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
  }});
  



// This route presents a drop-down list of shows which populate seasons which populate episodes, eventually allowing for editing, filtering, etc.
router.get('/episode/edit', async (req: Request, res: Response, next: NextFunction) => {
  invariant(token, "AUTH_TOKEN not set!")
  if (req.query.auth === token) {
    const shows = await getShows({}, adminRequestHeaders);
    res.render('update-episode', shows);
  } else {
    res.render('error');
  }
});

// This is the first ID that we pass back from the view which allows us to fetch the seasons associated with this show. The route is "all" because the view POSTS to it but a user may want to copy/paste the generated URL which requires a GET.
router.all('/episode/edit/:showId', async (req: Request, res: Response, next: NextFunction) => {
  const shows = await getShows({}, adminRequestHeaders);
  const singleShow = await getSingleShow({ id: req.params.showId }, adminRequestHeaders);
  const seasons = await getSeasons({ showId: req.params.showId }, adminRequestHeaders);
  const showsAndSeasons = {
    seasons: seasons.seasons,
    singleShow: singleShow.shows_by_pk,
    shows: shows.shows
  }

  res.render('update-episode', showsAndSeasons);
});

// Moving down the chain, we now know the show and the season so we can fetch the episodes. 
router.all('/episode/edit/:showId/:seasonId', async (req: Request, res: Response, next: NextFunction) => {
  const singleShow = await getSingleShow({ id: req.params.showId }, adminRequestHeaders);
  const singleSeason = await getSingleSeason({ id: req.params.seasonId }, adminRequestHeaders);
  const shows = await getShows({}, adminRequestHeaders);
  const seasons = await getSeasons({ showId: req.params.showId }, adminRequestHeaders);
  const episodes = await getEpisodesBySeason({ seasonId: req.params.seasonId }, adminRequestHeaders);

  const showsAndSeasonsAndEpisodes = {
    seasons: seasons.seasons,
    singleShow: singleShow.shows_by_pk,
    episodes: episodes.episodes,
    singleSeason: singleSeason.seasons_by_pk,
    shows: shows.shows
  }

  res.render('update-episode', showsAndSeasonsAndEpisodes);
});

router.all('/episode/edit/:showId/:seasonId/:episodeId', async (req: Request, res: Response, next: NextFunction) => {
  const episode = await getSingleEpisode({ id: req.params.episodeId }, adminRequestHeaders);
  const singleShow = await getSingleShow({ id: req.params.showId }, adminRequestHeaders);
  const singleSeason = await getSingleSeason({ id: req.params.seasonId }, adminRequestHeaders);
  const shows = await getShows({}, adminRequestHeaders);
  const seasons = await getSeasons({ showId: req.params.showId }, adminRequestHeaders);
  const episodes = await getEpisodesBySeason({ seasonId: req.params.seasonId }, adminRequestHeaders);

  const showsAndSeasonsAndEpisodeDetails = {
    seasons: seasons.seasons,
    singleShow: singleShow.shows_by_pk,
    episodes: episodes.episodes,
    singleSeason: singleSeason.seasons_by_pk,
    singleEpisode: episode.episodes_by_pk,
    shows: shows.shows
  }

  res.render('update-episode', showsAndSeasonsAndEpisodeDetails);
});

module.exports = router;