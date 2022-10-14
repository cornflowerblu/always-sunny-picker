import InitGraphQL from '../lib/graphql';
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  query GetSeasonIdByNumber($seasonNumber: Int!) {
    seasons(where: {season_number: {_eq: $seasonNumber}}) {
      id
    }
  }`

type GetSeasonIdByNumberInput = {
  seasonNumber: number;
}

type GetSeasonIdByNumberResponse = {
  seasons: [
    {
      id: string
    }
  ]
}

export const getSeasonById = async (variables: GetSeasonIdByNumberInput, requestHeaders: {}) =>
  <GetSeasonIdByNumberResponse>await client.gqlClient.request(query, variables, requestHeaders)