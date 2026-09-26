import withNuxt from './.nuxt/eslint.config.mjs'

const DOMAINS = ['catalog', 'checkout']

const ALLOWLIST = {
  checkout: ['catalog'],
}

const ROOT_SHELL = {
  regex: '^[~@]/(?!shared(/|$))|^(~~|@@)/(?!app/shared(/|$))',
  message: 'Domínio só importa da raiz o que está em ~/shared.',
}

const pascal = (s) => s[0].toUpperCase() + s.slice(1)

const forbidAll = (from, other) => ({
  regex: `^#layers/${other}(/|$)|(^|/)${other}/app(/|$)`,
  message: `'${from}' não importa '${other}'. Componha na página do app shell ou mova para o compartilhado com justificativa.`,
})

const onlyPublic = (from, other) => ({
  regex: `^#layers/${other}(?!/app/public$)(/|$)|(^|/)${other}/app/(?!public$)`,
  message: `'${from}' só pode importar '#layers/${other}/app/public' (allowlist).`,
})

const forbidComposable = (from, other) => ({
  selector: `Identifier[name=/^use${pascal(other)}[A-Z]/]`,
  message: `'${from}' não pode usar composables de '${other}'.`,
})

const forbidComponent = (from, other) => ({
  selector: `VElement[rawName=/^(${pascal(other)}[A-Z]|${other}-)/]`,
  message: `'${from}' não pode usar componentes de '${other}'.`,
})

function rulesFor(from, targets, allow = [], extraImportPatterns = []) {
  const blocked = targets.filter((other) => !allow.includes(other))
  return {
    'no-restricted-imports': ['error', {
      patterns: [
        ...targets.map((o) => (allow.includes(o) ? onlyPublic(from, o) : forbidAll(from, o))),
        ...extraImportPatterns,
      ],
    }],
    'no-restricted-syntax': ['error', ...blocked.map((o) => forbidComposable(from, o))],
    'vue/no-restricted-syntax': ['error', ...blocked.map((o) => forbidComponent(from, o))],
  }
}

export default withNuxt(
  ...DOMAINS.map((domain) => ({
    files: [`layers/${domain}/**/*.{ts,vue}`],
    rules: rulesFor(
      domain,
      DOMAINS.filter((d) => d !== domain),
      ALLOWLIST[domain] ?? [],
      [ROOT_SHELL],
    ),
  })),

  {
    files: ['app/**/*.{ts,vue}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          regex: '^#layers/[^/]+/app/internal(/|$)|(^|/)layers/[^/]+/app/internal(/|$)',
          message: 'O app shell consome a API pública dos domínios, não os internals.',
        }],
      }],
    },
  },
)
