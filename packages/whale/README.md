# @rango/whale

Whale design system. Components from [Radix Themes](https://www.radix-ui.com/themes)
plus custom Whale components, exported from a single entry point.

Works with React 18 and 19, in Vite and Next.js (Pages or App Router).

## Install

```bash
yarn add @rango/whale
```

`react` and `react-dom` are peer dependencies. `@radix-ui/themes` is a regular
dependency, so you do not need to install it yourself.

## Usage

Import the stylesheet once at the root of your app, then wrap it in
`WhaleProvider`:

```tsx
import { WhaleProvider, Button } from '@rango/whale';
import '@rango/whale/styles.css';

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
import { WhaleProvider } from '@rango/whale';
import '@rango/whale/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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

`WhaleProvider` accepts every [Radix `Theme`](https://www.radix-ui.com/themes/docs/components/theme)
prop and forwards it untouched, so Radix's own defaults apply — including
`grayColor="auto"`, which picks a gray tuned to the current accent.

```tsx
<WhaleProvider accentColor="jade" appearance="dark" radius="large">
  {children}
</WhaleProvider>
```

Whale intentionally does not override these yet. It is the right place for
brand-level defaults once there are values worth setting; restating Radix's
own defaults here would only shadow them.

## Components

| Component       | Source                     | Needs `WhaleProvider` |
| --------------- | -------------------------- | --------------------- |
| `Button`        | Radix Themes (re-exported) | yes                   |
| `WhaleProvider` | Whale                      | —                     |

Source layout mirrors this split: everything under `src/radix` is built on
Radix Themes and requires `WhaleProvider`. Whale's own custom components live
outside that folder and depend on neither Radix nor the provider.

## Notes

`@rango/whale/styles.css` contains the Radix Themes stylesheet inlined at build
time followed by Whale's own styles. Radix ships a fully flattened stylesheet,
so inlining avoids making your bundler resolve a bare specifier from inside CSS
— which behaves inconsistently across Vite, Next.js and webpack. If you also
import `@radix-ui/themes/styles.css` directly somewhere, drop it to avoid
shipping those rules twice.
