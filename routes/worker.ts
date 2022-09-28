import express, { Request, Response, NextFunction } from "express";
import throng from 'throng';
import { adminRequestHeaders } from "../app";
import { createSession } from "../graphql/add-session";

const router = express.Router();

let maxJobsPerWorker = 50;
throng.process(maxJobsPerWorker, async (job) => {
  throng(id => console.log(`Started worker ${id}`))
})


router.get('/worker', async (req: Request, res: Response, next: NextFunction) => {
  const {id, season, episode, name } = req.body
  await createSession({session: {id, season, episode, name}}, adminRequestHeaders)
  res.send(200);
});