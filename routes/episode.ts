import express, { NextFunction, Request, Response } from "express";
import { createEpisode } from "../graphql/create-episode";
import { getSeasonById } from "../graphql/get-season-id";
import { adminRequestHeaders } from "../app";
import invariant from "tiny-invariant";

const router = express.Router();

router.get('/episode', async (req: Request, res: Response, next: NextFunction) => {
  const token = process.env.AUTH_TOKEN

  invariant(token, "AUTH_TOKEN not set!")
  if (req.query.auth === token) {
    res.render('create-episode')
  } else {
    res.render('error');
  }
});

router.post('/episode/new', async (req: Request, res: Response, next: NextFunction) => {
  const values = req.body

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
      res.render('create-episode', { values, message: 'There was a problem submitting your form, please try again.'});
    } else {
      res.render('error');
    }
  }

});

module.exports = router;