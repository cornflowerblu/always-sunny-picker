--
-- Data for Name: auth_users; Type: TABLE DATA; Schema: public
--

INSERT INTO public.auth_users (id, email, password) VALUES ('5f42b5b3-dc8f-4531-93f9-cb4f1a815b3d', 'roger@gmail.com', '$2b$10$rCh.LRU4MqVim6yb6LfD8.9Pr5OcAd6iYJpMgnFoPXmeq0X/NWc.K');
INSERT INTO public.auth_users (id, email, password) VALUES ('1038cf8a-d725-4ac7-a1ae-c754fdce1c7a', 'tests@tests.com', '$2b$10$XDsITS5CrjyHYavdPaTXee8MaHhe32CbKcgGSsACYck9azu0ElztK');

--
-- Data for Name: auth_sessions; Type: TABLE DATA; Schema: public
--

INSERT INTO public.auth_sessions (id, token, user_id, enc_token, time) VALUES ('b627397a-3287-400f-8396-00d723ec1df5', 'LjazyaCSNX0XeZxhR0ESuDopcKaiUatc', '5f42b5b3-dc8f-4531-93f9-cb4f1a815b3d', '$2b$10$Yp6sI7U4ngXAsDN1mEVd8ubc6kaZ11r2fc2DCI9jl8GG27i7g8HmS', '2022-10-12 17:16:22.338000 +00:00');
