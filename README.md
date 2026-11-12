# Valoree

Loja virtual em React + Vite, com interface responsiva em português.

## Rodar localmente

1. Instale Node.js 20 ou superior.
2. Execute `npm install`.
3. Copie `.env.example` para `.env.local` e preencha as variáveis públicas do Supabase quando a integração for ativada.
4. Execute `npm run dev`.

## Build

`npm run build`

## Próximas etapas

- Configurar tabelas e políticas RLS no Supabase.
- Criar funções de backend para pedidos e integração Pix SigiloPay.
- Validar webhook e confirmação de pagamento no servidor.
- Substituir produtos demonstrativos por catálogo real.

**Segurança:** nunca coloque chaves secretas, service role ou credenciais SigiloPay no frontend ou no GitHub.
