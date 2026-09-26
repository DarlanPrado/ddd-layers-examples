# Fronteiras entre domínios (example_2)

## Direção das dependências

1. **App shell** (`app/`) — compõe páginas; usa API pública dos domínios (componentes e composables prefixados).
2. **Domínios** (`layers/catalog`, `layers/checkout`, …) — dependem só da `base` (e exceções na allowlist).
3. **Base** (`layers/base`) — UI kit, client HTTP, tipos OpenAPI, eventos; não importa domínios.

## Allowlist entre domínios

- **checkout → catalog**: somente `#layers/catalog/app/public` e composables `useCatalog*`.
  - Motivo: o carrinho exibe resumo do produto nas linhas. Revisar na próxima revisão de arquitetura.

## Regras

- Toda entrada nova na allowlist exige PR atualizando este arquivo e `ALLOWLIST` em `eslint.config.mjs`.
- Allowlist **nunca** libera `internal/`.
- Lógica privada fica em `app/internal/` (não escaneado pelo Nuxt).
