# Whale Design System

A Yarn 4 + Turborepo monorepo holding the Whale design system and its Storybook
playground.

## Layout

| Workspace        | Package                        |         | Purpose                                                                                  |
| ---------------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------- |
| `packages/whale` | `@arthur2079/whale2`           | public  | The design system: components re-exported from Radix Themes, plus Whale's own components |
| `apps/storybook` | `@arthur2079/whale2-storybook` | private | Storybook 10 app that holds whale's stories and doubles as the published playground      |

`@arthur2079/whale2` supports React 18 and 19, in both Next.js (including the App
Router) and Vite. Consumers import the components and the stylesheet:

```tsx
import { WhaleProvider, Button } from '@arthur2079/whale2';
import '@arthur2079/whale2/styles.css';
```

Stories live in `apps/storybook`, not beside the components, so they import
`@arthur2079/whale2` exactly as an external consumer would — which exercises the
published `exports` map rather than reaching into `src`.

### ESM-only, by design

`@arthur2079/whale2` ships **ESM only**. There is deliberately no CommonJS build, which
matches every other Rango library. `main`, `module`, `types` and the `exports`
map cover `node16`/`nodenext` ESM, `node10` classic resolution and bundler
resolution. A CommonJS project on `moduleResolution: node16` will hit `TS1479` —
that is a known and accepted limitation, not a bug to fix.

## Commands

Run these from the repository root:

| Command          | What it does                                       |
| ---------------- | -------------------------------------------------- |
| `yarn dev`       | Builds whale, then starts Storybook on port 6006   |
| `yarn build`     | Builds every workspace in dependency order         |
| `yarn lint`      | ESLint across all workspaces                       |
| `yarn typecheck` | `tsc` across all workspaces, plus the root project |
| `yarn format`    | Prettier over the whole repo                       |

### The root commands are the only supported entry points

Running `yarn lint` or `yarn typecheck` **inside a workspace directory** fails
with `command not found: eslint` / `tsc`. That is expected, not a broken setup:
`eslint` and `typescript` are declared at the root, and Yarn Berry only puts a
workspace's _own_ declared binaries on the PATH for its scripts. Turborepo runs
each task with the root binaries available, which is why the root commands work.

It can _appear_ to work in terminals that add `node_modules/.bin` to the PATH
themselves — VS Code's JavaScript Debug Terminal does this. That is an artifact
of the terminal, not a supported way to run the tasks.

## Branches and releases

`next` is the working branch, `main` is production.

| Event                  | Result                                                 |
| ---------------------- | ------------------------------------------------------ |
| Pull request           | Storybook preview deploy                               |
| Push to `next`         | Prerelease publish to npm + Storybook deploy on `next` |
| Push to `main`         | **Nothing.** Production is never reached by pushing    |
| Dispatch `release.yml` | Full production release                                |

A production release is always the `release.yml` workflow, which operates on
`main` no matter which branch it is dispatched from:

```
sync main ← next  →  publish main  →  deploy production  →  sync next ← main
```

The publish step does not run inline. It dispatches `publish.yml` on `main`
through the workflow-dispatch API and waits for that run, because npm trusted
publishing authorises the workflow that _starts_ a run and binds it to a
workflow filename — a reusable `uses:` call would present `release.yml` and fail
authentication. The deploy has no such constraint, so `release.yml` calls
`deploy.yml` directly rather than duplicating its steps.

### Workflow documentation

| Workflow                              | Purpose                                                              |
| ------------------------------------- | -------------------------------------------------------------------- |
| [Checks](./docs/checks-workflow.md)   | Format, lint, typecheck and build on every PR and push               |
| [Publish](./docs/publish-workflow.md) | Publishes `@arthur2079/whale2` to npm — the only publish entry point |
| [Deploy](./docs/deploy-workflow.md)   | Deploys the Storybook app to Vercel                                  |
| [Release](./docs/release-workflow.md) | Production release: sync, publish, deploy, sync back                 |

## Tooling notes

- **Yarn 4** with the `node-modules` linker, and **Turborepo** for task running
  and caching.
- **Conventional commits** are enforced by commitlint through a husky
  `commit-msg` hook, so a non-conforming message is rejected at commit time.
- **Linting** uses `eslint-config-rango`. It pins parts of the toolchain: ESLint
  stays on 9.x and TypeScript on 6.0.x because of its peer ranges, so `YN0060`
  peer warnings on install are expected.
- **Internal dependencies** use plain semver ranges — `apps/storybook` depends on
  `@arthur2079/whale2` as `^0.1.0`, not `workspace:*`. Yarn resolves a matching range
  to the local workspace, and unlike `workspace:*` it participates in the
  `yarn version` cascade, which rewrites the dependent's manifest and persists
  `yarn.lock` on every publish.
