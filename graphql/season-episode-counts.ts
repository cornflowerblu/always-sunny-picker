import { gqlClient } from '../app'
import { gql } from 'graphql-request'


const query = gql`
query ShowSeasons {
  seasons(where: {season_number: {_lte: 3}}) {
    season_number
    episodes_aggregate {
      aggregate {
        count
      }
    }
  }
}`

export const getSeasonsEpisodeCount = async (variables: {}, requestHeaders: {}) => await gqlClient.request(query, variables, requestHeaders)