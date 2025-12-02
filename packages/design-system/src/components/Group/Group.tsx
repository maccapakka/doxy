import type { ElementType, ReactNode } from "react";
import styles from "./Group.module.css";

export type GroupProps = {
  as?: ElementType;
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  alignSelf?:
    | "auto"
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  justifySelf?: "auto" | "center" | "flex-start" | "flex-end" | "stretch";
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  gap?: number;
  padding?: number;
  paddingInline?: number;
  paddingBlock?: number;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  backgroundColor?: "primary" | "critical" | "neutral" | "white" | "black";
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  border?: string;
  borderRadius?: string | number;
  boxShadow?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const Group = ({
  as,
  children,
  alignItems,
  alignSelf,
  justifyContent,
  justifySelf,
  flexDirection,
  gap,
  padding,
  paddingInline,
  paddingBlock,
  position,
  top,
  bottom,
  left,
  right,
  backgroundColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  border,
  borderRadius,
  boxShadow,
  width,
  height,
  className,
  ...rest
}: GroupProps) => {
  const Component = as || "div";

  return (
    <Component
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={
        {
          "--_fai": alignItems,
          "--_fas": alignSelf,
          "--_fjc": justifyContent,
          "--_fjs": justifySelf,
          "--_fd": flexDirection,
          "--_fg": gap,
          "--_fp":
            paddingInline === undefined && paddingBlock === undefined
              ? padding
              : undefined,
          "--_fpi": paddingInline ?? padding,
          "--_fpb": paddingBlock ?? padding,
          "--_pos": position,
          "--_top": top,
          "--_bottom": bottom,
          "--_left": left,
          "--_right": right,
          "--_bg": backgroundColor
            ? `var(--dxy-color-${backgroundColor})`
            : undefined,
          "--_bgi": backgroundImage,
          "--_bgs": backgroundSize,
          "--_bgp": backgroundPosition,
          "--_border": border,
          "--_br": borderRadius,
          "--_shadow": boxShadow,
          "--_w": width,
          "--_h": height,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Component>
  );
};

// Predefined variants of Group component
export const Stack = (props: GroupProps) => (
  <Group flexDirection="column" {...props} />
);

export const Frame = Group;
export const Container = Group;
