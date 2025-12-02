import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import { Group } from "../Group/Group";

/**
 * The Text component provides a consistent way to display text throughout the application.
 * It supports multiple typographic variants and color options, all mapped to the design system tokens.
 */
const meta = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible text component that provides typographic hierarchy and theming. Use this component to ensure consistent text presentation with proper sizing, line height, and font weight.",
      },
      subtitle: "Display text with consistent typography and theming",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      description:
        "The HTML element to render. Defaults to 'span' but can be any valid HTML element.",
      control: "text",
      table: {
        type: { summary: "ElementType" },
        defaultValue: { summary: "span" },
      },
    },
    variant: {
      description:
        "Typographic variant that controls font size, line height, and font weight. Maps to design system typography tokens.",
      control: "select",
      options: [
        "title-1",
        "title-2",
        "title-3",
        "title-4",
        "title-5",
        "title-6",
        "featured-1",
        "featured-2",
        "featured-3",
        "body-1",
        "body-2",
        "body-3",
        "caption-1",
        "caption-2",
      ],
      table: {
        type: { summary: "TextVariant" },
        defaultValue: { summary: "undefined" },
      },
    },
    color: {
      description:
        "Color variant for the text. Maps to design system color tokens.",
      control: "select",
      options: ["primary", "critical", "neutral", "white", "black"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      description: "The text content to display.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default text story demonstrates the basic usage with plain text.
 * This is the simplest way to use the Text component.
 */
export const Default: Story = {
  args: {
    children: "Text",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic text usage with default styling. The text inherits the current font properties unless a specific variant or color is provided.",
      },
    },
  },
};

/**
 * Demonstrates all available color variants for text.
 * Each color maps to a specific design system token.
 */
export const Colors: Story = {
  render: () => (
    <Group flexDirection="column" gap={16}>
      <Text color="primary">The quick brown fox jumps over the lazy dog</Text>
      <Text color="critical">The quick brown fox jumps over the lazy dog</Text>
      <Text color="neutral">The quick brown fox jumps over the lazy dog</Text>
      <Text color="white">The quick brown fox jumps over the lazy dog</Text>
      <Text color="black">The quick brown fox jumps over the lazy dog</Text>
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
 * Shows all available typographic variants for text.
 * Variants control font size, line height, and font weight based on the design system typography scale.
 */
export const Variants: Story = {
  render: () => (
    <Group flexDirection="column" gap={16}>
      <Text variant="title-1">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="title-2">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="title-3">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="title-4">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="title-5">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="title-6">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="featured-1">
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text variant="featured-2">
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text variant="featured-3">
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text variant="body-1">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="body-2">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="body-3">The quick brown fox jumps over the lazy dog</Text>
      <Text variant="caption-1">
        The quick brown fox jumps over the lazy dog
      </Text>
      <Text variant="caption-2">
        The quick brown fox jumps over the lazy dog
      </Text>
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Available typographic variants organized by hierarchy: **Titles** (title-1 through title-6) for headings and page titles, **Featured** (featured-1 through featured-3) for emphasized content, **Body** (body-1 through body-3) for main content, and **Captions** (caption-1 and caption-2) for supplementary text.",
      },
    },
  },
};
