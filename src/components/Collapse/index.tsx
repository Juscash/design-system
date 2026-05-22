import React from "react";
import { Collapse as AntdCollapse, ConfigProvider } from "antd";
import { designSystemColors, radius, spacing } from "../../theme";
import type { CollapseProps } from "../../types/components/Collapse";

const collapseTokens = {
  borderRadiusLG: radius.xl,
  colorBorder: designSystemColors.neutral[300],
  headerBg: designSystemColors.neutral[50],
  contentBg: designSystemColors.neutral[50],
  colorTextHeading: designSystemColors.neutral[900],
  // Cor do conteúdo: neutral[600].
  colorText: designSystemColors.neutral[600],
  headerPadding: `${spacing[3]}px ${spacing[4]}px`,
  contentPadding: `${spacing[4]}px`,
} as const;

/**
 * Collapse do design system. Usa `expandIconPosition="end"` por padrão para
 * alinhar com o Figma.
 */
export function Collapse(props: CollapseProps): React.ReactElement {
  const { bordered = true, ghost = false, size = "middle", ...rest } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: { ...collapseTokens },
        },
      }}
    >
      <AntdCollapse bordered={bordered} ghost={ghost} size={size} expandIconPosition="end" {...rest} />
    </ConfigProvider>
  );
}

Collapse.displayName = "Collapse";
// Mantém compatibilidade com a API anterior: `Collapse.Panel` continua disponível
// embora a API moderna do Antd prefira a prop `items`.
Collapse.Panel = AntdCollapse.Panel;

export type { CollapseProps } from "../../types/components/Collapse";
