import InitGraphQL from '../../lib/graphql'
import { gql } from 'graphql-request'
import {
  EpisodeDetailsInput,
  EpisodeDetailsOutput,
  SeasonsEpisodesInput,
  SeasonsEpisodesOutput,
  ShowSeasonsInput,
  ShowSeasonsOutput,
} from './shuffle.types'

const client = InitGraphQL()

const showSeasons = gql`
  query ShowSeasons($id: uuid!) {
    shows_by_pk(id: $id) {
      seasons_aggregate {
        aggregate {
          count
        }
      }
      id
      show_name
    }
  }
`

const seasonEpisodes = gql`
  query SeasonsEpisodes($seasonNumber: Int!) {
    seasons(where: { season_number: { _eq: $seasonNumber } }) {
      episodes_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

const episodeDetails = gql`
  query EpisodeDetails($seasonNumber: Int!, $episodeNumber: Int!) {
    episodes(
      where: {
        season: { season_number: { _eq: $seasonNumber } }
        episode_number: { _eq: $episodeNumber }
      }
    ) {
      id
      season {
        season_number
        show {
          characters_aggregate {
            aggregate {
              count
            }
            nodes {
              first_name
              last_name
              image_url
            }
          }
        }
      }
      episode_number
      title
      description
    }
  }
`

export const getShowSeasons = async (
  variables: ShowSeasonsInput,
  requestHeaders: {}
) =>
  <ShowSeasonsOutput>(
    await client.gqlClient.request(showSeasons, variables, requestHeaders)
  )

export const getSeasonEpisodes = async (
  variables: SeasonsEpisodesInput,
  requestHeaders: {}
) =>
  <SeasonsEpisodesOutput>(
    await client.gqlClient.request(seasonEpisodes, variables, requestHeaders)
  )

export const getEpisodeDetails = async (
  variables: EpisodeDetailsInput,
  requestHeaders: {}
) =>
  <EpisodeDetailsOutput>(
    await client.gqlClient.request(episodeDetails, variables, requestHeaders)
  )
