# Fronteiras entre domínios (example_1)

## Compartilhado na raiz

Código transversal em `app/shared/` (e componentes UI em `app/components/ui`). Domínios só importam da raiz via `~/shared/...` — o ESLint bloqueia `~/pages`, layouts e o resto do shell (`ROOT_SHELL`).

## Allowlist entre domínios

- **checkout → catalog**: somente `#layers/catalog/app/public` e composables `useCatalog*`.

## Regras

- Mesmas regras de allowlist e `internal/` que em `example_2/layers/base/BOUNDARIES.md`.
