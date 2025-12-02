import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Group, Stack, Frame, Container } from "./Group";
import styles from "./Group.module.css";

describe("Group", () => {
  describe("Rendering", () => {
    it("renders children content", () => {
      render(<Group>Hello World</Group>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("renders as div by default", () => {
      const { container } = render(<Group>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Content");
    });

    it("renders without children", () => {
      const { container } = render(<Group />);
      const element = container.querySelector("div");
      expect(element).toBeInTheDocument();
      expect(element).toBeEmptyDOMElement();
    });

    it("renders multiple children", () => {
      render(
        <Group>
          <span>Child 1</span>
          <span>Child 2</span>
          <span>Child 3</span>
        </Group>,
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();
    });
  });

  describe("Custom element (as prop)", () => {
    it("renders as section", () => {
      const { container } = render(<Group as="section">Section</Group>);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent("Section");
    });

    it("renders as article", () => {
      const { container } = render(<Group as="article">Article</Group>);
      const article = container.querySelector("article");
      expect(article).toBeInTheDocument();
    });

    it("renders as nav", () => {
      const { container } = render(<Group as="nav">Navigation</Group>);
      const nav = container.querySelector("nav");
      expect(nav).toBeInTheDocument();
    });

    it("renders as header", () => {
      const { container } = render(<Group as="header">Header</Group>);
      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("renders as footer", () => {
      const { container } = render(<Group as="footer">Footer</Group>);
      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies the root CSS class", () => {
      const { container } = render(<Group>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveClass(styles.root!);
    });

    it("applies custom className", () => {
      const { container } = render(
        <Group className="custom-class">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveClass(styles.root!);
      expect(element).toHaveClass("custom-class");
    });

    it("filters out falsy className values", () => {
      const { container } = render(<Group className="">Content</Group>);
      const element = container.querySelector("div");
      expect(element?.className).toBe(styles.root!);
    });
  });

  describe("Flexbox alignment", () => {
    it("applies alignItems center", () => {
      const { container } = render(<Group alignItems="center">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fai": "center" });
    });

    it("applies alignItems flex-start", () => {
      const { container } = render(
        <Group alignItems="flex-start">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fai": "flex-start" });
    });

    it("applies alignItems flex-end", () => {
      const { container } = render(
        <Group alignItems="flex-end">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fai": "flex-end" });
    });

    it("applies alignItems stretch", () => {
      const { container } = render(<Group alignItems="stretch">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fai": "stretch" });
    });

    it("applies alignItems baseline", () => {
      const { container } = render(
        <Group alignItems="baseline">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fai": "baseline" });
    });

    it("applies alignSelf center", () => {
      const { container } = render(<Group alignSelf="center">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fas": "center" });
    });

    it("applies alignSelf auto", () => {
      const { container } = render(<Group alignSelf="auto">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fas": "auto" });
    });

    it("applies justifyContent center", () => {
      const { container } = render(
        <Group justifyContent="center">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fjc": "center" });
    });

    it("applies justifyContent space-between", () => {
      const { container } = render(
        <Group justifyContent="space-between">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fjc": "space-between" });
    });

    it("applies justifyContent space-around", () => {
      const { container } = render(
        <Group justifyContent="space-around">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fjc": "space-around" });
    });

    it("applies justifyContent space-evenly", () => {
      const { container } = render(
        <Group justifyContent="space-evenly">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fjc": "space-evenly" });
    });

    it("applies justifySelf center", () => {
      const { container } = render(<Group justifySelf="center">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fjs": "center" });
    });

    it("applies justifySelf auto", () => {
      const { container } = render(<Group justifySelf="auto">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fjs": "auto" });
    });
  });

  describe("Flex direction", () => {
    it("applies flexDirection row", () => {
      const { container } = render(<Group flexDirection="row">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fd": "row" });
    });

    it("applies flexDirection row-reverse", () => {
      const { container } = render(
        <Group flexDirection="row-reverse">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fd": "row-reverse" });
    });

    it("applies flexDirection column", () => {
      const { container } = render(
        <Group flexDirection="column">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fd": "column" });
    });

    it("applies flexDirection column-reverse", () => {
      const { container } = render(
        <Group flexDirection="column-reverse">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fd": "column-reverse" });
    });
  });

  describe("Spacing", () => {
    it("applies gap", () => {
      const { container } = render(<Group gap={8}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fg": "8" });
    });

    it("applies gap of 0", () => {
      const { container } = render(<Group gap={0}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fg": "0" });
    });

    it("applies padding", () => {
      const { container } = render(<Group padding={4}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({
        "--_fp": "4",
        "--_fpi": "4",
        "--_fpb": "4",
      });
    });

    it("applies paddingInline only", () => {
      const { container } = render(<Group paddingInline={6}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fpi": "6" });
      const style = element?.getAttribute("style") || "";
      expect(style).not.toContain("--_fp:");
    });

    it("applies paddingBlock only", () => {
      const { container } = render(<Group paddingBlock={6}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fpb": "6" });
      const style = element?.getAttribute("style") || "";
      expect(style).not.toContain("--_fp:");
    });

    it("applies paddingInline and paddingBlock together", () => {
      const { container } = render(
        <Group paddingInline={4} paddingBlock={8}>
          Content
        </Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fpi": "4", "--_fpb": "8" });
      const style = element?.getAttribute("style") || "";
      expect(style).not.toContain("--_fp:");
    });

    it("paddingInline overrides padding", () => {
      const { container } = render(
        <Group padding={4} paddingInline={8}>
          Content
        </Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fpi": "8", "--_fpb": "4" });
    });

    it("paddingBlock overrides padding", () => {
      const { container } = render(
        <Group padding={4} paddingBlock={8}>
          Content
        </Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fpi": "4", "--_fpb": "8" });
    });
  });

  describe("Position", () => {
    it("applies position relative", () => {
      const { container } = render(<Group position="relative">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_pos": "relative" });
    });

    it("applies position absolute", () => {
      const { container } = render(<Group position="absolute">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_pos": "absolute" });
    });

    it("applies position fixed", () => {
      const { container } = render(<Group position="fixed">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_pos": "fixed" });
    });

    it("applies position sticky", () => {
      const { container } = render(<Group position="sticky">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_pos": "sticky" });
    });

    it("applies top as string", () => {
      const { container } = render(<Group top="10px">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_top": "10px" });
    });

    it("applies top as number", () => {
      const { container } = render(<Group top={10}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_top": "10" });
    });

    it("applies bottom", () => {
      const { container } = render(<Group bottom="20px">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bottom": "20px" });
    });

    it("applies left", () => {
      const { container } = render(<Group left="30px">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_left": "30px" });
    });

    it("applies right", () => {
      const { container } = render(<Group right="40px">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_right": "40px" });
    });
  });

  describe("Background", () => {
    it("applies backgroundColor primary", () => {
      const { container } = render(
        <Group backgroundColor="primary">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bg": "var(--dxy-color-primary)" });
    });

    it("applies backgroundColor critical", () => {
      const { container } = render(
        <Group backgroundColor="critical">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bg": "var(--dxy-color-critical)" });
    });

    it("applies backgroundColor neutral", () => {
      const { container } = render(
        <Group backgroundColor="neutral">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bg": "var(--dxy-color-neutral)" });
    });

    it("applies backgroundColor white", () => {
      const { container } = render(
        <Group backgroundColor="white">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bg": "var(--dxy-color-white)" });
    });

    it("applies backgroundColor black", () => {
      const { container } = render(
        <Group backgroundColor="black">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bg": "var(--dxy-color-black)" });
    });

    it("applies backgroundImage", () => {
      const { container } = render(
        <Group backgroundImage="url(/image.jpg)">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bgi": "url(/image.jpg)" });
    });

    it("applies backgroundSize", () => {
      const { container } = render(
        <Group backgroundSize="cover">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bgs": "cover" });
    });

    it("applies backgroundPosition", () => {
      const { container } = render(
        <Group backgroundPosition="center">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_bgp": "center" });
    });
  });

  describe("Border and shadow", () => {
    it("applies border", () => {
      const { container } = render(
        <Group border="1px solid black">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_border": "1px solid black" });
    });

    it("applies borderRadius as string", () => {
      const { container } = render(<Group borderRadius="8px">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_br": "8px" });
    });

    it("applies borderRadius as number", () => {
      const { container } = render(<Group borderRadius={16}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_br": "16" });
    });

    it("applies boxShadow", () => {
      const { container } = render(
        <Group boxShadow="0 2px 4px rgba(0,0,0,0.1)">Content</Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_shadow": "0 2px 4px rgba(0,0,0,0.1)" });
    });
  });

  describe("Dimensions", () => {
    it("applies width as string", () => {
      const { container } = render(<Group width="100%">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_w": "100%" });
    });

    it("applies width as number", () => {
      const { container } = render(<Group width={500}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_w": "500" });
    });

    it("applies height as string", () => {
      const { container } = render(<Group height="200px">Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_h": "200px" });
    });

    it("applies height as number", () => {
      const { container } = render(<Group height={300}>Content</Group>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_h": "300" });
    });
  });

  describe("Combined props", () => {
    it("applies multiple flexbox props together", () => {
      const { container } = render(
        <Group
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          gap={4}
        >
          Content
        </Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({
        "--_fd": "column",
        "--_fai": "center",
        "--_fjc": "space-between",
        "--_fg": "4",
      });
    });

    it("applies all styling props together", () => {
      const { container } = render(
        <Group
          as="section"
          className="custom"
          flexDirection="row"
          gap={8}
          padding={4}
          backgroundColor="primary"
          borderRadius="12px"
          width="100%"
          height="400px"
        >
          Content
        </Group>,
      );
      const element = container.querySelector("section");
      expect(element).toHaveClass(styles.root!);
      expect(element).toHaveClass("custom");
      expect(element).toHaveStyle({
        "--_fd": "row",
        "--_fg": "8",
        "--_fp": "4",
        "--_bg": "var(--dxy-color-primary)",
        "--_br": "12px",
        "--_w": "100%",
        "--_h": "400px",
      });
    });
  });

  describe("Additional props spreading", () => {
    it("spreads additional HTML attributes", () => {
      render(
        <Group data-testid="custom-group" id="group-id">
          Content
        </Group>,
      );
      const element = screen.getByTestId("custom-group");
      expect(element).toHaveAttribute("id", "group-id");
    });

    it("spreads aria attributes", () => {
      const { container } = render(
        <Group aria-label="Accessible group" role="region">
          Content
        </Group>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveAttribute("aria-label", "Accessible group");
      expect(element).toHaveAttribute("role", "region");
    });

    it("spreads event handlers", () => {
      const handleClick = vi.fn();
      render(<Group onClick={handleClick}>Clickable</Group>);
      const element = screen.getByText("Clickable");
      element.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Stack variant", () => {
    it("renders Stack with flexDirection column", () => {
      const { container } = render(<Stack>Stack Content</Stack>);
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fd": "column" });
      expect(screen.getByText("Stack Content")).toBeInTheDocument();
    });

    it("allows overriding Stack props", () => {
      const { container } = render(
        <Stack gap={8} alignItems="center">
          Stack Content
        </Stack>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({
        "--_fd": "column",
        "--_fg": "8",
        "--_fai": "center",
      });
    });

    it("Stack can override flexDirection", () => {
      const { container } = render(
        <Stack flexDirection="row">Stack Content</Stack>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fd": "row" });
    });
  });

  describe("Frame variant", () => {
    it("renders Frame as Group", () => {
      render(<Frame>Frame Content</Frame>);
      expect(screen.getByText("Frame Content")).toBeInTheDocument();
    });

    it("Frame accepts all Group props", () => {
      const { container } = render(
        <Frame flexDirection="column" gap={4}>
          Frame Content
        </Frame>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_fd": "column", "--_fg": "4" });
    });
  });

  describe("Container variant", () => {
    it("renders Container as Group", () => {
      render(<Container>Container Content</Container>);
      expect(screen.getByText("Container Content")).toBeInTheDocument();
    });

    it("Container accepts all Group props", () => {
      const { container } = render(
        <Container width="100%" padding={8}>
          Container Content
        </Container>,
      );
      const element = container.querySelector("div");
      expect(element).toHaveStyle({ "--_w": "100%", "--_fp": "8" });
    });
  });
});
