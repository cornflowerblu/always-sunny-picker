import InitGraphQL from "../lib/graphql";
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  mutation CreateAuthSession($token: String!, $date: String!, $user_id: uuid!) {
    insert_auth_sessions_one(object: {token: $token, date: $date, user_id: $user_id}) {
      id
      token
    }
  }`

type CreateAuthSessionInput = {
  user_id: string,
  token: string,
  date: string,
}

export type CreateAuthSessionOutput = {
  insert_auth_sessions_one: {
    id: string,
    token: string,
  }
}

export const createAuthSession = async (variables: CreateAuthSessionInput, requestHeaders: {}) =>
  <CreateAuthSessionOutput>await client.gqlClient.request(query, variables, requestHeaders)