import InitGraphQL from "../lib/graphql";
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  mutation CreateAuthSession($token: String!, $enc_token: String!, $user_id: uuid!, $date: bigint!) {
    insert_auth_sessions_one(object: {token: $token, enc_token: $enc_token, user_id: $user_id, date: $date}) {
      id
      token
    }
  }`

type CreateAuthSessionInput = {
  user_id: string,
  token: string,
  enc_token: string,
  date: number,
}

export type CreateAuthSessionOutput = {
  insert_auth_sessions_one: {
    id: string,
    token: string,
  }
}

export const createAuthSession = async (variables: CreateAuthSessionInput, requestHeaders: {}) =>
  <CreateAuthSessionOutput>await client.gqlClient.request(query, variables, requestHeaders)