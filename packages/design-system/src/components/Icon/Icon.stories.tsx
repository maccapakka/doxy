import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { ChatIcon } from "../../icons/ChatIcon";
import { Group } from "../Group/Group";

/**
 * The Icon component provides a consistent way to display SVG icons throughout the application.
 * It supports multiple color variants and sizes, all mapped to the design system tokens.
 */
const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible icon component that wraps SVG elements with design system styling. Use this component to ensure consistent icon presentation with proper sizing and theming support.",
      },
      subtitle: "Display SVG icons with consistent styling and theming",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    svg: {
      description:
        "The SVG icon component to render. Import from the icons directory.",
      control: false,
      table: {
        type: { summary: "React.ReactElement<SVGElement>" },
      },
    },
    color: {
      description:
        "Color variant for the icon. Maps to design system color tokens.",
      control: "select",
      options: ["primary", "critical", "neutral", "white", "black"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    size: {
      description:
        "Size of the icon in spacing units. Controls both width and height.",
      control: { type: "number", min: 1, max: 24, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      description: "Additional CSS classes for custom styling.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default icon story demonstrates the basic usage with a single icon.
 * This is the simplest way to use the Icon component.
 */
export const Default: Story = {
  args: {
    svg: ChatIcon,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic icon usage with default styling. The icon inherits the current text color unless a specific color variant is provided.",
      },
    },
  },
};

/**
 * Demonstrates all available color variants for icons.
 * Each color maps to a specific design system token.
 */
export const Colors: Story = {
  render: () => (
    <Group gap={4}>
      <Icon svg={ChatIcon} color="primary" />
      <Icon svg={ChatIcon} color="critical" />
      <Icon svg={ChatIcon} color="neutral" />
      <Icon svg={ChatIcon} color="white" />
      <Icon svg={ChatIcon} color="black" />
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Available color variants: **primary** (brand color), **critical** (error/warning states), **neutral** (subdued elements), **white** (light backgrounds), and **black** (dark backgrounds).",
      },
    },
  },
};

/**
 * Shows the available size options for icons.
 * Sizes are based on the design system spacing scale.
 */
export const Sizes: Story = {
  render: () => (
    <Group gap={4} alignItems="center">
      <Icon svg={ChatIcon} size={4} />
      <Icon svg={ChatIcon} size={6} />
      <Icon svg={ChatIcon} size={8} />
      <Icon svg={ChatIcon} size={10} />
      <Icon svg={ChatIcon} size={12} />
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon sizes from smallest (4) to largest (12). Choose sizes that maintain visual hierarchy and readability in your interface. Common sizes: **4** (small inline), **6** (default), **8** (medium), **10** (large), **12** (extra large).",
      },
    },
  },
};
