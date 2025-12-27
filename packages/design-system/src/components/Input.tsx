"use client";

import React from "react";
import { Input as AntdInput, ConfigProvider } from "antd";
import type { InputProps as AntdInputProps } from "antd";
import type { TextAreaProps as AntdTextAreaProps } from "antd/es/input";
import type { ComponentToken } from "antd/es/input/style/token";
import { designSystemColors, radius, spacing } from "../theme";
import { AliasToken } from "antd/es/theme/interface";
import { shadow } from "../theme";

const { TextArea: AntdTextArea } = AntdInput;

type InputSize = "xs" | "s" | "m" | "l";

type CleanAntdProps = {
  [K in keyof AntdInputProps as K extends "size"
    ? never
    : K]: AntdInputProps[K];
};

export type InputProps = CleanAntdProps & {
  dsSize?: InputSize;
  size?: AntdInputProps["size"];
};

function mapToDsSize(size?: AntdInputProps["size"]): InputSize {
  if (size === "small") return "xs";
  if (size === "middle") return "m";
  if (size === "large") return "l";
  return "m";
}

function getSizeTokens(dsSize?: InputSize): {
  componentToken: Partial<ComponentToken>;
  globalToken: Partial<AliasToken>;
  height: number;
} {
  if (dsSize === "xs") {
    const componentToken: Partial<ComponentToken> = {
      inputFontSize: 13,
      paddingBlock: spacing[2],
      paddingInline: spacing[3],
    };
    const globalToken: Partial<AliasToken> = {
      colorText: designSystemColors.neutral[800],
      borderRadius: radius.md,
      controlHeight: 24,
    };
    return {
      componentToken,
      globalToken,
      height: 24,
    };
  }
  if (dsSize === "s") {
    const componentToken: Partial<ComponentToken> = {
      inputFontSize: 16,
      paddingBlock: spacing[2],
      paddingInline: spacing[3],
    };
    const globalToken: Partial<AliasToken> = {
      borderRadius: radius.xl,
      controlHeight: 32,
    };
    return {
      componentToken,
      globalToken,
      height: 32,
    };
  }
  if (dsSize === "m") {
    const componentToken: Partial<ComponentToken> = {
      inputFontSize: 16,
      paddingBlock: spacing[2],
      paddingInline: spacing[3],
    };
    const globalToken: Partial<AliasToken> = {
      borderRadius: radius.xl,
      controlHeight: 36,
    };
    return {
      componentToken,
      globalToken,
      height: 36,
    };
  }
  if (dsSize === "l") {
    const componentToken: Partial<ComponentToken> = {
      inputFontSize: 16,
      paddingBlock: spacing[2],
      paddingInline: spacing[3],
    };
    const globalToken: Partial<AliasToken> = {
      borderRadius: radius.xl,
      controlHeight: 40,
    };
    return {
      componentToken,
      globalToken,
      height: 40,
    };
  }
  return {
    componentToken: {},
    globalToken: {},
    height: 36,
  };
}

const baseTokens: Partial<ComponentToken> = {
  activeBorderColor: "transparent",
  hoverBorderColor: "transparent",
  activeShadow: shadow.focus,
  errorActiveShadow: shadow.focusError,
  warningActiveShadow: `0 0 0 3px rgba(134, 116, 0, 0.1)`,
  activeBg: "white",
};

const InputComponent = (
  props: InputProps
): ReturnType<React.FC<InputProps>> => {
  const { dsSize = "m", size, style, status, className, ...rest } = props;

  const resolvedSize = size ? mapToDsSize(size) : dsSize;
  const sizeTokens = getSizeTokens(resolvedSize);
  const combinedClassName = `ds-input-outline ${className || ""}`.trim();
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            ...baseTokens,
            ...sizeTokens.componentToken,
          },
        },
        token: {
          ...sizeTokens.globalToken,
          colorBorder: "transparent",
          colorError: designSystemColors.feedback.red[500],
          colorTextDisabled: designSystemColors.neutral[400],
          colorBgContainerDisabled: designSystemColors.neutral[50],
          colorTextPlaceholder: designSystemColors.neutral[500],
        },
      }}
    >
      <AntdInput
        styles={{
          prefix: {
            marginRight: spacing[2],
          },
          suffix: {
            marginLeft: spacing[2],
          },
        }}
        className={combinedClassName}
        style={{
          height: `${sizeTokens.height}px`,
          ...style,
        }}
        {...rest}
        status={status}
      />
    </ConfigProvider>
  );
};

export type TextAreaProps = AntdTextAreaProps;

export function TextArea(
  props: TextAreaProps
): ReturnType<React.FC<TextAreaProps>> {
  const { className, ...rest } = props;
  const combinedClassName = `ds-input-outline ${className || ""}`.trim();
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: baseTokens,
        },
        token: {
          colorBorder: designSystemColors.neutral[300],
          colorError: designSystemColors.feedback.red[500],
          colorTextDisabled: designSystemColors.neutral[400],
          colorTextPlaceholder: designSystemColors.neutral[500],
          colorBgContainerDisabled: designSystemColors.neutral[50],
          colorTextPlaceholderDisabled: designSystemColors.neutral[400],
          borderRadius: radius.xl,
        },
      }}
    >
      <AntdTextArea className={combinedClassName} {...rest} />
    </ConfigProvider>
  );
}

type InputComponentWithTextArea = typeof InputComponent & {
  TextArea: typeof TextArea;
};

export const Input = InputComponent as InputComponentWithTextArea;
Input.TextArea = TextArea;
