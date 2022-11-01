import express, { Request, Response } from 'express'
import { getSeasonById } from '../graphql/get-season-id'
import { adminRequestHeaders } from '../app'
import { getShows } from '../graphql/select-episode-filters/get-shows'
import { getSingleShow } from '../graphql/select-episode-filters/get-single-show'
import { updateEpisode } from '../graphql/update-episode'
import { getIdBySeasonAndEpisode } from '../graphql/get-id-by-season-and-episode'
import { authService } from '../lib/auth'
import { checkEpisodeExists, episodeFilter, updateIfExists } from '../lib/utils'

// express router
const router = express.Router()

//v2 for next
router.get('/episode/v2', async (req: Request, res: Response) => {
  const shows = await getShows({}, adminRequestHeaders)
  res.send(shows).status(200)
})

// Blank entry form protected by auth
router.get(
  '/episode',
  async (req: Request, res: Response) =>
    await authService(req, res, 'create-episode').catch((error) =>
      console.log(error)
    )
)

// This route presents a drop-down list of shows which populate seasons which populate episodes, eventually allowing for editing, filtering, etc.
router.get(
  '/episode/edit',
  async (req: Request, res: Response) =>
    await authService(req, res, 'update-episode').catch((error) =>
      console.log(error)
    )
)

// The form post action and error handling
router.post('/episode/new', async (req: Request, res: Response) => {
  // get shows to populate the first dropdown
  const shows = await getShows({}, adminRequestHeaders)

  // grab request data
  const values = Object.assign({}, req.body)
  const { show_id, season_number, episode_number, title, description } =
    req.body

  // backend form validation
  if (!season_number || !episode_number || !title || !description)
    return res.render('create-episode', {
      values,
      message: 'All fields on this form are required.',
    })

  // create a new episode if none exists
  const id = await getIdBySeasonAndEpisode(
    {
      season: { _eq: season_number },
      episode: { _eq: episode_number },
      show_id: { _eq: show_id },
    },
    adminRequestHeaders
  )
  const formattedId = id.episodes[0]?.id

  if (formattedId != undefined) {
    if (
      formattedId ===
      (await checkEpisodeExists(formattedId, adminRequestHeaders))
        .episodes_by_pk.id
    ) {
      const seasonId = await getSeasonById(
        {
          seasonNumber: req.body.season_number,
        },
        adminRequestHeaders
      )

      const data = await updateEpisode(
        {
          id: { id: formattedId },
          episode: {
            episode_number: episode_number,
            title: title,
            description: description,
            season_id: seasonId.seasons[0].id,
          },
        },
        adminRequestHeaders
      )
      res.render('create-episode', { data, shows: shows.shows })
    }
  } else {
    // update an existing episode
    try {
      const data = await updateIfExists(
        show_id,
        season_number,
        title,
        episode_number,
        description
      )
      res.render('create-episode', { data, shows: shows.shows })
    } catch {
      if (values) {
        const show = await getSingleShow({ id: show_id }, adminRequestHeaders)
        res.render('create-episode', {
          values,
          show_name: show.shows_by_pk.show_name,
          message:
            'There was a problem submitting your form, please try again.',
        })
      } else {
        res.render('error')
      }
    }
  }
})

// This is the first ID that we pass back from the view which allows us to fetch the seasons associated with this show. The route is "all" because the view POSTS to it but a user may want to copy/paste the generated URL which requires a GET.
router.all('/episode/edit/:showId', async (req: Request, res: Response) => {
  const data = await episodeFilter(req)

  const showsAndSeasons = {
    seasons: data.seasons.seasons,
    singleShow: data.singleShow.shows_by_pk,
    shows: data.shows.shows,
  }

  res.render('update-episode', showsAndSeasons)
})

// Moving down the chain, we now know the show and the season so we can fetch the episodes.
router.all(
  '/episode/edit/:showId/:seasonId',
  async (req: Request, res: Response) => {
    const data = await episodeFilter(req)

    const showsAndSeasonsAndEpisodes = {
      seasons: data.seasons.seasons,
      singleShow: data.singleShow.shows_by_pk,
      episodes: data.episodes.episodes,
      singleSeason: data.singleSeason.seasons_by_pk,
      shows: data.shows.shows,
    }

    res.render('update-episode', showsAndSeasonsAndEpisodes)
  }
)

// populate the episode's data
router.all(
  '/episode/edit/:showId/:seasonId/:episodeId',
  async (req: Request, res: Response) => {
    const data = await episodeFilter(req)

    const showsAndSeasonsAndEpisodeDetails = {
      seasons: data.seasons.seasons,
      singleShow: data.singleShow.shows_by_pk,
      episodes: data.episodes.episodes,
      singleSeason: data.singleSeason.seasons_by_pk,
      singleEpisode: data.episode.episodes_by_pk,
      shows: data.shows.shows,
    }

    res.render('update-episode', showsAndSeasonsAndEpisodeDetails)
  }
)

module.exports = router
