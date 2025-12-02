import type { ElementType, ReactNode } from "react";
import styles from "./Text.module.css";

export type TextVariant =
  | "title-1"
  | "title-2"
  | "title-3"
  | "title-4"
  | "title-5"
  | "title-6"
  | "featured-1"
  | "featured-2"
  | "featured-3"
  | "body-1"
  | "body-2"
  | "body-3"
  | "caption-1"
  | "caption-2";

export type TextProps = {
  as?: ElementType;
  variant?: TextVariant;
  color?: "primary" | "critical" | "neutral" | "white" | "black";
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const Text = ({ as, variant, color, children, ...rest }: TextProps) => {
  const Component = as || "span";

  return (
    <Component
      className={styles.root}
      style={
        {
          "--_fs": variant ? `var(--dxy-font-size-${variant})` : undefined,
          "--_lh": variant ? `var(--dxy-line-height-${variant})` : undefined,
          "--_fw": variant ? `var(--dxy-font-weight-${variant})` : undefined,
          "--_fc": color ? `var(--dxy-color-${color})` : undefined,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Component>
  );
};
