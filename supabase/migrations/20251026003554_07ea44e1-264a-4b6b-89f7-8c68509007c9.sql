-- Table pour la gestion des bugs
CREATE TABLE IF NOT EXISTS public.bugs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'medium',
  reported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.bugs ENABLE ROW LEVEL SECURITY;

-- Policies pour les bugs
CREATE POLICY "Developers can view all bugs"
ON public.bugs FOR SELECT
USING (has_role(auth.uid(), 'developer'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Developers can create bugs"
ON public.bugs FOR INSERT
WITH CHECK (has_role(auth.uid(), 'developer'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Developers can update bugs"
ON public.bugs FOR UPDATE
USING (has_role(auth.uid(), 'developer'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Developers can delete bugs"
ON public.bugs FOR DELETE
USING (has_role(auth.uid(), 'developer'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Users can report bugs
CREATE POLICY "Users can create their own bug reports"
ON public.bugs FOR INSERT
WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can view their own bug reports"
ON public.bugs FOR SELECT
USING (auth.uid() = reported_by);

-- Table pour les erreurs système
CREATE TABLE IF NOT EXISTS public.system_errors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  url TEXT,
  status TEXT NOT NULL DEFAULT 'unresolved',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.system_errors ENABLE ROW LEVEL SECURITY;

-- Policies pour les erreurs système
CREATE POLICY "Developers can view all errors"
ON public.system_errors FOR SELECT
USING (has_role(auth.uid(), 'developer'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Developers can update errors"
ON public.system_errors FOR UPDATE
USING (has_role(auth.uid(), 'developer'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Developers can delete errors"
ON public.system_errors FOR DELETE
USING (has_role(auth.uid(), 'developer'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Trigger pour updated_at
CREATE TRIGGER update_bugs_updated_at
  BEFORE UPDATE ON public.bugs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();