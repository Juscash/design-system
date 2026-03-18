import React from "react";
import { Popover as AntdPopover, ConfigProvider } from "antd";
import type { PopoverProps as AntdPopoverProps } from "antd";
import { designSystemColors, radius, shadow } from "../../theme";
import { Heading6, Body2 } from "../../components/Typography/Typography";

export type PopoverProps = AntdPopoverProps & {
  /**
   * Conteúdo do cabeçalho (slot superior)
   */
  header?: React.ReactNode;
  /**
   * Conteúdo do rodapé (slot inferior)
   */
  footer?: React.ReactNode;
  /**
   * Ícone customizado no header
   */
  icon?: React.ReactNode;
};

function getPopoverTokens(): Record<string, any> {
  return {
    colorBgElevated: designSystemColors.neutral[50],
    // Figma: borda neutral[300] (igual aos outros componentes)
    colorBorder: designSystemColors.neutral[300],

    borderRadiusLG: radius.xl,

    paddingLG: 16,

    arrowBg: designSystemColors.neutral[50],

    boxShadowSecondary: shadow.m,
  };
}

export function Popover(props: PopoverProps): React.ReactElement {
  const { header, footer, icon, content, title, ...rest } = props;

  const composedContent = React.useMemo(() => {
    if (header || footer) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {header && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {icon && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </div>
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
