SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.characters (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name text NOT NULL,
    last_name text,
    image_url text,
    show_id uuid NOT NULL
);
CREATE TABLE public.episodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    season_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    episode_number integer NOT NULL
);
CREATE TABLE public.seasons (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    season_number integer NOT NULL,
    show_id uuid NOT NULL
);
CREATE TABLE public.sessions (
    pk_id uuid DEFAULT gen_random_uuid() NOT NULL,
    id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    season integer NOT NULL,
    episode integer NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.shows (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    show_name text NOT NULL
);
ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_id_key PRIMARY KEY (id);
ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (pk_id);
ALTER TABLE ONLY public.shows
    ADD CONSTRAINT shows_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_sessions_updated_at BEFORE UPDATE ON public.sessions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_sessions_updated_at ON public.sessions IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_shows FOREIGN KEY (show_id) REFERENCES public.shows(id);
ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT seasons_episodes FOREIGN KEY (season_id) REFERENCES public.seasons(id);
ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_shows FOREIGN KEY (show_id) REFERENCES public.shows(id);
