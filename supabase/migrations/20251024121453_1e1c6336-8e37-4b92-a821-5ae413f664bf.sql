-- Assurer que toutes les relations ont ON DELETE CASCADE pour supprimer définitivement les utilisateurs

-- Modifier la table quotes pour ajouter ON DELETE CASCADE
ALTER TABLE public.quotes 
DROP CONSTRAINT IF EXISTS quotes_user_id_fkey,
ADD CONSTRAINT quotes_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Modifier la table user_roles pour ajouter ON DELETE CASCADE (si pas déjà présent)
ALTER TABLE public.user_roles
DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey,
ADD CONSTRAINT user_roles_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- Modifier la table profiles pour ajouter ON DELETE CASCADE (si pas déjà présent)
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey,
ADD CONSTRAINT profiles_id_fkey
  FOREIGN KEY (id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;