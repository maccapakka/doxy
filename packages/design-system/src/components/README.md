# Component Story Guidelines

This document outlines the conventions for writing Storybook stories in the design system.

## File Naming Convention

Stories should be placed alongside their component files with the following naming pattern:

```
ComponentName.stories.tsx
```

**Example:**
```
src/components/Button/
├── Button.tsx
├── Button.module.css
├── Button.stories.tsx  ← Story file
└── index.ts
```

## Story Structure

Each story file should follow this structure:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ComponentName } from "./ComponentName";

const meta = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered", // or "fullscreen", "padded"
  },
  tags: ["autodocs"],
  argTypes: {
    // Define prop controls and documentation
  },
  args: {
    // Default args for all stories
    onClick: fn(), // For tracking interactions
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Individual story variants
export const Default: Story = {
  args: {
    // Story-specific args
  },
};
```

## Story Naming Conventions

### Story Names
- Use PascalCase for story exports
- Use descriptive names that indicate the variant being shown
- Common story names:
  - `Default` - The basic, default state
  - `Disabled` - Disabled state
  - `Loading` - Loading state
  - `WithLongText` - Edge case with long content
  - `Interactive` - Interactive behavior demonstration

### Meta Title
Use the format: `"Category/ComponentName"`

**Examples:**
- `"Components/Button"`
- `"Forms/Input"`
- `"Layout/Card"`

## Required Metadata

### Meta Object
```tsx
const meta = {
  title: "Components/ComponentName",      // Required: Story hierarchy
  component: ComponentName,                // Required: Component reference
  parameters: {
    layout: "centered",                    // Optional: Layout mode
  },
  tags: ["autodocs"],                      // Optional: Enable auto-docs
  argTypes: { /* ... */ },                 // Optional: Prop controls
  args: { /* ... */ },                     // Optional: Default args
} satisfies Meta<typeof ComponentName>;
```

### Story Object
```tsx
export const StoryName: Story = {
  args: {
    // Props to pass to the component
  },
  parameters: {
    // Story-specific parameters (optional)
  },
  play: async ({ canvasElement }) => {
    // Interaction tests (optional)
  },
};
```

## ArgTypes Documentation Standards

Document each prop with:

```tsx
argTypes: {
  propName: {
    control: "text" | "boolean" | "select" | "number" | "color" | ...,
    description: "Clear description of what this prop does",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "default" },
    },
    options: ["option1", "option2"], // For select/radio controls
  },
}
```

### Common Control Types
- `text` - Text input
- `boolean` - Checkbox
- `select` - Dropdown
- `radio` - Radio buttons
- `number` - Number input
- `range` - Slider
- `color` - Color picker
- `date` - Date picker
- `object` - JSON editor

## Best Practices

### 1. Cover Key Variants
Create stories for:
- Default state
- All boolean prop combinations (enabled/disabled, loading, etc.)
- Edge cases (empty, long text, etc.)
- Interactive states

### 2. Use Meaningful Args
```tsx
// Good
args: {
  children: "Click me",
  variant: "primary",
}

// Avoid
args: {
  children: "Test",
  variant: "test",
}
```

### 3. Add Descriptions
```tsx
argTypes: {
  variant: {
    control: "select",
    description: "The visual style variant of the button",
    options: ["primary", "secondary", "danger"],
  },
}
```

### 4. Use Interaction Testing
For interactive components, use play functions:

```tsx
import { userEvent, within } from "@storybook/test";

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
  },
};
```

### 5. Group Related Stories
Use subgroups in the title:

```tsx
title: "Components/Button/Variants"
title: "Components/Button/Sizes"
```

## Example: Complete Story File

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content to display inside the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    onClick: {
      description: "Function to call when the button is clicked",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const WithLongText: Story = {
  args: {
    children: "This is a button with a very long text that might wrap",
  },
};

export const Interactive: Story = {
  args: {
    children: "Click Me",
  },
};
```

## Running Storybook

### Development Server
```bash
# From root
pnpm storybook

# From design-system package
pnpm --filter @doxy/design-system storybook
```

### Build Static Version
```bash
pnpm --filter @doxy/design-system build-storybook
```

### Test Stories
```bash
pnpm --filter @doxy/design-system storybook:test
```

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
- [ArgTypes](https://storybook.js.org/docs/api/arg-types)
- [Interaction Testing](https://storybook.js.org/docs/writing-tests/interaction-testing)
