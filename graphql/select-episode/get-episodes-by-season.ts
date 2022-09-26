import { gqlClient } from '../../app'
import { gql } from 'graphql-request'


const query = gql`
  query getEpisodesBySeason($seasonId: uuid!) {
    episodes(where: {season: {id: {_eq: $seasonId}}}, order_by: {episode_number: asc}) {
      id
      episode_number
    }
  }`

type GetEpisodeInput = {
  seasonId: string,
}

type GetEpisodeResponse = {
  episodes: [
    {
      id: string,
      episode_number: number,
    }
  ]
}

export const getEpisodesBySeason = async (variables: GetEpisodeInput, requestHeaders: {}) =>
  <GetEpisodeResponse>await gqlClient.request(query, variables, requestHeaders)