"use client";

import React from "react";
import { Popover as AntdPopover, ConfigProvider } from "antd";
import type { PopoverProps as AntdPopoverProps } from "antd";
import { designSystemColors, radius, shadow } from "../../theme";

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
    colorBorder: designSystemColors.neutral[200],

    borderRadiusLG: radius.xl,

    paddingLG: 16,

    arrowBg: designSystemColors.neutral[50],

    boxShadowSecondary: shadow.l,
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
                paddingBottom: footer || content ? 12 : 0,
                borderBottom:
                  footer || content
                    ? `1px solid ${designSystemColors.neutral[200]}`
                    : "none",
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
              <div style={{ flex: 1 }}>{header}</div>
            </div>
          )}
          {content && <div>{content as React.ReactNode}</div>}
          {footer && (
            <div
              style={{
                paddingTop: 12,
                borderTop: `1px solid ${designSystemColors.neutral[200]}`,
              }}
            >
              {footer}
            </div>
          )}
        </div>
      );
    }

    return content;
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
