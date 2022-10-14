import { gqlClient } from '../app'
import { gql } from 'graphql-request'

const query = gql`
  query EpisodeDetails($season: Int!, $episode: Int!) {
    episodes(
      where: {
        season: { season_number: { _eq: $season } }
        episode_number: { _eq: $episode }
      }
    ) {
      title
      description
    }
  }
`

type SeasonEpInput = {
  season: number
  episode: number
}

type SeasonEpOutput = {
  episodes: [
    {
      title: string
      description: string
    }
  ]
}

export const getSeasonEpDetails = async (
  variables: SeasonEpInput,
  requestHeaders: {}
) => <SeasonEpOutput>await gqlClient.request(query, variables, requestHeaders)
