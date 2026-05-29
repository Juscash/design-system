import React from "react";
import { Input as AntdInput, ConfigProvider } from "antd";
import { designSystemColors, radius } from "../../theme";
import type { TextAreaProps } from "../../types/components/TextArea";

const { TextArea: AntdTextArea } = AntdInput;

/**
 * TextArea do design system. Aplica os mesmos tokens base do `Input` mas
 * sem a customização de altura — o consumidor controla via `autoSize`/`rows`.
 */
export function TextArea(props: TextAreaProps): React.ReactElement {
  const { className, ...rest } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            // Mantém os tokens em sincronia com `<Input>` para que ambos
            // tenham mesmo comportamento de hover/focus.
            activeBorderColor: designSystemColors.neutral[300],
            hoverBorderColor: designSystemColors.neutral[300],
          },
        },
        token: {
          colorBorder: designSystemColors.neutral[300],
          colorError: designSystemColors.feedback.red[500],
          colorTextDisabled: designSystemColors.neutral[400],
          colorTextPlaceholder: designSystemColors.neutral[500],
          colorBgContainerDisabled: designSystemColors.neutral[50],
          colorBgContainer: designSystemColors.neutral[50],
          colorText: designSystemColors.neutral[800],
          borderRadius: radius.xl,
        },
      }}
    >
      <AntdTextArea className={className} {...rest} />
    </ConfigProvider>
  );
}

TextArea.displayName = "TextArea";

export type { TextAreaProps } from "../../types/components/TextArea";
