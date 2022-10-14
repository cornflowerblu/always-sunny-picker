import InitGraphQL from '../../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  query getShows {
    shows {
      id
      show_name
    }
  }
`

type GetShowsResponse = {
  shows: [
    {
      id: string
      show_name: string
    }
  ]
}

export const getShows = async (variables: {}, requestHeaders: {}) =>
  <GetShowsResponse>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
