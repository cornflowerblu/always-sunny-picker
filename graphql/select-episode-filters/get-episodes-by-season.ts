import InitGraphQL from '../../lib/graphql'
import { gql } from 'graphql-request'

const client = InitGraphQL()

const query = gql`
  query getEpisodesBySeason($seasonId: uuid!) {
    episodes(
      where: { season: { id: { _eq: $seasonId } } }
      order_by: { episode_number: asc }
    ) {
      id
      episode_number
      title
    }
  }
`

type GetEpisodeInput = {
  seasonId: string
}

type GetEpisodeResponse = {
  episodes: [
    {
      id: string
      episode_number: number
      title: string
    }
  ]
}

export const getEpisodesBySeason = async (
  variables: GetEpisodeInput,
  requestHeaders: {}
) =>
  <GetEpisodeResponse>(
    await client.gqlClient.request(query, variables, requestHeaders)
  )
