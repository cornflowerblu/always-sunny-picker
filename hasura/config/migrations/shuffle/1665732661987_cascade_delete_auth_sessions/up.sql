ALTER TABLE auth_sessions
    DROP CONSTRAINT fk_auth_user;

ALTER TABLE auth_sessions
    ADD CONSTRAINT fk_auth_user
        FOREIGN KEY (user_id) REFERENCES auth_users
            ON DELETE CASCADE;