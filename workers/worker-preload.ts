import { PubSub, PushToQueue } from '../lib/redis'
import { shuffle } from '../lib/shuffle'
import { safelyParseJSON } from '../lib/utils'

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
    const result = await shuffle()
    await PushToQueue(producer, key, { params: result })
  }
})
