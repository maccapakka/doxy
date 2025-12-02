import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Button } from "./Button";
import styles from "./Button.module.css";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders a button element by default", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("renders children correctly", () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("renders with icon", () => {
      const icon = <span data-testid="test-icon">Icon</span>;
      render(<Button icon={icon}>Button</Button>);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("renders as a different element when 'as' prop is provided", () => {
      render(<Button as="a">Link Button</Button>);
      const element = screen.getByText("Link Button");
      expect(element.tagName).toBe("A");
    });
  });

  describe("Styling", () => {
    it("applies the root CSS class", () => {
      const { container } = render(<Button>Button</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass(styles.root!);
    });

    it("applies critical color variant", () => {
      const { container } = render(<Button color="critical">Button</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass(styles.critical!);
    });

    it("applies active state class", () => {
      const { container } = render(<Button active>Button</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass(styles.active!);
    });

    it("applies hasTooltip class when tooltip is provided", () => {
      const { container } = render(<Button tooltip="Help text">Button</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass(styles.hasTooltip!);
    });
  });

  describe("Tooltip Accessibility", () => {
    it("renders tooltip when tooltip prop is provided", () => {
      render(<Button tooltip="Help text">Button</Button>);
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Help text");
    });

    it("does not render tooltip when tooltip prop is not provided", () => {
      render(<Button>Button</Button>);
      const tooltip = screen.queryByRole("tooltip");
      expect(tooltip).not.toBeInTheDocument();
    });

    it("connects tooltip to button via aria-describedby", () => {
      render(<Button tooltip="Help text">Button</Button>);
      const button = screen.getByRole("button");
      const tooltip = screen.getByRole("tooltip");

      const ariaDescribedBy = button.getAttribute("aria-describedby");
      const tooltipId = tooltip.getAttribute("id");

      expect(ariaDescribedBy).toBeTruthy();
      expect(tooltipId).toBeTruthy();
      expect(ariaDescribedBy).toBe(tooltipId);
    });

    it("generates unique tooltip IDs for multiple buttons", () => {
      const { container } = render(
        <>
          <Button tooltip="First tooltip">Button 1</Button>
          <Button tooltip="Second tooltip">Button 2</Button>
        </>,
      );

      const tooltips = container.querySelectorAll('[role="tooltip"]');
      expect(tooltips).toHaveLength(2);

      const id1 = tooltips[0]!.getAttribute("id");
      const id2 = tooltips[1]!.getAttribute("id");

      expect(id1).not.toBe(id2);
    });

    it("does not add aria-describedby when tooltip is not provided", () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole("button");
      expect(button.getAttribute("aria-describedby")).toBeNull();
    });
  });

  describe("Event Handlers", () => {
    it("calls onClick when clicked", () => {
      let clicked = false;
      const handleClick = () => {
        clicked = true;
      };

      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole("button");
      button.click();

      expect(clicked).toBe(true);
    });

    it("does not call onClick when not provided", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      // Should not throw error
      expect(() => button.click()).not.toThrow();
    });
  });

  describe("Custom Props", () => {
    it("spreads additional props to the component", () => {
      render(
        <Button data-testid="custom-button" aria-label="Custom label">
          Button
        </Button>,
      );
      const button = screen.getByTestId("custom-button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
    });

    it("allows custom props to override defaults", () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Polymorphic Component", () => {
    it("renders as a link with proper attributes", () => {
      render(
        <Button as="a" href="https://example.com">
          Link
        </Button>,
      );
      const link = screen.getByText("Link");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("does not add type attribute to non-button elements", () => {
      render(<Button as="a">Link</Button>);
      const link = screen.getByText("Link");
      expect(link.getAttribute("type")).toBeNull();
    });
  });

  describe("Combined Props", () => {
    it("renders with all props combined", () => {
      const icon = <span data-testid="icon">★</span>;
      const { container } = render(
        <Button
          icon={icon}
          color="critical"
          active
          tooltip="Delete item"
          onClick={() => {}}
        >
          Delete
        </Button>,
      );

      const button = container.querySelector("button");
      expect(button).toHaveClass(styles.root!);
      expect(button).toHaveClass(styles.critical!);
      expect(button).toHaveClass(styles.active!);
      expect(button).toHaveClass(styles.hasTooltip!);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
      expect(screen.getByRole("tooltip")).toHaveTextContent("Delete item");
    });
  });

  describe("Accessibility", () => {
    it("should have no accessibility violations - basic button", async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - button with icon", async () => {
      const icon = <span aria-hidden="true">★</span>;
      const { container } = render(<Button icon={icon}>Favorite</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - button with tooltip", async () => {
      const { container } = render(
        <Button tooltip="This is helpful information">Help</Button>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - icon-only button with tooltip", async () => {
      const icon = <span aria-hidden="true">×</span>;
      const { container } = render(
        <Button icon={icon} tooltip="Close" aria-label="Close" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - active button", async () => {
      const { container } = render(<Button active>Active</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - critical button", async () => {
      const { container } = render(<Button color="critical">Delete</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have no accessibility violations - polymorphic link", async () => {
      const { container } = render(
        <Button as="a" href="https://example.com">
          Link Button
        </Button>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
