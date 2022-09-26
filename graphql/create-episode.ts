import { gqlClient } from '../app'
import { gql } from 'graphql-request'


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
        season_number: number
      }
    }]
  }
}

export const createEpisode = async (variables: AddEpisodeInput, requestHeaders: {}) =>
  <AddEpisodeOutput>await gqlClient.request(query, variables, requestHeaders)