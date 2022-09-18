import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  const season = getSeasonOrEpisode(1, 15);
  const episode = getSeasonOrEpisode(1, 10)
  const characters = [
    { name: 'Dennis', image: "/images/dennis.jpg" },
    { name: 'Sweet Dee', image: "/images/dee.webp" },
    { name: 'Mac', image: "/images/mac.webp" },
    { name: 'Charlie', image: "/images/charlie.jpg" },
    { name: 'Frank', image: "/images/frank.jpg" }
  ]

  let random = Math.floor(Math.random() * characters.length);

  const character = characters[random]
  Promise.resolve().then(() => res.render('index',
    {
      title: "Always Sunny Episode Picker",
      image: character.image,
      message: `${character.name} says you should watch season ${season}, episode ${episode}.`
    })).catch(next);

});

function getSeasonOrEpisode(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}


module.exports = router;
