import InitGraphQL from '../../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  query getSeasons($showId: uuid!) {
    seasons(where: {show_id: {_eq: $showId}}, order_by: {season_number: asc}) {
      id
      season_number
    }
  }`

type GetSeasonsInput = {
  showId: string | {}
}

type GetSeasonsResponse = {
  seasons: [
    {
      id: string,
      season_number: number,
    }
  ]
}

export const getSeasons = async (variables: GetSeasonsInput, requestHeaders: {}) =>
  <GetSeasonsResponse>await client.gqlClient.request(query, variables, requestHeaders)