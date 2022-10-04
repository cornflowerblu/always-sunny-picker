import InitGraphQL from "../lib/setup-graphql";
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  mutation AddSessions($sessions: [sessions_insert_input!]!) {
    insert_sessions(objects: $sessions) {
      affected_rows
    }
  }`

export type AddSessionInput = {
  sessions: Array<any>,
}

type AddSessionOutput = {
  insert_sessions: {
    "affected_rows": number,
  }
}

export const createSessions = async (variables: AddSessionInput, requestHeaders: {}) =>
  <AddSessionOutput>await client.gqlClient.request(query, variables, requestHeaders)