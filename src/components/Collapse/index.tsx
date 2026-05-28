import React from "react";
import { Collapse as AntdCollapse, ConfigProvider } from "antd";
import { ChevronDown, ChevronUp } from "lucide-react";
import { designSystemColors, radius, spacing } from "../../theme";
import type { CollapseProps } from "../../types/components/Collapse";

// Tipografia body/01 (16px) exigida pelo dump `figma/components/collapse/`
// para header e body. O Antd não expõe `fontSize` no `ComponentToken` do
// Collapse — aplicamos via API `styles` semântica (header/body).
const FONT_SIZE_BODY = 16;
const ICON_SIZE = 16;

const collapseTokens = {
  borderRadiusLG: radius.xl,
  colorBorder: designSystemColors.neutral[300],
  headerBg: designSystemColors.neutral[50],
  contentBg: designSystemColors.neutral[50],
  // Cor do header alinhada ao token `text/dark` (#262626 = neutral[800]).
  colorTextHeading: designSystemColors.neutral[800],
  // Cor do corpo alinhada ao token `text/dark` (#262626 = neutral[800]).
  colorText: designSystemColors.neutral[800],
  // Padding 16 em todos os lados conforme o container do dump.
  headerPadding: `${spacing[4]}px ${spacing[4]}px`,
  contentPadding: `${spacing[4]}px`,
} as const;

/**
 * Renderiza o ícone de expansão (chevron) do Collapse no tamanho 16x16,
 * conforme o dump `figma/components/collapse/`. Usa `lucide-react`, único
 * provedor de ícones permitido na stack do design system.
 */
function renderExpandIcon({ isActive }: { isActive?: boolean }): React.ReactNode {
  if (isActive) {
    return <ChevronUp size={ICON_SIZE} />;
  }
  return <ChevronDown size={ICON_SIZE} />;
}

/**
 * Resolve o objeto de `styles` semânticos do AntdCollapse, garantindo que o
 * `fontSize` de header/body fique fixado em 16px. Quando o consumidor passa
 * `styles` como função, o retorno do design system mantém somente os
 * defaults do dump (o consumidor pode reativar via `header`/`body` no
 * próprio retorno da função, mas a tipografia 16px continua aplicada).
 */
function buildSemanticStyles(
  userStyles: CollapseProps["styles"],
): { header: React.CSSProperties; body: React.CSSProperties } & Record<string, React.CSSProperties> {
  const base = { fontSize: FONT_SIZE_BODY } as const;
  if (typeof userStyles === "object" && userStyles !== null) {
    const objectStyles = userStyles as { header?: React.CSSProperties; body?: React.CSSProperties };
    return {
      header: { ...base, ...(objectStyles.header ?? {}) },
      body: { ...base, ...(objectStyles.body ?? {}) },
    };
  }
  return {
    header: { ...base },
    body: { ...base },
  };
}

/**
 * Collapse do design system. Usa `expandIconPosition="end"` por padrão para
 * alinhar com o Figma. Aplica `fontSize: 16` no header e body via API
 * `styles` semântica para refletir a tipografia `body/01` do dump.
 */
export function Collapse(props: CollapseProps): React.ReactElement {
  const { bordered = true, ghost = false, size = "middle", styles: userStyles, ...rest } = props;
  const semanticStyles = buildSemanticStyles(userStyles);

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: { ...collapseTokens },
        },
      }}
    >
      <AntdCollapse
        bordered={bordered}
        ghost={ghost}
        size={size}
        expandIconPosition="end"
        expandIcon={renderExpandIcon}
        {...rest}
        styles={semanticStyles}
      />
    </ConfigProvider>
  );
}

Collapse.displayName = "Collapse";
// Mantém compatibilidade com a API anterior: `Collapse.Panel` continua disponível
// embora a API moderna do Antd prefira a prop `items`.
Collapse.Panel = AntdCollapse.Panel;

export type { CollapseProps } from "../../types/components/Collapse";
