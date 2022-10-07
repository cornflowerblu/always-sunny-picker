ALTER TABLE public.sessions ADD updated_at timestamp with time zone DEFAULT now() NOT NULL;
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
CREATE TRIGGER set_public_sessions_updated_at BEFORE UPDATE ON public.sessions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_sessions_updated_at ON public.sessions IS 'trigger to set value of column "updated_at" to current timestamp on row update';