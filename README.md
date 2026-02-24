# PromptVault 🗄️

## Como rodar

### Pré-requisito
- [Node.js](https://nodejs.org) instalado (versão 16+)

### Passos

```bash
# 1. Entre na pasta do projeto
cd promptvault

# 2. Instale as dependências (só na primeira vez)
npm install

# 3. Rode o projeto
npm run dev
```

Depois abra no navegador: **http://localhost:5173**

### Login
Entre com sua conta Google (OAuth via Supabase).

### Supabase: tabela de categorias (obrigatório uma vez)
O app usa a tabela **prompt_categories** (separada da agenda financeira). No Supabase:

1. Vá em **SQL Editor** → **New query**.
2. Cole e execute o conteúdo do arquivo **supabase-prompt-categories.sql** (na raiz do projeto).
3. Pronto: criar categorias no app passa a funcionar.

### Supabase: foto de preview do prompt (opcional)
Para poder enviar uma imagem de exemplo em cada prompt:

1. **SQL Editor:** execute o arquivo **supabase-prompt-preview-column.sql** (adiciona a coluna `preview_image_url` na tabela `prompts`).
2. **Storage:** em **Storage** → **New bucket** → nome **prompt-previews**, marque **Public bucket** → Create. Assim as fotos ficam acessíveis por URL.

---

## Deploy (GitHub + Vercel)

1. **Crie um repositório no GitHub** (github.com → New repository, ex.: `promptvault`).
2. **Conecte e envie o código:**
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/promptvault.git
   git branch -M main
   git push -u origin main
   ```
3. **Vercel:** [vercel.com](https://vercel.com) → Import Git Repository → selecione o repo → Deploy.
4. **Supabase:** Após o deploy, adicione a URL da Vercel em **Authentication → URL Configuration → Redirect URLs** (ex.: `https://promptvault-xxx.vercel.app` e `https://promptvault-xxx.vercel.app/`).
