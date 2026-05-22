import React from "react";
import { Input as AntdInput, ConfigProvider } from "antd";
import type { AliasToken } from "antd/es/theme/interface";
import type { ComponentToken } from "antd/es/input/style/token";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { TextArea } from "../TextArea";
import type { InputComponent, InputProps, InputSize } from "../../types/components/Input";

const HEIGHT_XS = 24;
const HEIGHT_S = 32;
const HEIGHT_M = 36;
const HEIGHT_L = 40;
const INPUT_FONT_SIZE = 13;

interface SizeTokensResult {
  componentToken: Partial<ComponentToken>;
  globalToken: Partial<AliasToken>;
  height: number;
}

function getSizeTokens(size?: InputSize): SizeTokensResult {
  const commonComponentToken: Partial<ComponentToken> = {
    inputFontSize: INPUT_FONT_SIZE,
    paddingBlock: spacing[2],
    paddingInline: spacing[3],
  };

  if (size === "xs") {
    return {
      componentToken: commonComponentToken,
      globalToken: { colorText: designSystemColors.neutral[800], borderRadius: radius.md, controlHeight: HEIGHT_XS },
      height: HEIGHT_XS,
    };
  }
  if (size === "s") {
    return {
      componentToken: commonComponentToken,
      globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_S },
      height: HEIGHT_S,
    };
  }
  if (size === "l") {
    return {
      componentToken: commonComponentToken,
      globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_L },
      height: HEIGHT_L,
    };
  }
  return {
    componentToken: commonComponentToken,
    globalToken: { borderRadius: radius.xl, controlHeight: HEIGHT_M },
    height: HEIGHT_M,
  };
}

const baseTokens: Partial<ComponentToken> = {
  // Figma: hover e focus mantêm borda neutral[300] (sem mudar cor)
  activeBorderColor: designSystemColors.neutral[300],
  hoverBorderColor: designSystemColors.neutral[300],
  activeShadow: shadow.focus,
  errorActiveShadow: shadow.focusError,
  warningActiveShadow: "0 0 0 3px rgba(134, 116, 0, 0.1)",
  // Figma: background neutral[50] em todos os estados.
  activeBg: designSystemColors.neutral[50],
};

/**
 * Input do design system. Aceita `size` proprietário (`xs|s|m|l`) que mapeia
 * para alturas fixas em px. Re-expõe `TextArea` como `Input.TextArea`.
 */
function InputInner(props: InputProps): React.ReactElement {
  const { size = "m", style, status, className, ...rest } = props;
  const sizeTokens = getSizeTokens(size);

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
          colorBorder: designSystemColors.neutral[300],
          colorError: designSystemColors.feedback.red[500],
          colorTextDisabled: designSystemColors.neutral[400],
          colorBgContainerDisabled: designSystemColors.neutral[50],
          colorBgContainer: designSystemColors.neutral[50],
          colorTextPlaceholder: designSystemColors.neutral[500],
          colorText: designSystemColors.neutral[800],
        },
      }}
    >
      <AntdInput
        styles={{
          prefix: { marginRight: spacing[2] },
          suffix: { marginLeft: spacing[2] },
        }}
        className={className}
        style={{
          height: `${sizeTokens.height}px`,
          ...style,
        }}
        {...rest}
        status={status}
      />
    </ConfigProvider>
  );
}

InputInner.displayName = "Input";

const InputWithTextArea = InputInner as InputComponent;
InputWithTextArea.TextArea = TextArea;

export const Input = InputWithTextArea;
export { TextArea };

export type { InputProps, InputSize } from "../../types/components/Input";
export type { TextAreaProps } from "../../types/components/TextArea";
