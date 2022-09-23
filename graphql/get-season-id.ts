import { gqlClient } from '../app'
import { gql } from 'graphql-request'


const query = gql`
query GetSeasonIdByNumber($seasonNumber: Int!) {
  seasons(where: {season_number: {_eq: $seasonNumber}}) {
    id
  }
}`

type SeasonNumber = {
  seasonNumber: number;
}

export const getSeasonById = async (variables: SeasonNumber, requestHeaders: {}) => await gqlClient.request(query, variables, requestHeaders)