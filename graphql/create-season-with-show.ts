import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  mutation CreateSeasonWithShow($season: seasons_insert_input!) {
    insert_seasons_one(object: $season) {
      id
      season_number
      show_id
    }
  }`

type CreateSeasonWithShowInput = {
  season: {
    season_number: number,
    show_id: string,
  }
}

type CreateSeasonWithShowResponse = {
  insert_seasons_one: {
    id: string,
    season_number: number,
    show_id: string,
  }
}

export const createSeasonWithShow = async (variables: CreateSeasonWithShowInput, requestHeaders: {}) =>
  <CreateSeasonWithShowResponse>await client.gqlClient.request(query, variables, requestHeaders)