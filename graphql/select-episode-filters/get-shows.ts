import { gqlClient } from '../../app'
import { gql } from 'graphql-request'


const query = gql`
  query getShows {
    shows {
      id
      show_name
    }
  }`

type GetShowsResponse = {
  shows: [
    {
      id: string,
      show_name: string
    }
  ]
}

export const getShows = async (variables: {}, requestHeaders: {}) =>
  <GetShowsResponse>await gqlClient.request(query, variables, requestHeaders)