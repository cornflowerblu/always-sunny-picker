import { gqlClient } from '../app'
import { gql } from 'graphql-request'


const query = gql`
  mutation AddSessions($session: sessions_insert_input!) {
    insert_sessions_one(object: $session) {
      id
      season
      episode
      name
      created_at
      updated_at
    }
  }`

type AddSessionInput = {
  session: {
    id: string,
    season: number,
    episode: number,
    name: string,
    created_at?: Date,
    updated_at?: Date,
  }
}

type AddSessionOutput = {
  insert_sessions_one: {
    "id": string,
    "season": number,
    "episode": number,
    "name": string,
    "created_at": Date,
    "updated_at": Date
  }
}

export const createSession = async (variables: AddSessionInput, requestHeaders: {}) =>
  <AddSessionOutput>await gqlClient.request(query, variables, requestHeaders)