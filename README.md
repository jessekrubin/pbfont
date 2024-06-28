# `@jsse/pbfont`

[![NPM Version](https://img.shields.io/npm/v/%40jsse%pbfont?style=flat-square&logo=npm&color=blue&cacheSeconds=60)](https://www.npmjs.com/package/%40jsse/pbfont)

Composite map(box/libre) font glyph pbfs into a single pbf.

replaces: https://github.com/mapbox/glyph-pbf-composite

## Install

```bash
npm install @jsse/pbfont # the old standby
pnpm add @jsse/pbfont    # aka not-performant-pnpm
yarn add @jsse/pbfont    # yarn
bun add @jsse/pbfont     # gen z
```

## What?

- Replaces `@mapbox/glyph-pbf-composite` -- SAME API
- Dual cjs/esm
- Uses `bufbuild` not `pbf`
- Typescript

___

## Dev

- pnpm is the package manager
- repo uses `just` (ref) as well as (p)npm scripts
  - just-repo: https://github.com/casey/just
  - just-docs: https://just.systems/man/en/
- prettier formatting uses the default config b/c configuring formaters is dumb
- tooling:
  - tsup: bundle/build/type-check src
  - vitest: test + coverage
  - prettier: formatting - uses default config
  - eslint: linter
  - justfile: task-runner
  - cicd / gh-actions / dependabot

___

## License

MIT
