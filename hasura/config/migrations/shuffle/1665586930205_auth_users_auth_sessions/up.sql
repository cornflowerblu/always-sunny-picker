create table auth_users
(
    id       uuid default gen_random_uuid() not null PRIMARY KEY,
    email    text                           not null,
    password text                           not null
);

create unique index auth_users_pkey
    on auth_users (id);

create unique index auth_users_email_key
    on auth_users (email);


create table auth_sessions
(
    id        uuid default gen_random_uuid() not null PRIMARY KEY,
    token     text                           not null,
    user_id   uuid                           not null,
    enc_token text                           not null,
    time      timestamptz                    not null
);

create unique index enc_token
    on auth_sessions (enc_token);