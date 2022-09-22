import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

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

function getSeasonOrEpisode(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}


module.exports = router;
