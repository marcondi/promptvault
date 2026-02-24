# Plano de ação: erro ao criar categoria (definitivo)

## Problema
- **Erro:** `categories_type_check` — a tabela `categories` é do FinanceApp e só aceita `type` = `income` ou `expense`.
- Enviar `type: "prompt"` quebra o CHECK constraint.

## Solução aplicada (definitiva)
O PromptVault passou a usar uma **tabela própria**: `prompt_categories`, sem coluna `type` e sem depender da tabela do FinanceApp.

---

## O que você precisa fazer (uma vez)

### 1. Criar a tabela no Supabase
1. Abra o **Supabase** → projeto usado pelo PromptVault.
2. Menu **SQL Editor** → **New query**.
3. Abra o arquivo **supabase-prompt-categories.sql** (na raiz do projeto), copie todo o conteúdo e cole no editor.
4. Clique em **Run** (ou Ctrl+Enter).
5. Confirme que a mensagem indica sucesso.

### 2. Deploy do código
O código já foi alterado para usar `prompt_categories`. Basta dar **commit e push** (ou deixar a Vercel fazer o deploy automático após o push).

---

## Resumo das mudanças no código
- Todas as leituras/escritas de categorias usam **prompt_categories** em vez de **categories**.
- Removidos `type: "prompt"` e filtros por `type`; a nova tabela não tem coluna `type`.
- Tabela **categories** do FinanceApp** permanece intacta.

Depois de rodar o SQL e atualizar o deploy, criar categorias no PromptVault deve funcionar de forma definitiva.
