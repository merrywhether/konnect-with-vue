# Konnect with Vue

An exercise in learning Vue.js by building a toy app and component library.

## Usage

It is recommended that you use [mise](https://mise.jdx.dev) but other runtime managers are supported.

### Setup/Install

```sh
mise trust
mise install
corepack enable
pnpm install
```

### Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

### Analysis/Testing

Typecheck and lint:

```sh
pnpm typecheck
pnpm lint:fix
pnpm stylelint:fix
```

Test (unit, component, e2e):

```sh
pnpm test
pnpm test:ct
pnpm test:e2e
```
