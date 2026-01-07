# @whale/base

Lightweight, type-safe React components built on Whale foundation tokens. Styled with vanilla-extract.

## Install

```bash
yarn add @whale/base
```

Peer deps: `react`, `react-dom`.

## Usage

Ensure Whale foundation CSS variables are loaded (primitive + semantic). Then:

```tsx
import { Button } from '@whale/base';

export default function Page() {
  return <Button intent="primary" variant="filled">Click me</Button>;
}
```


