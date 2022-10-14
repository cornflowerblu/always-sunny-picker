import { PubSub, PushToQueue } from '../lib/redis'
import { safelyParseJSON } from '../lib/utils'
import InitGraphQL from '../lib/graphql'
import {
  getShowSeasons,
  getSeasonEpisodes,
  getEpisodeDetails,
} from '../graphql/nextjs/shuffle'

const client = InitGraphQL()

// Redis queue of episodes
const { subscriber, producer } = PubSub('episode-cache')

subscriber.on('message', async (channel, message) => {
  const { id } = safelyParseJSON(message)

  if (id === null || id === undefined) {
    console.error('ID is null or undefined... moving on.')
    return
  }

  const key = id

  for (let i = 0; i <= 10; i++) {
    const getNumber = (max: number, min: number): number =>
      Math.floor(Math.random() * (max - 1) + min)

    const show = await getShowSeasons(
      {
        id: '950e38a3-3242-44dc-8585-fd30ced6627e',
      },
      client.adminRequestHeaders
    )

    const seasonNumber = getNumber(
      show.shows_by_pk.seasons_aggregate.aggregate.count,
      1
    )

    const season = await getSeasonEpisodes(
      { seasonNumber: seasonNumber },
      client.adminRequestHeaders
    )

    const episodeNumber = getNumber(
      season.seasons[0].episodes_aggregate.aggregate.count,
      1
    )

    const episode = await getEpisodeDetails(
      { seasonNumber: seasonNumber, episodeNumber: episodeNumber },
      client.adminRequestHeaders
    )

    const characterNumber = getNumber(
      episode.episodes[0].season.show.characters_aggregate.aggregate.count,
      0
    )

    const { id, episode_number, title, description } = episode.episodes[0]

    const character =
      episode.episodes[0].season.show.characters_aggregate.nodes[
        characterNumber
      ].first_name

    const character_image =
      episode.episodes[0].season.show.characters_aggregate.nodes[
        characterNumber
      ].image_url

    const season_number = episode.episodes[0].season.season_number
    const show_name = episode.episodes[0].season.show.show_name

    const result = {
      id,
      episode_number,
      season_number,
      title,
      description,
      character,
      character_image,
      show_name,
    }

    await PushToQueue(producer, key, { params: result })
  }
})
