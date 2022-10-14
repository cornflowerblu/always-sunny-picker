import InitGraphQL from '../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  query GetCharactersWithImages($show: uuid!) {
    characters(where: { show_id: { _eq: $show } }) {
      first_name
      image_url
    }
  }
`

type CharactersInput = {
  show: string
}

type CharactersResponse = {
  characters: [
    {
      first_name: string
      image_url: string
    }
  ]
}

export const getCharactersWithImages = async (
  variables: CharactersInput,
  requestHeaders: {}
) =>
  <CharactersResponse>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
