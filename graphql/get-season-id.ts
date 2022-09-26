import { gqlClient } from '../app'
import { gql } from 'graphql-request'


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
  <GetSeasonIdByNumberResponse>await gqlClient.request(query, variables, requestHeaders)