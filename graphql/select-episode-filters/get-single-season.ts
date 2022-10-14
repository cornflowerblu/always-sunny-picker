import InitGraphQL from '../../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  query GetSingleSeason($id: uuid!) {
    seasons_by_pk(id: $id) {
      id,
      season_number
    }
  }`

type GetSingleSeasonInput = {
  id: string,
}

type GetSingleSeasonResponse = {
  seasons_by_pk:
  {
    id: string,
    season_number: number,
  }
}

export const getSingleSeason = async (variables: GetSingleSeasonInput, requestHeaders: {}) =>
  <GetSingleSeasonResponse>await client.gqlClient.request(query, variables, requestHeaders)



