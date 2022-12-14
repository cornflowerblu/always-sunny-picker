import express, { Request, Response } from 'express'
import { adminRequestHeaders } from '../app'
import { getSeasonEpDetails } from '../graphql/get-season-episode-details'
import { v4 as uuidv4 } from 'uuid'
import { ConnectRedis, GetQueue } from '../lib/redis'
import { renderEpisode } from '../lib/shows'
import { shuffle } from '../lib/shuffle'

const router = express.Router()

router.get('/v2', async (req: Request, res: Response) => {
  const redis = ConnectRedis()
  const cacheId = req.signedCookies._sunnysession?.id
  const list = await GetQueue(cacheId, redis)

  if (list.length > 0) {
    const parsed = JSON.parse(list[0])
    await redis.lpop(cacheId)
    return res.send(parsed).status(200)
  }

  const result = await shuffle()

  if (req.signedCookies._sunnysession) {
    let sessionId = req.signedCookies._sunnysession.id
    redis.publish('episode-cache-v2', JSON.stringify({ id: sessionId }))
    return res.send(result).status(200)
  } else {
    let sessionId = uuidv4()
    res.cookie(
      '_sunnysession',
      {
        id: sessionId,
        time: new Date().toISOString(),
      },
      {
        secure: true,
        signed: true,
      }
    )
    redis.publish('episode-cache-v2', JSON.stringify({ id: sessionId }))
    res.send(result).status(200)
  }
})

// pulls all content from the db via GraphQL & Hasura and is now the default index route
router.get('/', async (req: Request, res: Response) => {
  // Try to grab from cache first
  const redis = ConnectRedis()
  const id = req.signedCookies._sunnysession?.id
  const list = await GetQueue(id, redis)

  if (list.length > 0) {
    const parsed = JSON.parse(list[0])
    await redis.lpop(id)

    res.cookie(
      '_sunnysession',
      {
        id: id,
        time: new Date().toISOString(),
        season: parsed.season,
        episode: parsed.episode,
        title: 'Always Sunny Episode Picker',
        image: parsed.image,
        name: parsed.name,
      },
      {
        secure: true,
        signed: true,
      }
    )

    res.render('index', {
      title: 'Always Sunny Episode Picker',
      image: parsed.image,
      name: parsed.name,
      season: parsed.season,
      episode: parsed.episode,
    })

    return
  }

  // Populate the view vars
  const { season, episode, character } = await renderEpisode(0)

  // Set up the session variables to store the season / episode in the user's session as ints to make my queries easier
  let returningId
  let newId

  // Render the view
  if (req.signedCookies._sunnysession) {
    returningId = req.signedCookies._sunnysession.id
  } else {
    newId = uuidv4()
  }

  res.cookie(
    '_sunnysession',
    {
      id: newId ? newId : returningId,
      time: new Date().toISOString(),
      season: season,
      episode: episode,
      title: 'Always Sunny Episode Picker',
      image: character.image_url,
      name: character.first_name,
    },
    {
      secure: true,
      signed: true,
    }
  )

  // Connect to redis (if available) and queue up the cookie data
  const session = JSON.stringify(req.signedCookies._sunnysession)
  redis.publish('episode-cache', session)

  res.render('index', {
    title: 'Always Sunny Episode Picker',
    image: character.image_url,
    name: character.first_name,
    season: season,
    episode: episode,
  })
})

router.get('/details', async (req: Request, res: Response) => {
  const { season, episode, image, name } = await req.signedCookies._sunnysession
  const details = await getSeasonEpDetails(
    { season: season, episode: episode },
    adminRequestHeaders
  )

  const episodeDetails = {
    title: details.episodes[0].title,
    description: details.episodes[0].description,
  }

  res.render('index', {
    title: 'Always Sunny Episode Picker',
    image: image,
    name: name,
    season: season,
    episode: episode,
    details: episodeDetails,
  })
})

module.exports = router
