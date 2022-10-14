import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  query getIdBySeasonAndEpisode(
    $season: Int_comparison_exp!
    $episode: Int_comparison_exp!
    $show_id: uuid_comparison_exp = {}
  ) {
    episodes(
      where: {
        season: { season_number: $season, show_id: $show_id }
        episode_number: $episode
      }
    ) {
      id
    }
  }
`

type GetIdBySeasonEpisodeInput = {
  season: {
    _eq: number
  }
  episode: {
    _eq: number
  }
  show_id: {
    _eq: string
  }
}

type GetIdBySeasonEpisodeResponse = {
  episodes: [
    {
      id: string
    }
  ]
}

export const getIdBySeasonAndEpisode = async (
  variables: GetIdBySeasonEpisodeInput,
  requestHeaders: {}
) =>
  <GetIdBySeasonEpisodeResponse>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
