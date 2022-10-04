--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--


\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

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


ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: characters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.characters (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name text NOT NULL,
    last_name text,
    image_url text,
    show_id uuid NOT NULL
);


ALTER TABLE public.characters OWNER TO postgres;

--
-- Name: episodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.episodes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    season_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    episode_number integer NOT NULL
);


ALTER TABLE public.episodes OWNER TO postgres;

--
-- Name: seasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seasons (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    season_number integer NOT NULL,
    show_id uuid NOT NULL
);


ALTER TABLE public.seasons OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    season integer NOT NULL,
    episode integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: shows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shows (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    show_name text NOT NULL
);


ALTER TABLE public.shows OWNER TO postgres;

--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.characters (id, first_name, last_name, image_url, show_id) VALUES ('a2832798-ba9a-4648-babf-382163d3b38a', 'Mac', NULL, 'https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/d3bee4d2-78ef-47c6-00e7-22460693ef00/public', '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.characters (id, first_name, last_name, image_url, show_id) VALUES ('01845378-4a33-40ae-8cfe-219149cb6d10', 'Dennis', 'Reynolds', 'https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/a5e1ae2c-a7b7-4c32-260e-6a4e8dec9e00/public', '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.characters (id, first_name, last_name, image_url, show_id) VALUES ('43434c93-bb4c-4a98-ba0e-8bf396529e73', 'Sweet Dee', NULL, 'https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/b8b93534-e6b1-4654-374d-ca008fe7ee00/public', '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.characters (id, first_name, last_name, image_url, show_id) VALUES ('24f3d54d-3a89-4052-9af0-d68cfc909cea', 'Charlie', 'Kelly', 'https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/67269d96-eefc-4081-fa01-9db49cccb500/public', '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.characters (id, first_name, last_name, image_url, show_id) VALUES ('ec58d0fa-30ac-46fd-94bd-673e25bbabb9', 'Frank', 'Reynolds', 'https://imagedelivery.net/L9C29yq0xYBazg8-FQ2piA/75fb99c2-fae1-4a28-d86c-201b560c5400/public', '950e38a3-3242-44dc-8585-fd30ced6627e');


--
-- Data for Name: episodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ad785c7b-c2bb-43e1-a216-7a30f1be3c03', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The Waitress Is Getting Married', 'The waitress is getting married and Dee is jealous that she''s beating her to the altar, so she tries to derail the wedding.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('58a57e6d-7c38-4a0c-90ed-bcb33d09076e', 'd04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 'The Gang Gets Racist', 'Following three friends who own and run a bar in Philadelphia. The guys hire Dee''s friend Terrell as a promoter for the bar and get more than they bargained for, and Charlie has to prove he''s not a racist.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('f052ae6f-14c8-4139-ae02-904f345068fe', 'd04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 'Charlie Wants an Abortion', 'A girl from Charlie''s past reveals they have a child together; Mac sees the benefits of being a pro-life advocate; Dennis uses an abortion rally to meet women.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('925a3bb5-0bdd-46af-98a3-de33b4eda7e4', 'd04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 'Underage Drinking: A National Concern', 'After noticing a rise in underage patrons, the gang decide to make a few accommodating adjustments for their younger crowd.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a6e976da-b43a-4770-801b-654ca95b1911', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The World Series Defense', 'The gang describes the trials and tribulations experienced during Game Five of the World Series in hopes the judge will clear them of all the citations received.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('6fe6bc79-f96e-4a84-a8c6-d2a153682c61', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'The Gang Broke Dee', 'After years of influence, Dee begins to embrace the self-loathing qualities the others have beaten into her.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('f5384b11-9c94-4934-9e49-4d731c8eabed', 'd04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 'Charlie Has Cancer', 'The gang learns that Charlie might have cancer; they hatch a scheme to alleviate his pain; Mac proves that he''s a narcissist.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('bcb8013a-ed3b-4afa-8048-b05e6487aa3e', 'd04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 'Gun Fever', 'The gang learns that the bar''s safe has been stolen; Dennis buys a gun; the others suspect that it was an inside job.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d2c43b8f-a0ed-4758-b249-29cf21553d30', 'd04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 'The Gang Finds a Dead Guy', 'Mac and Dennis pretend to be acquainted with a patron found dead in their bar in order to get closer to the dead man''s granddaughter.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ae6b5b26-e540-4b9b-bd26-f5107dc397e8', 'd04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 'Charlie Gets Molested', 'Charlie and Mac''s old high school gym teacher is accused of molesting their former peers; Dee and Dennis suspect that Charlie is also a victim.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ec77067d-c02e-4467-bc0f-349aa8cd2916', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'Charlie Gets Crippled', 'The gang learns something when Charlie must use a wheelchair; Dennis and Dee''s estranged father returns to town.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ac310a2b-1186-4821-8dc1-d0983b49f8a6', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'The Gang Goes Jihad', 'The gang uses unorthodox measures to save the bar from an overzealous business neighbour; Dennis and Dee''s mother returns to town and makes Frank''s life miserable.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b3f6e40b-68e2-4435-90cd-860cf94d1247', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'Dennis and Dee Go on Welfare', 'Dennis and Dee quit their jobs and concoct a plan to go on welfare; Mac and Charlie suffer the consequences when Dennis and Dee quit.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b82d5004-41b5-4587-a5bd-387620db2efd', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'Mac Bangs Dennis'' Mom', 'Barbara becomes jealous of Frank''s new relationship with Dee and Dennis and that he''s been dating; she tries to seduce Mac for revenge.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('67edf846-6a8d-4f9b-ba0b-be34f0fef923', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'Hundred Dollar Baby', 'Dee agrees to take boxing lessons from Frank after being mugged; Mac and Dennis enter Charlie in an underground street fight match; Dee and Charlie dabble with performance-enhancing supplements.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('4f6f2bd2-dc04-4f60-b01a-98de6654be3e', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'The Gang Gives Back', 'Mac, Dennis, Charlie and Dee are given community service for the arson mishap; Frank''s attempt to bond with Dennis backfires.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('03c4e074-bea8-4b8c-837c-1f63f8e1c5f8', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'The Gang Exploits a Miracle', 'A leaky pipe at Paddy''s creates a water stain in the shape of Virgin Mary; the gang tries to make money off of the mistake.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('3960706e-8a59-4420-b50c-39ec1e58c2aa', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'The Gang Runs for Office', 'The gang becomes interested in politics after Frank explains how easy it is to elicit bribes from politicians.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ad5b2b0c-3690-4d24-83d8-c206e82e2184', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'Charlie Goes America All Over Everybody''s Ass', 'After a rousing debate on people''s rights and freedoms, Mac and Dennis run Paddy''s without rules or restrictions.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('eed3af9d-9e1c-4d94-b2c9-8d81c80c5d87', 'a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 'Dennis and Dee Get a New Dad', 'Dee receives numerous e-mails on her social networking page from a stranger claiming to be her and Dennis'' father.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('7af74224-a4cf-4b90-a4ee-22c8a84c46f6', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Finds A Dumpster Baby', 'Dennis becomes disappointed after joining an environmentalist group; Dee and Mac decide to raise a baby they found in a rubbish bin.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d214af69-e303-45ae-b0cd-e5bce0a01ee4', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Gets Invincible', 'The Philadelphia Eagles hold open tryouts, and Mac, Dennis and Dee use the event for their personal competition.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ceb08fc5-e446-47e6-bc33-97ec15fcb779', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'Dennis and Dee''s Mom Is Dead', 'Frank gleefully celebrates the sudden death of his ex-wife; both Dee and Frank become enraged at Barbara''s will reading.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('884b58cb-915c-419c-9155-571cbfc325f7', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Gets Held Hostage', 'The McPoyle brothers and their sister, Margaret, take the gang hostage at their own bar. Elsewhere, Frank tries to find his will after Charlie hid it.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('76c659a0-c2f6-4307-8769-51d8000f9dee', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Aluminum Monster vs. Fatty Magoo', 'Dee discovers the biggest loser from high school is now a successful fashion designer, making Dee the biggest loser now.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('afb58eec-f224-4c66-98ee-b8a97f97bd95', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Solves the North Korea Situation', 'A Korean restaurateur threatens to bump Paddy''s from the coveted and profitable stop on the city''s annual pub crawl.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('6445d515-6495-4846-a564-7287bdba472a', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Sells Out', 'The gang agrees to sell Paddy''s when they get an offer they can''t refuse; Dee and Charlie are forced to find jobs.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('303763e7-05aa-46c0-83d5-16202a59eb14', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'Frank Sets Sweet Dee on Fire', 'The gang tries to become famous; Frank, Charlie and Mac try their hands at news reporting; Dee and Dennis start club-hopping.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2a8f7d54-fc18-4326-bef9-34924aa8a9e5', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'Sweet Dee''s Dating a Retarded Person', 'Dee starts dating a famous local rapper; Mac, Dennis, Charlie and Frank decide to start their own band.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('9682f47d-a5d4-4abe-95f4-931c8e0d01ba', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'Mac Is a Serial Killer', 'Frank, Dennis and Dee suspect Mac is the serial killer they read about; they devise a plan to catch him in the act.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('7f4d1030-a291-47a7-879a-0009cb22e85b', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'Dennis Looks Like a Registered Sex Offender', 'Dennis'' mistaken identity bothers him for the wrong reasons; Mac tries to bond with his ex-convict father, who bothers Dee.', 11);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('24a31f6e-d139-49f5-a1d7-af1fb6d049d1', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Gets Whacked (Part 1)', 'After the gang finds themselves in debt to the mob, Dennis must become a male escort to save them from a grisly fate.', 12);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('63271efa-93b9-4087-8af5-764c17ebd4f3', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Gets Whacked (Part 2)', 'After the gang finds themselves in debt to the mob, Dennis must become a male escort to save them from a grisly fate.', 13);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('0b235501-22a7-4cfc-8dc9-e2eb6c876919', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'Bums: Making a Mess All Over the City', 'Mac and Dee become vigilantes in an attempt to rid the neighbourhood of the homeless; Frank and Dennis impersonate police officers; Charlie must step in and end his friends'' corrupt activity.', 14);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('7bd8a450-8f87-4c3f-8282-95854509ba97', 'c5d52064-2785-4c23-ace1-0ec4a32571a0', 'The Gang Dances Their Asses Off', 'Paddy''s is accidentally put up as a prize for a dance marathon; the gang must enter the competition to save the bar from the Waitress and Father Mara.', 15);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('cfa61bd5-6118-4d3d-baee-a1dfe44becde', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The Gang Wrestles for the Troops', 'The gang decides to put on a wrestling show for the returning troops; Dee is surprised when the soldier she''s been chatting with online is not what she expected.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('5e512dd5-79d1-491b-b63b-38ba32e27f25', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'Paddy''s Pub: Home of the Original Kitten Mittens', 'When a merchandising convention comes to town, the gang tries to develop marketable products in an attempt to build the Paddy''s brand.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('6e8ec477-e86c-442c-a798-87dabe920fe4', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'The Gang Solves the Gas Crisis', 'Mac, Dennis and Charlie invest in barrels of gasoline and sell them door to door; Dee and Frank discover that Bruce plans to give money to a Muslim centre.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d578bf4b-33b3-4b22-b6df-d31e32e6a2ed', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'America''s Next Top Paddy''s Billboard Model Contest', 'After investing in a billboard, Frank and Mac judge a competition to find Paddy''s next top model; Dee and Charlie go on a mission to create a YouTube sensation.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('f5414840-efd7-4dac-824a-a28a0c9b8a5f', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Mac''s Banging the Waitress Part 2', 'Charlie asks Mac to beat up the waitress''s new boyfriend; Dennis tries to convince Charlie that they are best friends.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2debd7c3-c905-4d27-88ba-ba1087d33ef9', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Mac and Charlie Die, Part 1', 'After Mac''s father is released from prison, Mac and Charlie stage their own deaths to save their lives; Frank, Dee and Dennis find unique ways of dealing with the loss.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a72b51b5-30d8-484b-9aa2-c4090a58ea19', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Mac and Charlie Die, Part 2', 'After Mac''s father is released from prison, Mac and Charlie stage their own deaths to save their lives; Frank, Dee and Dennis find unique ways of dealing with the loss.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('5d551e69-237d-4bd9-b45f-a325756014f8', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Who Pooped the Bed?', 'Frank and Charlie discover that somebody has pooped in their bed; Dee leads the waitress and Artemis on a night out on the town.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('0d28e030-cf00-4657-9022-4da5a3d30a67', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Paddy''s Pub: The Worst Bar in Philadelphia', 'After a newspaper reporter calls Paddy''s the worst bar in Philadelphia, the gang kidnaps him in an effort to change his mind.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ab8c4725-0f75-47b4-a88a-86dff274df4d', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Dennis Reynolds: An Erotic Life', 'After finding Dennis'' erotic memoir, Mac and Frank try to profit from the masterpiece; Dee and Charlie spend a day in each other''s shoes.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('1ab1586c-e95f-49cf-90a1-5218ab483dff', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Sweet Dee Has a Heart Attack', 'After Dee has a heart attack, she and Dennis try to live healthier lifestyles; Charlie and Mac join the corporate workforce to get health insurance.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d2631fa8-9b13-4565-8325-682457849ead', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'The Gang Cracks the Liberty Bell', 'Hoping to make the bar a landmark, the gang tells the Philadelphia Historical Society that Paddy''s Pub was responsible for cracking the Liberty Bell.', 11);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('591cf0d0-d7f1-4aee-b7a5-e0b12c31418e', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'The Gang Gets Extreme: Home Makeover Edition', 'To try to make their dreams come true, the gang decides to pay it forward and give an unlucky family an extreme home makeover.', 12);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b00cbc49-c386-4b8a-801f-9e7406d12d2b', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'The Nightman Cometh', 'With the help and support of his friends, Charlie stages a rock opera based on his song "Nightman."', 13);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('e1f21dea-e296-43a6-809c-052a8f0eef0b', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'Mac and Dennis Break Up', 'Mac and Dennis decide to spend some time apart; Chris lends his feline expertise to help Dee find her cat.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('6e8ddc08-dc11-45fc-ba53-10fb840b8b8a', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The D.E.N.N.I.S. System', 'Dennis reveals his fool-proof system for seducing any woman to the rest of the gang, but they don''t grasp the concept.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('55ebd63b-29d7-40f8-b996-06b8e0917adf', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'Mac and Charlie Write a Movie', 'Dee gets a part in the new M. Night Shyamalan movie; Mac and Charlie see a perfect opportunity to sell their movie.', 11);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('c7784138-bea8-4536-a216-ab13f8d9dc0c', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The Gang Reignites the Rivalry', 'After a 10-year ban, the Paddy''s team is eligible to compete in Flipadelphia, a citywide flip cup tournament.', 12);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('61c90dd1-f04d-4c8b-99f7-ecf70ceaacee', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Mac Fights Gay Marriage', 'Mac pulls out the big guns to protect the sanctity of marriage, while the rest of the gang reap the rewards of marital bliss.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('cc837a3d-0cd0-4df7-9e2f-29e2e74224af', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Dennis Gets Divorced', 'Marital bliss turns into business, as the gang experiences the emotional and economic hardships of divorce.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('8ea59258-54ad-4f58-9d3b-d4fcb6c3a2e6', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'The Gang Buys a Boat', 'Mac, Charlie and Dennis use some extra income to purchase a boat; the gang sets sail on the open sea.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d0cdca3c-8b76-4fa2-944e-3dea17dfa0f4', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Mac''s Big Break', 'Mac finally gets his big break after correctly answering a trivia question on the radio; Frank, Dennis, and Dee take their bar-banter to the internet with their own podcast.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('1f18e7b7-be49-4e07-aacb-6ba5f98b7668', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Mac and Charlie: White Trash', 'Mac and Charlie try to fix up an abandoned pool in order to beat the heat wave; Dennis and Dee try to beat the heat in a more ''dignified'' and ''upper-class'' way.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a025476e-24d0-44a8-ab0c-870a7bf9eb54', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Who Got Dee Pregnant?', 'The gang gets a real scare after Dee reveals she''s pregnant, forcing the guys to recall their last hazy Halloween party to determine who might be the father.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2ca26383-32b5-4b21-978d-0895592430ba', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'The Gang Gets a New Member', 'A blast from the past motivates the guys to add another person to their membership; Dee reconsiders her future.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('eda4a1c2-6f0a-44a0-a890-a2cb6785f9bf', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Dee Reynolds: Shaping America''s Youth', 'Dee takes a job as a substitute teacher and exposes her students to the culture of Paddy''s with a field trip to see the gang''s take on the `Lethal Weapon'' series.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ed5fd0d0-f842-4eee-bb9b-a27a12958e44', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Charlie Kelly: King of the Rats', 'Keeping the basement rodent-free drives Charlie to the brink; the gang throws a surprise party for Charlie.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('f85f20cd-dd8b-46fd-92b7-f352b101b88a', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'The Gang Gets Stranded in the Woods', 'Things go awry as the gang travels to Atlantic City for a charity benefit; Frank, Dee and Mac try to survive in the woods; Dennis and Charlie hitch a ride to the city and have the night of their lives.', 11);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ba1b194d-10f1-41ca-a81b-1b9845f77dbd', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Dee Gives Birth', 'The gang tries to figure out who the father of Dee''s baby is by throwing a house party for all her former flings.', 12);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('c41d8543-8c14-4e4d-ab02-dfda9d9b3034', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'A Very Sunny Christmas (Part 1)', 'Mac, Charlie, Dennis, Dee and Frank embark on a holiday adventure filled with stolen toys, childhood videos, naked elves and a bloody run-in with Santa Claus.', 13);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('078a93f8-0e3f-4f05-b61f-cbeaede8d1a0', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'A Very Sunny Christmas (Part 2)', 'Mac, Charlie, Dennis, Dee and Frank embark on a holiday adventure filled with stolen toys, childhood videos, naked elves and a bloody run in with Santa Claus.', 14);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('73688059-405d-402f-95a8-8e04faf30d48', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Mac & Dennis: Manhunters', 'Dee and Charlie develop an insatiable cannibalistic hunger after mistakenly eating some of Frank''s human meat; Mac and Dennis take hunting to the next level.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('3d629fac-47ce-4114-8ae9-3a98b26061ec', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'Mac''s Mom Burns Her House Down', 'Charlie and Mac set up a truly odd couple after Mac''s mom burns the house down; Frank discovers the importance of paternal care after Dee falls ill.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('7cbdd341-1cd6-4183-816a-dc9f4040a1ce', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The Gang Gives Frank an Intervention', 'Dee, Dennis and Charlie plan an intervention for Frank; Mac and Frank are both interested in Aunt Donna.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('fde7c3d8-e476-474f-b5d2-7e35924076e2', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'Frank''s Pretty Woman', 'The gang attempts an image makeover to uncover the heart of gold that exists deep inside Frank''s prostitute fiancée.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b7fd22ac-c3c1-4d51-82b0-ad1c5db78d06', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'The Gang Goes to the Jersey Shore', 'Dee and Dennis take the gang to their favorite childhood vacation spot; Mac, Frank and Charlie have the nights of their lives.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('cffe8a93-3af7-415b-96e7-72eebeafc6f3', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'Frank Reynolds'' Little Beauties', 'Frank accidentally gets into the child pageantry business; Dee tries to get revenge on stage mothers everywhere; Mac, Dennis and Charlie think they''ve found their dark horse.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('966bfc27-2a79-4fcd-899b-fbfe7c13d3ce', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'Sweet Dee Gets Audited', 'When Sweet Dee has been selected by the IRS for an audit, she tries to get out of it; the gang institutes a new democratic voting system.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('7be53d62-e9aa-4181-9c2a-7789176ce323', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'Frank''s Brother', 'The gang is shocked when Frank''s long-lost brother, Gino, arrives at Paddy''s Pub; he quickly spills family secrets.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('acc7952e-c55e-4d11-9f33-1d3d64736049', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The Gang Exploits the Mortgage Crisis', 'Frank, Mac and Dennis try their hand at real estate; Dee arranges to be a surrogate mother to a wealthy couple; Charlie faces off with a lawyer.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d7525925-c26c-4669-b710-53f76491b07a', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The Gang Hits the Road', 'Dennis, Mac and Frank plan a trip to see the Grand Canyon; Dee and her small bladder crash the party; Charlie shows up despite his fear of leaving the state.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('36896b1b-2a0a-400d-a3e4-579e48393d3b', 'b9a15a85-5d27-416d-94ca-a65e52695ce9', 'The Great Recession', 'Mac and Dennis try to keep the bar afloat in the tough economic times; Frank starts a family business with Dee; newly poor people gather outside the bar.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('c034b11b-3062-411e-bf11-c639011d1f24', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'The Storm of the Century', 'The gang joins the masses in a race to secure scarce resources before a storm; Frank refuses to buy into the media hype about the storm.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('1790fbdd-ad0c-405f-80fb-788217970028', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'Chardee MacDennis: The Game of Games', 'It''s an epic battle when the gang plays one of the most twisted board games ever; Dee and Dennis face Mac, Charlie and Frank.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('51e59855-5252-4b6a-b047-a246950d234c', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'The Anti-Social Network', 'The gang uses the Internet to cyber stalk their prey; Frank tries to drum up business for Paddy''s with a viral video.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('9ee42679-82aa-405b-b5db-163607f7b847', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'The Gang Gets Trapped', 'The gang designs a scheme to extract an artefact; their plans are jeopardized when the owners are still at home.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('22f1c198-bb83-4782-afd3-5a46bfaf19e2', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'How Mac Got Fat', 'Mac confesses to a confused priest that his weight gain is the fault of the other members of the gang.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('65c2e8b2-e093-40a3-86a5-38f1c1d15018', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'Thunder Gun Express', 'The gang puts all its effort into seeing the hottest action movie of the summer; the president visits Philadelphia.', 11);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('6aa0f151-04ba-467d-b841-a42c82bf50fd', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'The High School Reuinion', 'The gang''s high school reunion has come at last; each of them recalls the events that shaped them into the people they are now.', 12);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('cd57db85-158c-4c49-a89b-bb96afee531f', '8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 'The High School Reunion Part 2: The Gang''s Revenge', 'The gang hatches a plan to repair their tarnished reputation in the eyes of former high-school classmates.', 13);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('ec6a8eba-29da-461b-b126-e56d9db48049', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'Pop-Pop: The Final Solution', 'Dennis and Dee decide whether or not to pull the plug on their ailing grandfather; the gang learns of Pop-Pop''s history as a Nazi; Mac, Charlie and Frank set off in search of Pop-Pop''s spoils from the war.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a8bc9dbd-b924-4776-9aba-3e6d78971ecf', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'The Gang Recycles Their Trash', 'Frank concocts a plan to undercut the garbage collectors'' union to get the contract to pick up the city''s trash.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b2e00b00-a88e-4c40-800f-adcfae03366c', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'The Maureen Ponderosa Wedding Massacre', 'In an effort to sever all ties with Maureen, Dennis and the gang plan to crash Maureen''s wedding and wreak havoc.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('0d589a9c-7a79-474a-9d11-6fc105e7c30c', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'Charlie and Dee Find Love', 'After Charlie and Dee invade the world of the wealthy, they find romance within, but Mac, Dennis and Frank try to get in on the action.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('e0bf9813-f2ea-4922-8789-8c50f58ce115', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'Frank''s Back in Business', 'Frank cleans up so he can help out his old company with one last big merger; an unwritten rule of the bar gets the rest of the gang caught up in a case of mistaken identity.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2d5745ba-c5bc-4d87-9e9e-5137d96478fd', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'Charlie Rules the World', 'The gang tries to define the difference between the real and the virtual worlds after slipping into an unhealthy obsession with computer games.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b296ff7e-7130-480e-b9e3-e9baa89a8059', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'The Gang Dines Out', 'Mac and Dennis are enjoying a private dinner at Guigino''s when they spot Charlie and Frank; Dee turns up at a table for one and watches the fight.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('76fa7c8a-5c52-4f09-85a5-3c8c17d4dd29', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'Reynolds vs. Reynolds: The Cereal Defense', 'Frank and Dennis each present their cases; Dee and Charlie act as lawyers; Mac serves at the judge and bailiff.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('288ae000-31b1-4d6b-9e33-d7aaf4670be4', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'Gun Fever Too: Still Hot', 'The gang takes a look at the gun ownership process and alternatives to find a common ground on this heated issue.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('9ff6aed8-285d-4525-a002-ccea74e21169', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'The Gang Tries Desperately to Win an Award', 'After years of no recognition for the time spent in the bar industry, the gang tries to change its ways to please the patrons.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('328816f7-38db-4b7f-a876-745861013c18', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'Mac and Dennis Buy a Timeshare', 'The gang does its best to recoup its investments in questionable schemes by dumping the losses on Ben the soldier.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('0f9c5af6-d62a-4d7c-9195-2db96e135a67', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'Mac Day', 'Everyone in the gang gets a day to do what they want and everyone else has to participate; this is Mac''s day.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('bf884874-6ba9-4273-a573-12fbce19e165', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'The Gang Saves the Day', 'A routine trip to a convenience store places the gang in the middle of an armed robbery; each member faces their reactions.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('feb1dbd9-d8e5-481e-b0bf-227635110d56', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'The Gang Gets Quarantined', 'The gang voluntarily quarantine themselves inside of Paddy''s in an attempt to keep their singing voices pristine for an upcoming competition when a severe flu outbreak sweeps Philadelphia.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('47cc23e8-8fe1-4c47-988e-df955cd462da', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'Flowers for Charlie', 'An experiment successfully multiplies Charlie''s intellect and takes him away from the bar; the gang find themselves struggling to complete Charlie''s work.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('841bd25b-c77d-4d7d-ade2-01059f30bb69', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'Charlie''s Mom Has Cancer', 'The gang rallies around Charlie''s mom as she battles cancer. Mac, Charlie and Dee struggle with their faith; Frank loses his memory and his mind in a quest for buried treasure; a revelation that will shake Paddy''s.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d3a9a721-b808-4e45-ab73-32efa8295f23', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'The Gang Makes Lethal Weapon 6', 'Creative differences over what constitutes tasteful nudity causes Frank to pull his money out of "Lethal Weapon 6"; Mac, Dennis and Charlie screen their rough footage for investors.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('e2e15c7e-af52-434f-88aa-da32b89ce25e', '1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 'The Gang Squashes Their Beefs', 'When bad blood with old foes complicates the ideal Thanksgiving dinner, the gang tries its best to make amends.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2a2843ff-657b-4a2b-8d2b-698b12ade8a3', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'The Gang Beats Boggs', 'The group decides that they are capable of breaking a legendary beer drinking record set by Wade Boggs; Mac oversees the execution.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('4ded7096-cb47-4618-93d5-4b442139462d', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'The Gang Group Dates', 'In an effort to expand their matchmaking possibilities, Dee, Dennis, Mac, Charlie and Frank dive into the online dating scene.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('e5628fa6-262b-471d-9158-b0359ae11d07', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'Psycho Pete Returns', 'Pete is released from the mental hospital; Dee and Dennis try to have him recommitted while Mac and Charlie try to pull him back into his hard-partying form.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('e53fbed0-6bd1-4c74-bc18-842722b45e90', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'Charlie Work', 'Charlie''s in charge when a surprise health inspection interrupts a less hygienic project; he rallies the gang together to make sure Paddy''s passes the test.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('5c72bd79-a8db-4383-9f75-2eb98b4e7c8d', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'The Gang Spies Like U.S.', 'Mac and Dennis convince Dee to help them spy on the fish factory; Frank and Charlie become suspicious of the other three and investigate.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('34661b56-7eba-4327-b19e-fa0e5428465a', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'The Gang Misses the Boat', 'The group separates from one another to find out who they are as individuals after another failed endeavor.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('beb985c4-2ef1-4459-abc1-864fb1dcf329', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'Mac Kills His Dad', 'Mac''s dad, Luther, is listed as a murder suspect; Mac investigates the murder in an effort to clear his father''s name.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b50e7fee-5e45-4fd4-8042-e312d6b72f32', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'The Gang Goes on Family Fight', 'The troupe appears on on a nationally televised game show; Dennis tries his hardest to hide their eccentricities without any help.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2d0a377b-0772-4528-903d-407140f661fd', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'Frank Retires', 'Frank decides to retire; the foursome begin to plot and plan ways for each of them to take control of the bar.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('78ff9e53-78e6-4ffb-b1ca-7828c9156aab', 'f43df586-9649-48e4-a698-8f17fce50bf7', 'Ass Kickers United: Mac and Charlie Join a Cult', 'In an effort to get in shape, Charlie and Mac join a fitness group that turns out to be a new way of life.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('5e3ca0b3-603b-49be-bdf1-32b3da27d47d', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'Chardee MacDennis 2: Electric Boogaloo', 'The foursome demonstrate Chardee MacDennis for an interested board game executive, but the game sends things into chaos despite the gang''s truce.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('895e7055-6687-4392-b3aa-6b20fc342874', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'Frank Falls Out the Window', 'After falling out of the window, Frank thinks that it''s 2006, and in typical self serving fashion, the other three see this as a chance to fix their past mistakes.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('cada0887-0302-42ab-b907-83a2df43442f', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'The Gang Hits the Slopes', 'Dennis and Frank face Dee and Mac for control of the mountain; Charlie learns the slopes have their own set of rules.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('955204d3-5eb9-4451-bf7a-be39b65590e8', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'Dee Made a Smut Film', 'Frank and Mac try to market Charlie as a talented artist for profit; Dennis and Dee bring Dennis'' erotic memoirs to the screen.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('c04c4e49-b4c0-4714-b1ae-c3e07587ea88', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'Mac & Dennis Move to the Suburbs', 'Dennis and Mac head to the suburbs for cheap rent and open spaces but quickly find out that they are meant for city life.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('9dc47332-fe39-4cf1-9857-afa23dd23d68', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'Being Frank', 'Following day in the life of Frank Reynolds from his point of view as he joins the gang for their latest scheme.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('018e2139-32aa-4f26-a88c-faf7552ac085', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'McPoyle vs. Ponderosa: The Trial of the Century', 'Old grievances resurface when Liam McPoyle teams up with the Lawyer to sue Bill Ponderosa for his lost eye.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('97f7fffd-b988-482b-93c1-d03bd42a865a', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'Charlie Catches a Leprechaun', 'Dennis tries to create a mobile Paddy''s pub experience but receives no help from customers; Mac and Charlie try to catch a thieving leprechaun.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('aa60025a-16d4-40b0-a81f-c2f5a45254b4', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'The Gang Goes to Hell', 'The gang tries to shake things up by going on a cruise but find that old habits die hard even out at sea.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('c3ee662b-599f-4f02-8e23-5d2f26e891cd', 'be0c5d27-9435-4851-9117-02dbc1e33917', 'The Gang Goes to Hell: Part Two', 'While facing eminent death, Charlie, Mac, Dee, Dennis and Frank finally take the opportunity to get real with one another.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b0405045-824d-4a4e-ad9e-7d776251e09b', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'The Gang Turns Black', 'After an electric heating blanket shorts out while the gang watches `The Wiz'', they look in the mirror and realise they''ve turned black. To get back to being themselves they go through all manner of classic body-switch movie shenanigans.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b4d28b0d-4943-474b-8eaa-91ac9c8c32d6', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'The Gang Goes to a Water Park', 'The group heads to the water park, each with an ulterior motive. Dennis takes on a protégé, Frank and Charlie are determined to ride every ride, and Mac and Dee get stuck in a tube slide.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('46b36b8a-db8a-4314-b61f-672f3900627f', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'Old Lady House: A Situation Comedy', 'Charlie believes Mac''s mother holds his mother hostage, so the gang installs spy cameras to monitor what goes on in their house.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('bb523df3-0554-4e3a-a229-d1fce011b105', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'Wolf Cola: A Public Relations Nightmare', 'A news segment announces that Wolf Cola is the official drink of Boko Haram so Dee and Dennis work on the PR nightmare, and Charlie and Mac try to promote Fight Milk.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('34b524db-1489-44f3-b2d5-413bc738c114', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'Making Dennis Reynolds a Murderer', 'When a cat-woman known as Maureen Ponderosa is found dead in an alley, Dennis becomes the prime suspect and must have an interview with the police.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('fb57ed37-1f49-45c8-8a2d-f9ff3697fc20', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'Hero or Hate Crime?', 'The gang seeks the help of a professional arbitrator to decide which of them could be the rightful owner of a lottery ticket.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('6529fd4b-51e3-46a4-8922-bb3ec4ecdf39', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'PTSDee', 'After finding out that she is a male stripper''s "rock bottom," Dee sets out to prove that she is the best thing that ever happened to him. Later, Dennis takes over for a stripper, and Mac and Frank play a war game.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('3bc2a04f-4bbc-4644-9db6-2fbed068a3b4', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'The Gang Tends Bar', 'Customers pack Paddy''s on Valentine''s Day so Dennis implores the gang to do one day of actual work, but a mystery crate that Cricket spots in the alley distracts everyone.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('f0f82066-de02-4e06-9e25-1307d5b960f1', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'A Cricket''s Tale', 'A typical day in Cricket''s world ends with possible redemption when his family intervenes, setting up a chance to move on from the gang, find love and reemerge as Matthew Mara once again.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('311afa27-004b-426f-b8d5-3dc0922e5c3a', '8d9dc34b-2354-4424-80e4-07cdc6023fdb', 'Dennis'' Double Life', 'Dennis reveals that he has a baby from his layover time in North Dakota and everyone offers solutions to the problem, but in the end, Dennis must decide which life to continue to lead.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('3d21dc59-94b8-4c20-b5e0-5555a1528133', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Makes Paddy''s Great Again', 'Cindy, the new female member of the gang, successfully pulls off scams; everything works until Mac introduces a lifelike sex doll that looks exactly like Dennis.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('804df8cf-294a-4550-a7c0-1bbd0936f616', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Escapes', 'To boost productivity, Dee hires an at-home "Escape Room Experience" service to come to Dennis and Mac''s apartment.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('d4169e25-96c7-44f2-8ef4-414218361ee6', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Beats Boggs: Ladies Reboot', 'To one-up the guys, Dee organizes an "all-female reboot" of the Wade Boggs challenge on a first-of-its-kind, all-female flight headed to Los Angeles for a women''s march.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('f6c72e59-08b3-47a2-b366-817ab2c60eb7', '137fd89b-6569-45a9-96e6-a4568650c17d', 'Time''s Up for the Gang', 'When Paddy''s is put on a list of bars that are sexually hostile toward women, the gang must attend a sexual harassment seminar to get their establishment removed from the list.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2a6426e9-d62f-432e-9cbe-3a5cfa4e76be', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Gets New Wheels', 'Dee gets in with a group of cool, rich housewives; Dennis hits it off with some everyday blue-collar bros, and Frank struggles to renew his license; elsewhere, Charlie and Mac deal with a new generation of bicycle bullies.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('98fdb369-f5b4-4993-acf3-bedaae97b918', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Solves the Bathroom Problem', 'Jimmy Buffett is in town and the positive vibes are alive at the bar; when Mac comes out of the women''s bathroom, no one can leave until the bathroom situation is solved.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('8d8743b0-b7ac-4b52-91fe-b6f818abfcf9', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Does a Clip Show', 'With nothing to do while their phones update to the latest software, the gang decides to reminisce on old times. As everyone misremembers events from their past, the gang''s current reality becomes altered.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('4ebc48dc-db85-4bc7-b5b4-3b5923aa58f1', '137fd89b-6569-45a9-96e6-a4568650c17d', 'Charlie''s Home Alone', 'The weekend of Super Bowl LII from Charlie''s perspective; while Charlie searches the back office, Cricket steals the suit leaving Charlie home alone to defend himself.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b431b2ae-8cf3-4de5-92fa-6e243daec6d3', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Wins the Big Game', 'In the most important weekend of their lives, Frank treats the gang and a crew of their ragtag hangers-on with tickets to see the Eagles in the Super Bowl.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('3441cf46-c8e8-4b15-ae64-ec1e66b94d7a', '137fd89b-6569-45a9-96e6-a4568650c17d', 'Mac Finds His Pride', 'Frank tries to recruit Mac for the gang''s float for the Gay Pride Parade. Frank comes to the realization that Mac will never be secure with his sexual identity unless he comes out to his father.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('0f1302da-660f-4a9a-8ac4-a7bd6c8fe672', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'The Gang Gets Romantic', 'Mac concocts a scheme to attract single women to rent Dennis'' bedroom, while Frank and Charlie make similar plans to draw in young, European co-eds, but neither ad attracts their intended target.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('eddbc6a8-0793-415c-98a0-3d3ec57bb529', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'Thunder Gun 4: Maximum Cool', 'Landing in the middle of a focus group after a screening of "Thunder Gun 4: Maximum Cool," the gang is determined to restore glory and traditional American values back into the franchise, even if it involves sabotage.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a2c3df5b-ca77-4c57-8150-3b9a7c5e8260', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'Dee Day', 'The guys are in the final preparation stage for an unknown scheme, when Dee enters to inform them that it is `Dee Day'', and they have to do everything she wants without complaint.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a50c9852-9e5f-45e0-89ec-40940424b036', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'The Gang Chokes', 'Annoyed that the Gang failed to react as he nearly choked to death on an appetizer, Frank decides the Waiter is the only person who has his back.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('327bba24-ff1e-48a5-85ee-b2abe912c83a', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'The Gang Texts', 'During their trip to the Philadelphia Zoo, Mac sets up a text group chain for The Gang, but confusion sets in and The Gang must learn from the meerkats on how to communicate properly in a group.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a1d209c5-b167-49c5-acd4-21ba3e943458', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'The Janitor Always Mops Twice', 'In the black-and-white noir world of his memory, Charlie navigates the seedy underbelly of Philadelphia as Frank has been "diarrhea poisoned," and it’s up to Charlie to clean up the mess.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('b7bccb80-79cb-445a-b74f-ecccf4550f23', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'The Gang Solves Global Warming', 'As a record-breaking heat wave overtakes Philly, the Gang plans to profit from global warming by pumping up the A/C so people will congregate at Paddy’s and save energy at home.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a063b24e-a064-4ff1-ab4f-075c458240ab', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'Paddy''s Has a Jumper', 'Trapped inside Paddy’s with a suicide jumper on the roof, the Gang wonders if they should bother intervening with an algorithm of their own – Could he, would he, should we?', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('3643364b-dc09-4584-8ad0-abac6e0d92df', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'A Woman''s Right to Chop', 'When a trendy new hair salon opens up right next door to Paddy’s, Dennis and Frank go on the offensive to stop women from cutting off their hair. Meanwhile, Mac is reunited with his childhood dog Poppins.', 9);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('05e81b2c-1847-4eff-b22f-a9137414cf5d', '4f74a777-de16-4f68-9a52-dc66cb423e41', 'Waiting for Big Mo', 'Dennis and Charlie stand guard at the entrance to their laser tag base waiting to ambush the legendary "Big Mo," but Dennis begins to ponder the reasons they play laser tag and if their pursuit of a victory is worth their effort.', 10);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('14bf7cac-bab6-44d1-b035-cac4a81fa11a', '9548d4c3-e487-4b06-ac55-10b44c2f0178', '2020: A Year In Review', 'The Gang looks back on 2020 to justify their numerous PPE loans. In doing so, it is revealed that they contributed to the chaos of the past political year way more than anyone could have imagined.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2c1b5d09-21b0-4cf2-aa68-b350d174d39c', '9548d4c3-e487-4b06-ac55-10b44c2f0178', 'The Gang Makes Lethal Weapon 7', 'Upon discovering that their self-made Lethal Weapon sequels have been pulled from the local library, the Gang decides to address their political incorrectness by making another film -- Lethal Weapon 7.', 2);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('dd6a16f1-6e4e-49a7-8d87-b8563c3459f1', '9548d4c3-e487-4b06-ac55-10b44c2f0178', 'The Gang Buys A Roller Rink', 'It’s the 90s, and the Gang hangs out one last time at the local roller rink before going their separate ways.', 3);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('da2eb367-4f7b-4d23-8dcb-27de738032fd', '9548d4c3-e487-4b06-ac55-10b44c2f0178', 'The Gang Replaces Dee With A Monkey', 'When the Gang suspects Dee is menopausal, they scramble to find a new employee for Paddy’s Pub. Meanwhile, Dee decides to put her acting career on hold in order to mentor young actors.', 4);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('482682b9-7e3d-46ef-968c-d627e0e942ab', '9548d4c3-e487-4b06-ac55-10b44c2f0178', 'The Gang Goes to Ireland', 'The Gang’s in Dublin! Dennis longs for a charming, authentic European experience, but ends up helping Frank with some of his business’s ''dirty work.'' Mac and Charlie learn about their Irish heritage.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('6eee4f5e-3c41-4669-8f56-bb24ec11657e', '9548d4c3-e487-4b06-ac55-10b44c2f0178', 'The Gang''s Still in Ireland', 'Dennis and Dee explore their new accommodations in the countryside; Frank accompanies Charlie to find the truth about Charlie’s Irish childhood pen pal; Mac has an identity crisis and decides to join the seminary.', 6);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('9f123a21-7569-42d9-8b6c-abe5a9aa1c74', '9548d4c3-e487-4b06-ac55-10b44c2f0178', 'Dee Sinks In A Bog', 'Guided by a young priest, Mac spends a day at the seminary to truly understand what it takes to become a priest. Dennis and Frank plan an elaborate trap at the castle to humiliate Charlie’s pen pal. Dee prepares for a date with an Irish doctor.', 7);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('474f66f5-83c4-4f3a-baf4-ba1a2987b86b', '9548d4c3-e487-4b06-ac55-10b44c2f0178', 'The Gang Carries a Corpse Up a Mountain', 'The Gang attempts to ascend a mountain in order for Charlie to fulfill an old and mysterious Irish burial tradition. But one by one, the Gang backs out until Charlie is left to honor the dead body alone.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('8055bf3a-bc03-4b10-8f66-452a2e50c6e6', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'The Gang Gets Analyzed', 'The gang goes to a therapist''s office to work through their mountain of issues, and Dennis'' psychology is exposed as abnormal.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('0c3ccf06-8bf3-4398-8bb9-7f7d6274261d', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'The Gang Gets Analyzed', 'The gang goes to a therapist''s office to work through their mountain of issues, and Dennis'' psychology is exposed as abnormal.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('2c011799-c181-4bf9-bf69-24d74bf5b5ee', '8a22d4d9-713b-41a0-90b7-5a038b9ae052', 'Mac and Charlie Die, Part 1', 'After Mac''s father is released from prison, Mac and Charlie stage their own deaths to save their lives. Frank, Dee and Dennis find unique ways of dealing with the loss.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('c5cac628-0d49-4aec-86fa-90a878b26e0f', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Gets New Wheels', 'Dee gets in with a group of cool, rich housewives. Dennis hits it off with some everyday blue-collar bros, and Frank struggles to renew his license; elsewhere, Charlie and Mac deal with a new generation of bicycle bullies.', 5);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('7d287dc5-c4b4-4260-b488-c94817311d93', 'cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 'The Gang Gets a New Member', 'A blast from the past motivates the guys to add another person to their membership. Dee reconsiders her future.', 8);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('a06d1907-e7da-4055-b454-5d4e98e417bd', '2c9f0007-13be-4c87-9392-5d3f21250d6f', 'Pop-Pop: The Final Solution', 'Dennis and Dee decide whether or not to pull the plug on their ailing grandfather. The gang learns of Pop-Pop''s history as a Nazi. Mac, Charlie and Frank set off in search of Pop-Pop''s spoils from the war.', 1);
INSERT INTO public.episodes (id, season_id, title, description, episode_number) VALUES ('f5f871c0-b344-4c44-9c9e-8d96b4f30369', '137fd89b-6569-45a9-96e6-a4568650c17d', 'The Gang Gets New Wheels', 'Dee gets in with a group of cool, rich housewives. Dennis hits it off with some everyday blue-collar bros, and Frank struggles to renew his license; elsewhere, Charlie and Mac deal with a new generation of bicycle bullies.', 5);


--
-- Data for Name: seasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.seasons (id, season_number, show_id) VALUES ('d04168ed-1282-4ed6-81ba-7e0c8ea6ac14', 1, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('a1523d2e-9cfb-4b43-a6ee-1bc7dd7cf407', 2, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('c5d52064-2785-4c23-ace1-0ec4a32571a0', 3, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('8a22d4d9-713b-41a0-90b7-5a038b9ae052', 4, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('b9a15a85-5d27-416d-94ca-a65e52695ce9', 5, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('cb66c1a4-401c-4faa-a086-38dea1d7d9ac', 6, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('8af0181e-7c75-4af9-a7d7-ae356fbf40bc', 7, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('2c9f0007-13be-4c87-9392-5d3f21250d6f', 8, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('1ad4d470-bdf4-4116-acc0-3e001c4a05bb', 9, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('f43df586-9649-48e4-a698-8f17fce50bf7', 10, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('be0c5d27-9435-4851-9117-02dbc1e33917', 11, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('8d9dc34b-2354-4424-80e4-07cdc6023fdb', 12, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('137fd89b-6569-45a9-96e6-a4568650c17d', 13, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('4f74a777-de16-4f68-9a52-dc66cb423e41', 14, '950e38a3-3242-44dc-8585-fd30ced6627e');
INSERT INTO public.seasons (id, season_number, show_id) VALUES ('9548d4c3-e487-4b06-ac55-10b44c2f0178', 15, '950e38a3-3242-44dc-8585-fd30ced6627e');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sessions (id, created_at, updated_at, season, episode, name) VALUES ('52f2f187-fe70-4ad3-922e-73341b3f5f37', '2022-09-28 08:08:01+00', '2022-09-28 08:08:01+00', 3, 5, 'Charlie');


--
-- Data for Name: shows; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.shows (id, show_name) VALUES ('950e38a3-3242-44dc-8585-fd30ced6627e', 'It''s Always Sunny in Philadelphia');
INSERT INTO public.shows (id, show_name) VALUES ('929b3b5b-8137-4da6-b6bb-49f3394f1c2f', 'Friends');


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- Name: episodes episodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT episodes_pkey PRIMARY KEY (id);


--
-- Name: seasons seasons_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_id_key PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shows shows_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shows
    ADD CONSTRAINT shows_pkey PRIMARY KEY (id);


--
-- Name: sessions set_public_sessions_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_sessions_updated_at BEFORE UPDATE ON public.sessions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_sessions_updated_at ON sessions; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_sessions_updated_at ON public.sessions IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: characters characters_shows; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_shows FOREIGN KEY (show_id) REFERENCES public.shows(id);


--
-- Name: episodes seasons_episodes; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episodes
    ADD CONSTRAINT seasons_episodes FOREIGN KEY (season_id) REFERENCES public.seasons(id);


--
-- Name: seasons seasons_shows; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_shows FOREIGN KEY (show_id) REFERENCES public.shows(id);


--
-- Name: DATABASE postgres; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE postgres FROM PUBLIC;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO postgres;


--
-- PostgreSQL database dump complete
--

