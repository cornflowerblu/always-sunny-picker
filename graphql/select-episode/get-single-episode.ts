import { gqlClient } from '../../app'
import { gql } from 'graphql-request'


const query = gql`
  query GetOneEpisode($id: uuid!) {
    episodes_by_pk(id: $id) {
      title
      description
      episode_number
    }
  }`

type GetEpisodeInput = {
  id: string,
}

type GetEpisodeResponse = {
  episodes_by_pk:
  {
    title: string,
    description: string,
    episode_number: string,
  }
}

export const getSingleEpisode = async (variables: GetEpisodeInput, requestHeaders: {}) =>
  <GetEpisodeResponse>await gqlClient.request(query, variables, requestHeaders)



