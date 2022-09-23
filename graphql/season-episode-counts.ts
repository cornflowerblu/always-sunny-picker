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

export const getSeasonsEpisodeCount = async (variables: {}, requestHeaders: {}) => await gqlClient.request(query, variables, requestHeaders)