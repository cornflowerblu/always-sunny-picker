import InitGraphQL from "../lib/graphql";
import { gql } from 'graphql-request'

const client = InitGraphQL();

const query = gql`
  query GetAuthUser($email: String_comparison_exp!) {
    auth_users(where: {email: $email}) {
      id
      email
      password
    }
  }`

type ValidateUserInput = {
  email: {
    _eq: string,
  }
}

export type ValidateUserOutput = {
  auth_users: [{
    id: string,
    email: string,
    password: string,
  }]
}

export const getAuthUser = async (variables: ValidateUserInput, requestHeaders: {}) =>
  <ValidateUserOutput>await client.gqlClient.request(query, variables, requestHeaders)



