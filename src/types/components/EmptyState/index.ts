import type { ReactNode, CSSProperties } from "react";
import type { ButtonProps } from "../Button";

export type EmptyStateProps = {
  title: ReactNode;
  description?: ReactNode;
  actionLabel?: ReactNode;
  actionButtonProps?: Omit<ButtonProps, "children" | "size" | "type">;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};
