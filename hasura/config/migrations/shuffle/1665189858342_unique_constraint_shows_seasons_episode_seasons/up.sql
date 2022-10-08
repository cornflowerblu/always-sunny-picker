ALTER TABLE public.seasons 
ADD CONSTRAINT unique_shows_seasons
UNIQUE (show_id, season_number);

ALTER TABLE public.episodes 
ADD CONSTRAINT unique_seasons_episodes
UNIQUE (season_id, episode_number);