import InitGraphQL from '../../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL();

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
    show_name: string,
  }
}

export const getSingleShow = async (variables: GetShowInput, requestHeaders: {}) =>
  <GetShowResponse>await client.gqlClient.request(query, variables, requestHeaders)



