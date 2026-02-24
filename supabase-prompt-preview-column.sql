-- Coluna para foto de preview no prompt (ex.: resultado do prompt de edição)
-- Execute no Supabase: SQL Editor → New query → cole e rode.

ALTER TABLE public.prompts
  ADD COLUMN IF NOT EXISTS preview_image_url text;

COMMENT ON COLUMN public.prompts.preview_image_url IS 'URL da imagem de exemplo/preview do resultado do prompt';
