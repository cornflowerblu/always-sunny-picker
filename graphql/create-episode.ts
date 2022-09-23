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

type EpisodeVariables = {
  episode: {
    season_id: string,
    episode_number: number,
    title: string,
    description: string,
  }
}

export const createEpisode = async (variables: EpisodeVariables, requestHeaders: {}) => await gqlClient.request(query, variables, requestHeaders)