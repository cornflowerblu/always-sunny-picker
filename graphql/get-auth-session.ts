import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  query GetAuthSession($_eq: String!) {
    auth_sessions(where: { enc_token: { _eq: $_eq } }, limit: 1) {
      id
      enc_token
      token
      time
    }
  }
`

type GetAuthSessionInput = {
  _eq: string
}

type GetAuthSessionOutput = {
  auth_sessions: [
    {
      id: string
      enc_token: string
      token: string
      time: string
    }
  ]
}

export const getAuthSession = async (
  variables: GetAuthSessionInput,
  requestHeaders: {}
) =>
  <GetAuthSessionOutput>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
