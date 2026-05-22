import React from "react";
import { Popover as AntdPopover, ConfigProvider } from "antd";
import type { ComponentToken } from "antd/es/popover/style";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import { Heading6, Body2 } from "../Typography";
import type { PopoverProps } from "../../types/components/Popover";

type PopoverComponentToken = Partial<ComponentToken> & Record<string, unknown>;

function getPopoverTokens(): PopoverComponentToken {
  return {
    colorBgElevated: designSystemColors.neutral[50],
    // Borda neutral[300] mantém consistência com os demais componentes.
    colorBorder: designSystemColors.neutral[300],
    borderRadiusLG: radius.xl,
    paddingLG: spacing[4],
    arrowBg: designSystemColors.neutral[50],
    boxShadowSecondary: shadow.m,
  };
}

/**
 * Popover do design system. Aceita slots opcionais `header`, `footer` e
 * `icon`; quando algum deles é fornecido, o conteúdo é composto via
 * `Heading6` (header) + `Body2` (content/footer) para garantir tipografia.
 */
export function Popover(props: PopoverProps): React.ReactElement {
  const { header, footer, icon, content, title, ...rest } = props;

  const composedContent = React.useMemo(() => {
    if (header || footer) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3] }}>
          {header && (
            <div style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
              {icon && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
              )}
              <div style={{ flex: 1 }}>
                <Heading6 color="dark">{header}</Heading6>
              </div>
            </div>
          )}
          {content && (
            <div>
              <Body2 color="neutral">{content as React.ReactNode}</Body2>
            </div>
          )}
          {footer && (
            <div>
              <Body2 color="neutral">{footer}</Body2>
            </div>
          )}
        </div>
      );
    }

    return <Body2 color="neutral">{content as React.ReactNode}</Body2>;
  }, [header, footer, icon, content]);

  const finalTitle = header ? undefined : title;
  const finalContent = header || footer ? composedContent : content;

  return (
    <ConfigProvider
      theme={{
        components: {
          Popover: getPopoverTokens(),
        },
      }}
    >
      <AntdPopover {...rest} title={finalTitle} content={finalContent} />
    </ConfigProvider>
  );
}

Popover.displayName = "Popover";

export type { PopoverProps } from "../../types/components/Popover";
