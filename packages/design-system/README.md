# @doxy/design-system

Design system package for Doxy, containing reusable UI components, design tokens, and documentation.

## Features

- 🎨 **Design Tokens** - Core design tokens for colors, typography, spacing, etc.
- 🧩 **React Components** - Reusable UI components built with React 19
- 📖 **Storybook Documentation** - Interactive component documentation and playground
- 🎯 **TypeScript** - Full TypeScript support
- 💅 **CSS Modules** - Scoped styling with CSS modules

## Components

- **Button** - Interactive button component with disabled state support

## Development

### Running Storybook

Start the Storybook development server to view and interact with components:

```bash
# From the root of the monorepo
pnpm storybook

# Or from this package
pnpm storybook
```

Storybook will be available at `http://localhost:6006`

### Building Storybook

Build a static version of Storybook for deployment:

```bash
pnpm build-storybook
```

The static build will be output to `storybook-static/`

### Type Checking

```bash
pnpm check-types
```

### Linting

```bash
pnpm lint
```

## Usage

Import components from the design system in other packages:

```tsx
import { Button } from "@doxy/design-system/button";

function App() {
  return (
    <Button onClick={() => console.log("clicked")}>
      Click me
    </Button>
  );
}
```

## Writing Stories

See the [Component Story Guidelines](./src/components/README.md) for detailed documentation on writing Storybook stories.

## Project Structure

```
packages/design-system/
├── .storybook/          # Storybook configuration
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── components/      # React components
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.module.css
│   │       ├── Button.stories.tsx
│   │       └── index.ts
│   └── tokens/          # Design tokens
│       └── core.module.css
├── package.json
└── tsconfig.json
```

## Scripts

- `pnpm storybook` - Start Storybook development server
- `pnpm build-storybook` - Build static Storybook
- `pnpm storybook:test` - Run Storybook interaction tests
- `pnpm lint` - Lint code
- `pnpm check-types` - Type check with TypeScript
- `pnpm generate:component` - Generate a new component (via Turbo)
