import { gqlClient } from '../app'
import { gql } from 'graphql-request'


const query = gql`
  query ShowSeasons {
    seasons(where: {episodes: {_not: {id: {_is_null: true}}}}, order_by: {season_number: asc}) {
      season_number
      episodes_aggregate {
        aggregate {
          count
        }
      }
    }
  }`

type ShowSeasonsOutput = {
  seasons: [{
    season_number: number,
    episodes_aggregate: {
      aggregate: {
        count: number
      }
    }
  }]
}

export const getSeasonsEpisodeCount = async (variables: {}, requestHeaders: {}) => <ShowSeasonsOutput> await gqlClient.request(query, variables, requestHeaders)