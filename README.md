# ddd-layers-examples

Exemplos em **Nuxt 4** + **pnpm** que acompanham o artigo sobre [Nuxt Layers por domínio](https://github.com/DarlanPrado/ddd-layers-examples) (fronteiras, ESLint, OpenAPI e composição no app shell).

Dois apps no mesmo monorepo comparam **onde mora o código compartilhado**:

| App | Compartilhado | Porta | Quando usar |
|-----|----------------|-------|-------------|
| [`example_1`](./example_1) | `app/shared/` na raiz do projeto | **3000** | Reuso no nível do app; menos layers; lint com padrão `ROOT_SHELL` |
| [`example_2`](./example_2) | layer [`layers/base`](./example_2/layers/base) | **3001** | Typecheck/teste por domínio; `extends` com `base` por último |

Em ambos:

- Domínios **`catalog`** e **`checkout`** com `public.ts`, composables/componentes prefixados e `internal/` fora do scan.
- Página de composição [`app/pages/products/[id].vue`](./example_2/app/pages/products/[id].vue) junta `<CatalogProductDetail>` e `<CheckoutMiniCart>` sem import cruzado entre domínios.
- Allowlist documentada: **checkout** pode importar só `#layers/catalog/app/public`.
- API mock em memória (`GET /api/products/:id`, carrinho) via rotas Nitro — sem backend real.
- Tipos OpenAPI mínimos em `schema.d.ts` (ver `openapi/openapi.yaml` em cada app).

## Conceitos (resumo)

1. **Layers** compõem o app; não criam fronteira sozinhos.
2. **ESLint** (`no-restricted-imports`, `no-restricted-syntax`, `vue/no-restricted-syntax`) bloqueia acoplamento entre domínios.
3. **Client tipado** (`openapi-fetch` + `useApi`) na base ou em `app/shared`.
4. **App shell** é o único lugar que compõe domínios na mesma tela.

Leia `example_2/layers/base/BOUNDARIES.md` ou `example_1/app/shared/BOUNDARIES.md` para allowlist e regras.

## Pré-requisitos

- Node 20+
- [pnpm](https://pnpm.io/) 9+

## Instalação

```bash
pnpm install
```

## Desenvolvimento

```bash
# example_1 — porta 3000
pnpm dev:example_1

# example_2 — porta 3001
pnpm dev:example_2
```

Abra `/products/1` para ver produto + mini carrinho.

## Build

```bash
pnpm build
# ou por app:
pnpm build:example_1
pnpm build:example_2
```

## Lint (fronteiras)

```bash
pnpm lint
```

## StackBlitz (em breve)

Links interativos para `example_1` e `example_2` serão adicionados aqui.

## Repositório

Código-fonte: [DarlanPrado/ddd-layers-examples](https://github.com/DarlanPrado/ddd-layers-examples)
