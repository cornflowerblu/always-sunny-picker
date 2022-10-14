import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  query GetSeasonsByShowId($id: uuid!) {
    shows_by_pk(id: $id) {
      seasons {
        id
        season_number
      }
    }
  }
`

type GetSeasonsByShowInput = {
  id: string
}

type GetSeasonsByShowResponse = {
  shows_by_pk: {
    seasons: [
      {
        id: string
        season_number: number
      }
    ]
  }
}

export const getSeasonByShowId = async (
  variables: GetSeasonsByShowInput,
  requestHeaders: {}
) =>
  <GetSeasonsByShowResponse>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
