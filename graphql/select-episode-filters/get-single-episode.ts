import { gqlClient } from '../../app'
import { gql } from 'graphql-request'


const query = gql`
  query GetOneEpisode($id: uuid!) {
    episodes_by_pk(id: $id) {
      id
      season {
        season_number
      }
      episode_number
      title
      description
    }
  }`

type GetEpisodeInput = {
  id: string,
}

type GetEpisodeResponse = {
  episodes_by_pk:
  {
    id: string,
    season: {
      season_number: number,
    },
    episode_number: number,
    title: string,
    description: string,
  }
}

export const getSingleEpisode = async (variables: GetEpisodeInput, requestHeaders: {}) =>
  <GetEpisodeResponse>await gqlClient.request(query, variables, requestHeaders)



