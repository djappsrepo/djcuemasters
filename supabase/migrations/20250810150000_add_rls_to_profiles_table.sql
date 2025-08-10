-- 1. Habilitar Row Level Security (RLS) en la tabla de perfiles.
-- Esto es un prerrequisito para crear cualquier política de seguridad.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Crear una política para permitir a los usuarios leer su propio perfil.
-- La condición `auth.uid() = id` asegura que un usuario solo pueda ver la fila donde su ID de autenticación coincide con el ID del perfil.
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- 3. Crear una política para permitir a los usuarios actualizar su propio perfil.
-- Esto será útil para futuras funcionalidades.
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);
