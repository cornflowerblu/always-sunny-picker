ALTER TABLE public.sessions DROP updated_at;
DROP FUNCTION public.set_current_timestamp_updated_at() CASCADE;