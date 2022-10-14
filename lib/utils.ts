import { createEpisode } from "../graphql/create-episode";
import { createSeasonWithShow } from "../graphql/create-season-with-show";
import { getSeasonById } from "../graphql/get-season-id";
import { getSeasonByShowId } from "../graphql/get-seasons-by-show-id";
import { getSingleEpisode } from "../graphql/select-episode-filters/get-single-episode";
import InitGraphQL from "./graphql";

const client = InitGraphQL();

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

  export async function updateIfExists(show_id: string, season_number: number, title: string, episode_number: number, description: string){
    let seasonId;
    let season;

    const getSeasons = await getSeasonByShowId({
      id: show_id
    }, client.adminRequestHeaders);
    
    const seasons = getSeasons.shows_by_pk.seasons.map(season => season.season_number)
    
    if(seasons.includes(Number(season_number))) {
      seasonId = await getSeasonById({
        seasonNumber: season_number
      }, client.adminRequestHeaders)
    }              

    if(!seasonId) {
      let result = await createSeasonWithShow({
        season: { 
          season_number, 
          show_id
        }}, 
        client.adminRequestHeaders)
        season = result.insert_seasons_one.id
      } else {
        season = seasonId.seasons[0].id
      }    

    const data = await createEpisode({
      episode:
      {
        season_id: season,
        episode_number: episode_number,
        title: title,
        description: description
      }
    }, client.adminRequestHeaders);

    return data;
}