import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Button } from "./Button";
import { MeetingCamera } from "../../icons/MeetingCamera";
import { MeetingCameraAnimated } from "../../icons/MeetingCameraAnimated";
import { Group } from "../Group";
import { Microphone } from "../../icons/Microphone";
import { Chat } from "../../icons/Chat";
import { PhoneOff } from "../../icons/PhoneOff";

/**
 * The Button component provides a consistent interactive element for user actions.
 * It supports multiple color variants, active states, icons, and tooltips, all mapped to the design system tokens.
 */
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible button component with design system styling. Use this component for all interactive actions to ensure consistent presentation with proper theming, accessibility, and state management support.",
      },
      subtitle: "Interactive button with icons, tooltips, and state management",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      description:
        "The element type to render as. Defaults to 'button' but can be customized for semantic HTML.",
      control: "text",
      table: {
        type: { summary: "ElementType" },
        defaultValue: { summary: "button" },
      },
    },
    children: {
      description: "Optional text or content to display inside the button.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    icon: {
      description:
        "Icon element to display in the button. Import from the icons directory.",
      control: false,
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    disabled: {
      description: "Whether the button is disabled and non-interactive.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    active: {
      description:
        "Whether the button is in an active/selected state. Useful for toggle buttons.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    color: {
      description:
        "Color variant for the button. Maps to design system color tokens.",
      control: "select",
      options: ["primary", "secondary", "critical"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    tooltip: {
      description:
        "Tooltip text to display on hover. Also sets the aria-label for accessibility.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    onClick: {
      description: "Click handler function called when the button is clicked.",
      control: false,
      table: {
        type: { summary: "() => void" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default button story demonstrates the basic usage with an icon.
 * This is the simplest way to use the Button component.
 */
export const Default: Story = {
  args: {
    icon: <MeetingCamera />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic button usage with an icon and default styling. The button uses the primary color variant by default.",
      },
    },
  },
};

const ToggleActiveButton = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Button
      icon={<MeetingCameraAnimated isOff={isActive} />}
      active={isActive}
      onClick={() => setIsActive(!isActive)}
    />
  );
};

/**
 * Demonstrates the active state toggle functionality.
 * Useful for buttons that represent on/off states like camera, microphone, etc.
 */
export const ToggleActive: Story = {
  render: () => <ToggleActiveButton />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing the **active** prop in action. Click the button to toggle between active and inactive states. The active state provides visual feedback to users about the current state.",
      },
    },
  },
};

/**
 * Demonstrates all available color variants for buttons.
 * Each color maps to a specific design system token and use case.
 */
export const Colors: Story = {
  render: () => (
    <Group>
      <Button icon={<Microphone />}></Button>
      <Button icon={<MeetingCamera />}></Button>
      <Button icon={<Chat />}></Button>
      <Button color="critical" icon={<PhoneOff />}></Button>
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Available color variants: **primary** (default, main actions), **secondary** (alternative actions), and **critical** (destructive actions like ending a call or deleting). Choose colors that communicate the action's importance and impact.",
      },
    },
  },
};

/**
 * Shows buttons with tooltips for enhanced accessibility and user guidance.
 * Tooltips appear on hover and also set the aria-label for screen readers.
 */
export const WithTooltips: Story = {
  render: () => (
    <Group>
      <Button icon={<Microphone />} tooltip="Mute microphone" />
      <Button icon={<MeetingCamera />} tooltip="Turn off camera" />
      <Button icon={<Chat />} tooltip="Open chat" />
      <Button color="critical" icon={<PhoneOff />} tooltip="End call" />
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons with **tooltip** text that appears on hover. Tooltips improve accessibility by providing context for icon-only buttons and automatically set the aria-label attribute.",
      },
    },
  },
};

/**
 * Demonstrates the disabled state for buttons.
 * Disabled buttons are non-interactive and visually distinct.
 */
export const Disabled: Story = {
  render: () => (
    <Group>
      <Button icon={<Microphone />} disabled />
      <Button icon={<MeetingCamera />} disabled />
      <Button icon={<Chat />} disabled />
      <Button color="critical" icon={<PhoneOff />} disabled />
    </Group>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons in the **disabled** state cannot be interacted with. Use this state when an action is temporarily unavailable or not applicable in the current context.",
      },
    },
  },
};
