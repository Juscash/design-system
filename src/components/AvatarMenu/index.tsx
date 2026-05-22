import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Avatar } from "../Avatar";
import { designSystemColors } from "../../theme";
import type { AvatarMenuProps } from "../../types/components/Avatar";

const FOCUS_RING_RADIUS = 999;
const CHEVRON_SIZE = 16;

/**
 * Menu de avatar (chevron + avatar). Aceita os estados `default`, `focus` e
 * `active`; em `active` exibe o `ChevronUp` em vez do `ChevronDown`.
 */
export const AvatarMenu: React.FC<AvatarMenuProps> = ({ state = "default", children, style, className }) => {
  const isFocus = state === "focus";
  const isActive = state === "active";

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        boxShadow: isFocus ? `0 0 0 3px ${designSystemColors.neutral[300]}` : undefined,
        borderRadius: FOCUS_RING_RADIUS,
        ...style,
      }}
    >
      <Avatar dsSize="small" roundness="round">
        {children ?? "CN"}
      </Avatar>
      {isActive ? (
        <ChevronUp size={CHEVRON_SIZE} color={designSystemColors.neutral[800]} />
      ) : (
        <ChevronDown size={CHEVRON_SIZE} color={designSystemColors.neutral[800]} />
      )}
    </div>
  );
};

AvatarMenu.displayName = "AvatarMenu";

export type { AvatarMenuProps, AvatarMenuState } from "../../types/components/Avatar";
