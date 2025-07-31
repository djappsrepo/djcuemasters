-- Enable realtime for music_requests table
ALTER TABLE public.music_requests REPLICA IDENTITY FULL;

-- Add the table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.music_requests;