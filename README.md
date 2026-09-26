# ddd-layers-examples

Exemplos de arquitetura em camadas (DDD) — repositório em construção.

## Projetos Nuxt 4

Dois apps base independentes (template `minimal`, **pnpm**):

| Pasta | Dev server |
|-------|------------|
| `example_1/` | http://localhost:3000 |
| `example_2/` | http://localhost:3001 |

### Pré-requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/installation) (`corepack enable` recomendado)

### Rodar

```bash
cd example_1
pnpm install
pnpm dev
```

```bash
cd example_2
pnpm install
pnpm dev
```

Se o `pnpm install` reclamar de build scripts ignorados, execute uma vez: `pnpm approve-builds esbuild` (ou use `onlyBuiltDependencies` já configurado no `package.json`).

### Build

```bash
pnpm build
```

(em cada pasta de exemplo)
