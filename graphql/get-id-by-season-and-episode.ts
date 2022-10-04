import { gqlClient } from '../app'
import { gql } from 'graphql-request'


const query = gql`
  query getIdBySeasonAndEpisode($season: Int_comparison_exp!, $episode: Int_comparison_exp!) {
    episodes(where: {season: {season_number: $season}, episode_number: $episode}) {
      id
    }
  }`

type GetIdBySeasonEpisodeInput = {
  season: {
    _eq: number
  },
  episode: {
    _eq: number
  }
}

type GetIdBySeasonEpisodeResponse = {
  episodes: [
    {
      id: string
    }
  ]
}

export const getIdBySeasonAndEpisode = async (variables: GetIdBySeasonEpisodeInput, requestHeaders: {}) =>
  <GetIdBySeasonEpisodeResponse>await gqlClient.request(query, variables, requestHeaders)