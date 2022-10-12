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
import { getSeasonByShowId } from "../graphql/get-seasons-by-show-id";
import { createSeasonWithShow } from "../graphql/create-season-with-show";
import { getAuthTokensByUser } from "../graphql/get-auth-tokens-by-user";
import {compare} from 'bcrypt';
import { getAuthSession } from "../graphql/get-auth-session";
import { signedCookies } from "cookie-parser";

// "Global" variables in scope for the entire file
const router = express.Router();
// const token = process.env.AUTH_TOKEN

// Blank entry form protected by query string auth
router.get('/episode', async (req: Request, res: Response, next: NextFunction) => {
  let isExpired = (date: string) => date > new Date().toISOString();

  const shows = await getShows({}, adminRequestHeaders)
  
  let hash;
  let dbEncryptToken;
  let token;
  let expired;

  try {
    hash = req.signedCookies._sunnysessionauth.token
    dbEncryptToken = await getAuthSession({_eq: hash}, adminRequestHeaders)
    token = dbEncryptToken.auth_sessions[0]?.token,
    expired = isExpired(dbEncryptToken.auth_sessions[0]?.time);
  } catch (error) {
    console.log(error);
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});   
  }


  let auth;
  try {
    auth = await compare(token, hash)
  } catch (error) {
    console.log(error);
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});
  }

  if (auth && !expired) {
    res.render('create-episode', shows)
  } else {
    res.clearCookie('_sunnysessionauth');
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});
  }

});

// The form post action and error handling
router.post('/episode/new', async (req: Request, res: Response, next: NextFunction) => {
  let shows = await getShows({}, adminRequestHeaders);
  
  const values = Object.assign({}, req.body)
  const { show_id, season_number, episode_number, title, description } = req.body
  
  if (!season_number || !episode_number || !title || !description)
    return res.render('create-episode', { values, message: 'All fields on this form are required.' });

    
  const id = await getIdBySeasonAndEpisode({season: {_eq: season_number}, episode: {_eq: episode_number}, show_id: {_eq: show_id} }, adminRequestHeaders)


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
        res.render('create-episode', { data, shows: shows.shows})
    }
  }
  else {
    try {
      const { season_number, show_id, episode_number, title, description } = req.body

      const getSeasons = await getSeasonByShowId({
        id: show_id
      }, adminRequestHeaders);
      
      const seasons = getSeasons.shows_by_pk.seasons

      let seasonId;
      let season;

      const result = seasons.map(season => season.season_number)
      
      if(result.includes(Number(season_number))) {
        seasonId = await getSeasonById({
          seasonNumber: season_number
        }, adminRequestHeaders)
      }              

      if(!seasonId) {
        let result = await createSeasonWithShow({
          season: { 
            season_number, 
            show_id
          }}, 
          adminRequestHeaders)
          season = result.insert_seasons_one.id
        } else {
          season = seasonId.seasons[0].id
        }    

      const data = await createEpisode({
        episode:
        {
          season_id: season,
          episode_number: episode_number,
          title: title,
          description: description
        }
      }, adminRequestHeaders);
      res.render('create-episode', { data, shows: shows.shows})
    } catch {
      if (values) {
        const show = await getSingleShow({id: show_id}, adminRequestHeaders)
        res.render('create-episode', { values, show_name: show.shows_by_pk.show_name, message: 'There was a problem submitting your form, please try again.' });
      } else {
        res.render('error');
      }
    }
  }});


// This route presents a drop-down list of shows which populate seasons which populate episodes, eventually allowing for editing, filtering, etc.
router.get('/episode/edit', async (req: Request, res: Response, next: NextFunction) => {
  let isExpired = (date: string) => date > new Date().toISOString();

  const shows = await getShows({}, adminRequestHeaders)
  
  let hash;
  let dbEncryptToken;
  let token;
  let expired;

  try {
    hash = req.signedCookies._sunnysessionauth.token
    dbEncryptToken = await getAuthSession({_eq: hash}, adminRequestHeaders)
    token = dbEncryptToken.auth_sessions[0]?.token,
    expired = isExpired(dbEncryptToken.auth_sessions[0]?.time);
  } catch (error) {
    console.log(error);
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});   
  }


  let auth;
  try {
    auth = await compare(token, hash)
  } catch (error) {
    console.log(error);
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});
  }

  if (auth && !expired) {
    res.render('update-episode', shows)
  } else {
    res.clearCookie('_sunnysessionauth');
    return res.render('auth', {
      title: 'Please Sign In',
      action: 'validate'});
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