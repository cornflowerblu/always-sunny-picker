import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  mutation AddEpisode($episode: episodes_insert_input!) {
    insert_episodes(objects: [$episode]) {
      returning {
        id
        episode_number
        title
        description
        season {
          season_number
          show {
            show_name
          }
        }
      }
    }
  }`

type AddEpisodeInput = {
  episode: {
    season_id: string,
    episode_number: number,
    title: string,
    description: string,
  }
}

type AddEpisodeOutput = {
  insert_episodes: {
    returning: [{
      id: string,
      episode_number: number,
      title: string,
      description: string,
      season: {
        season_number: number,
        show: {
          id: string,
          show_name: string,
        }
      }
    }]
  }
}

export const createEpisode = async (variables: AddEpisodeInput, requestHeaders: {}) =>
  <AddEpisodeOutput>await client.gqlClient.request(query, variables, requestHeaders)