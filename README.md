This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Para começar

Primeiro, rode o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu browser para ver o resultado.

## Stripe CLI

O Stripe CLI permite que faça testes do fluxo de compra que deram certo ou não.

- Na página de Dashboard do Stripe, procure por WebHook e em seguinda "Configurar um ouvinte local"

- Com o Stripe CLI devidamente baixado e rodando conforme as instruções da documentação, no terminal use o comando:

```stripe login
```
- Aprove a solicitação no browser com o link gerado no terminal.

- Em seguida, use o comando abaixo com o caminho da api criada no projeto:

```stripe listen --forward-to localhost:3000/api/stripe/webhook```

- Faça seus testes e veja a mágica acontecer.


