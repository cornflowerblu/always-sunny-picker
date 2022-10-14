import { PubSub, PushToQueue } from '../lib/redis'
import { safelyParseJSON } from '../lib/utils'
import { renderEpisode } from '../lib/shows'

// Redis queue of episodes
const { subscriber, producer } = PubSub('episode-cache')

subscriber.on('message', async (channel, message) => {
  const { id } = safelyParseJSON(message)

  if (id === null || id === undefined) {
    console.error('ID is null or undefined... moving on.')
    return
  }

  const key = id

  for (let i = 0; i <= 10; i++) {
    const { season, episode, character } = await renderEpisode(0)
    const result = {
      image: character.image_url,
      name: character.first_name,
      season: season,
      episode: episode,
    }
    await PushToQueue(producer, key, { params: result })
  }
})
