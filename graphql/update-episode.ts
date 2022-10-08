import { gqlClient } from '../app'
import { gql } from 'graphql-request'


const query = gql`
  mutation UpdateEpisode($id: episodes_pk_columns_input!, $episode: episodes_set_input!) {
    update_episodes_by_pk(pk_columns: $id, _set: $episode) {
      id
      episode_number
      title
      description
      season {
        season_number
        show {
          id
          show_name
        }
      }
    }
  }`

type UpdateEpisodeInput = {
  id: {
    id: string,
  },
  episode: {
    episode_number: number,
    title: string,
    description: string,
    season_id: string
  }
}

type UpdateEpisodeOutput = {
  update_episodes_by_pk: {
    season: {
      season_number: number,
      show: {
        id: string,
        show_name: string,
      }
    },
    id: string,
    episode_number: number,
    title: string,
    description: string,
  }
}

export const updateEpisode = async (variables: UpdateEpisodeInput, requestHeaders: {}) =>
  <UpdateEpisodeOutput>await gqlClient.request(query, variables, requestHeaders)