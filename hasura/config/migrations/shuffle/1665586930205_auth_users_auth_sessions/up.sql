CREATE TABLE public.auth_users
(
    id       uuid default gen_random_uuid() not null,
    email    text                           not null,
    password text                           not null
);

ALTER TABLE ONLY public.auth_users
    ADD CONSTRAINT auth_users_pkey PRIMARY KEY (id);
    CREATE UNIQUE INDEX auth_users_email_key on auth_users (email);


CREATE TABLE public.auth_sessions
(
    id        uuid default gen_random_uuid() not null,
    token     text                           not null,
    user_id   uuid                           not null,
    enc_token text                           not null,
    time      timestamptz                    not null
);

ALTER TABLE ONLY public.auth_sessions
    ADD CONSTRAINT auth_sessions_pk PRIMARY KEY (id);
    CREATE UNIQUE INDEX enc_token on auth_sessions (enc_token);

ALTER TABLE ONLY public.auth_sessions
    ADD CONSTRAINT fk_auth_user FOREIGN KEY (user_id) REFERENCES public.auth_users(id);