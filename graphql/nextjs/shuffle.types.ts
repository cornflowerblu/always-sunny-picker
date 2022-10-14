export type ShowSeasonsInput = {
  id: string
}

export type ShowSeasonsOutput = {
  shows_by_pk: {
    seasons_aggregate: {
      aggregate: {
        count: number
      }
    }
    id: string
    show_name: string
  }
}

export type SeasonsEpisodesInput = {
  seasonNumber: number
}

export type SeasonsEpisodesOutput = {
  seasons: [
    {
      episodes_aggregate: {
        aggregate: {
          count: number
        }
      }
    }
  ]
}

export type EpisodeDetailsInput = {
  seasonNumber: number
  episodeNumber: number
}

export type EpisodeDetailsOutput = {
  episodes: [
    {
      id: string
      season: {
        season_number: number
        show: {
          show_name: string
          characters_aggregate: {
            aggregate: {
              count: number
            }
            nodes: [
              {
                first_name: string
                last_name: string
                image_url: string
              }
            ]
          }
        }
      }
      episode_number: number
      title: string
      description: string
    }
  ]
}
