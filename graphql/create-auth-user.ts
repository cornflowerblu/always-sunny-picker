import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  mutation CreateAuthUser($email: String!, $password: String!) {
    insert_auth_users_one(object: { email: $email, password: $password }) {
      id
    }
  }
`

type AddUserInput = {
  email: string
  password: string
}

export type AddUserOutput = {
  insert_auth_users_one: {
    id: string
  }
}

export const createAuthUser = async (
  variables: AddUserInput,
  requestHeaders: {}
) =>
  <AddUserOutput>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
