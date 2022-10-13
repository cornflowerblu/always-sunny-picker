import { getSingleEpisode } from "../graphql/select-episode-filters/get-single-episode";

export function safelyParseJSON(json: string) {
  let parsed;

  try {
    parsed = JSON.parse(json);
  } catch (e) {
    console.error('Badly formatted JSON. Cannot parse!');
    return {};
  }
  return parsed;
}

export const checkEpisodeExists = async (formattedId: string, adminRequestHeaders: {}) => 
  await getSingleEpisode({id: formattedId}, adminRequestHeaders)