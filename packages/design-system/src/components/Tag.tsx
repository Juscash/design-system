"use client";

import React from "react";
import { ConfigProvider, Tag as AntdTag } from "antd";
import type { TagProps as AntdTagProps } from "antd";
import { designSystemColors, radius, spacing } from "../theme";
import type { ComponentToken } from "antd/es/tag/style";

export type TagProps = AntdTagProps & {
  error?: boolean;
  success?: boolean;
  warning?: boolean;
};

const baseTokens: Partial<ComponentToken> = {
  paddingInlineSM: spacing[2],
  paddingBlockSM: 2,
  paddingInline: spacing[3],
  paddingBlock: 4,
  fontSizeSM: 12,
  fontSize: 13,
  lineHeightSM: 1.4,
  lineHeight: 1.4,
  colorBorder: designSystemColors.neutral[300],
  colorText: designSystemColors.neutral[800],
  colorBg: designSystemColors.neutral[100],
  // Filled default (if used)
  colorFill: designSystemColors.neutral[100],
  // Closable icon inherits text color
  closeSize: 12,
} as any;

const statusTokens: Record<
  "error" | "success" | "warning",
  Record<string, any>
> = {
  error: {
    colorBg: designSystemColors.feedback.red[50],
    colorBorder: designSystemColors.feedback.red[500],
    colorText: designSystemColors.feedback.red[900],
    colorFill: designSystemColors.feedback.red[50],
  },
  success: {
    colorBg: designSystemColors.feedback.green[50],
    colorBorder: designSystemColors.feedback.green[500],
    colorText: designSystemColors.feedback.green[900],
    colorFill: designSystemColors.feedback.green[50],
  },
  warning: {
    colorBg: designSystemColors.feedback.yellow[50],
    colorBorder: designSystemColors.feedback.yellow[500],
    colorText: designSystemColors.feedback.yellow[900],
    colorFill: designSystemColors.feedback.yellow[50],
  },
};

export function Tag(props: TagProps): React.ReactElement {
  const { error, success, warning, ...rest } = props;

  let statusToken: Partial<ComponentToken> | undefined;
  if (error) statusToken = statusTokens.error;
  else if (success) statusToken = statusTokens.success;
  else if (warning) statusToken = statusTokens.warning;

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            ...baseTokens,
            ...(statusToken ?? {}),
          },
        },
        token: {
          borderRadius: radius.xl,
        },
      }}
    >
      <AntdTag {...rest} />
    </ConfigProvider>
  );
}
