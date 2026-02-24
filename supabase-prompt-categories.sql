-- Tabela dedicada ao PromptVault (evita conflito com categories do FinanceApp)
-- Execute no Supabase: SQL Editor → New query → cole e rode.

CREATE TABLE IF NOT EXISTS public.prompt_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_prompt_categories_user_id ON public.prompt_categories(user_id);

-- RLS: usuário só acessa suas categorias
ALTER TABLE public.prompt_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can CRUD own prompt_categories" ON public.prompt_categories;
CREATE POLICY "Users can CRUD own prompt_categories" ON public.prompt_categories
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Comentário
COMMENT ON TABLE public.prompt_categories IS 'Categorias do app PromptVault (separado do FinanceApp)';
