import { gqlClient } from '../../app'
import { gql } from 'graphql-request'


const query = gql`
  query GetOneShow($id: uuid!) {
    shows_by_pk(id: $id) {
      id
      show_name
    }
  }`

type GetShowInput = {
  id: string,
}

type GetShowResponse = {
  shows_by_pk:
  {
    id: string,
    season_number: number,
  }
}

export const getSingleShow = async (variables: GetShowInput, requestHeaders: {}) =>
  <GetShowResponse>await gqlClient.request(query, variables, requestHeaders)



