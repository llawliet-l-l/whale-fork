# @arthur2079/whale3

Whale design system. Components from [Radix Themes](https://www.radix-ui.com/themes)
plus custom Whale components, exported from a single entry point.

Works with React 18 and 19, in Vite and Next.js (Pages or App Router).

## Install

```bash
yarn add @arthur2079/whale3
```

`react` and `react-dom` are peer dependencies. `@radix-ui/themes` is a regular
dependency, so you do not need to install it yourself.

## Usage

Import the stylesheet once at the root of your app, then wrap it in
`WhaleProvider`:

```tsx
import { WhaleProvider, Button } from '@arthur2079/whale3';
import '@arthur2079/whale3/styles.css';

export default function App() {
  return (
    <WhaleProvider>
      <Button variant="solid" size="2">
        Click me
      </Button>
    </WhaleProvider>
  );
}
```

### Next.js App Router

Import the stylesheet in `app/layout.tsx`. `WhaleProvider` and every component
already carry the `'use client'` directive, so they can be used directly from a
server component without wrapping them yourself.

```tsx
import { WhaleProvider } from '@arthur2079/whale3';
import '@arthur2079/whale3/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WhaleProvider>{children}</WhaleProvider>
      </body>
    </html>
  );
}
```

## Theming

`WhaleProvider` pins the brand decisions — accent, panel background and
surface — and exposes only `appearance`, because dark mode is application
state and everything else is the design system's call, not the app's.

```tsx
<WhaleProvider appearance={isDarkMode ? 'dark' : 'light'}>
  {children}
</WhaleProvider>
```

Omit `appearance` and Radix's `inherit` applies, following the closest ancestor
theme or `prefers-color-scheme`.

The accent is registered as Radix's `cyan`, but `WhaleProvider.styles.css`
replaces that scale with Rango's blue, so `cyan` is only the slot the brand
color occupies. Those overrides ship inside `@arthur2079/whale3/styles.css`.

## Components

| Component       | Source                     | Needs `WhaleProvider` |
| --------------- | -------------------------- | --------------------- |
| `Button`        | Radix Themes (re-exported) | yes                   |
| `WhaleProvider` | Whale                      | —                     |

Source layout mirrors this split: `src/base` is the layer built on Radix
Themes, which is what requires `WhaleProvider`. The folder is named for its
role rather than its implementation, and it is internal — there is no
`./base` export. Whale's own custom components live outside it and depend on
neither Radix nor the provider.

Each component is a folder named after it — `Button/Button.tsx` beside
`Button.types.ts` and `Button.stories.tsx` — and `mod.ts` is the barrel at
every level, including the package entry `src/mod.ts`.

## Notes

`@arthur2079/whale3/styles.css` contains the Radix Themes stylesheet inlined at build
time followed by Whale's own styles, so one import is all you need. Radix ships
a fully flattened stylesheet, and inlining it avoids asking your bundler to
resolve a bare specifier from inside CSS — Parcel treats such a specifier as a
relative path and fails outright. If you also import `@radix-ui/themes/styles.css`
directly somewhere, drop it to avoid shipping those rules twice.

`@radix-ui/themes` is pinned to an exact version rather than a range, because
inlining bakes a copy of its stylesheet into this package at build time.

The build also emits `dist/styles.css.d.ts`, an empty module declaration.
TypeScript refuses an import it has no declaration for, so without it
`import '@arthur2079/whale3/styles.css'` fails to compile. It is wired up twice
because the two resolution modes disagree: the `types` condition in `exports`
covers `node16` and `bundler`, while `typesVersions` covers `node`/`node10`,
which ignores `exports` altogether.
