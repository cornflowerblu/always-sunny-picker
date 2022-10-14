import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  query GetAuthTokensByUser($_eq: uuid!) {
    auth_sessions(
      where: { auth_user: { id: { _eq: $_eq } } }
      order_by: { token: desc }
    ) {
      token
    }
  }
`

type AuthTokenUserInput = {
  _eq: string
}

type AuthTokenUserOutput = {
  auth_sessions: [
    {
      token: string
    }
  ]
}

export const getAuthTokensByUser = async (
  variables: AuthTokenUserInput,
  requestHeaders: {}
) =>
  <AuthTokenUserOutput>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
