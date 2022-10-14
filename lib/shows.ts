import InitGraphQL from './graphql'
import { getCharactersWithImages } from '../graphql/get-character-with-image'
import { getSeasonsEpisodeCount } from '../graphql/season-episode-counts'
import { getShows } from '../graphql/select-episode-filters/get-shows'

export async function renderEpisode(index: number): Promise<{
  season: number
  episode: number
  character: {
    first_name: string
    image_url: string
  }
}> {
  // Retrieve the data
  const client = InitGraphQL()
  const show = await getShows({}, client.adminRequestHeaders)
  const seasonEpisode = await getSeasonsEpisodeCount(
    {},
    client.adminRequestHeaders
  )
  const charactersWithImages = await getCharactersWithImages(
    { show: show.shows[index].id },
    client.adminRequestHeaders
  )

  // Process the data
  const item =
    seasonEpisode.seasons[
      Math.floor(Math.random() * seasonEpisode.seasons.length)
    ]
  const season = item.season_number
  const episodeCount = item.episodes_aggregate.aggregate.count
  const episode = getEpisode(episodeCount)
  let random = Math.floor(
    Math.random() * charactersWithImages.characters.length
  )
  const character = charactersWithImages.characters[random]

  return { season, episode, character }
}

function getEpisode(max: number): number {
  return Math.floor(Math.random() * (max - 1) + 1)
}
