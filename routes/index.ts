import { NextFunction, Request, Response } from "express";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  const season = getSeasonOrEpisode(1, 15);
  const episode = getSeasonOrEpisode(1, 10)
  const characters = ['Dennis', 'Dee', 'Mac', 'Charlie', 'Frank']

  let random = Math.floor(Math.random() * characters.length);

  res.render('index', { title: "Always Sunny Episode Picker", message: `${characters[random]} says you should watch season ${season}, episode ${episode}.` });
});

function getSeasonOrEpisode(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}


module.exports = router;
