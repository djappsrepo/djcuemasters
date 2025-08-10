-- Dar permisos de lectura (SELECT) en la vista dj_rankings a los roles anon y authenticated.
GRANT SELECT ON TABLE public.dj_rankings TO anon, authenticated;
