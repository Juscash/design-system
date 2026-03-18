import React from "react";
import { notification as antdNotification, ConfigProvider } from "antd";
import type { NotificationArgsProps } from "antd";
import { designSystemColors, radius, spacing, shadow } from "../../theme";

function getNotificationTokens() {
  return {
    zIndexPopup: 1050,
    width: 356,
    paddingContentHorizontalLG: spacing[4], // 16px
    colorBgElevated: designSystemColors.neutral[50],
    colorTextHeading: designSystemColors.neutral[800],
    colorText: designSystemColors.neutral[500],
    borderRadiusLG: radius.xl, // 8px
    boxShadow: shadow.m,
    marginXS: spacing[1], // 4px
  };
}

export function useNotification() {
  const [api, contextHolder] = antdNotification.useNotification({
    maxCount: 3,
    duration: 4,
    placement: "top",
    top: 16,
  });

  const wrappedApi = React.useMemo(() => {
    const wrapType =
      (type: "success" | "info" | "warning" | "error") =>
      (args: NotificationArgsProps) => {
        const extraClass = type === "error" ? "ds-notification-error" : "";
        api[type]({
          ...args,
          className: `ds-notification ${extraClass} ${args.className ?? ""}`.trim(),
        });
      };
    return {
      success: wrapType("success"),
      info: wrapType("info"),
      warning: wrapType("warning"),
      error: wrapType("error"),
      open: (args: NotificationArgsProps) =>
        api.open({
          ...args,
          className: `ds-notification ${args.className ?? ""}`.trim(),
        }),
      destroy: api.destroy,
    };
  }, [api]);

  const wrappedContextHolder = (
    <ConfigProvider
      theme={{
        components: {
          Notification: {
            ...getNotificationTokens(),
          },
        },
      }}
    >
      <style>{`
        /* ─── Base (Figma: p-16px, border neutral-300, radius-xl 8px) ─── */
        .ds-notification {
          padding: 16px !important;
          border: 1px solid ${designSystemColors.neutral[300]} !important;
          border-radius: ${radius.xl}px !important;
        }
        .ds-notification::before,
        .ds-notification::after {
          display: none !important;
          content: none !important;
        }

        /* ─── Layout: CSS Grid para icon centralizar com ambas linhas de texto ─── */
        /* Figma: [icon 20px center] [text-col: title+desc] [actions] ... [close 12px] */
        .ds-notification .ant-notification-notice-with-icon {
          display: grid !important;
          grid-template-columns: 20px 1fr auto !important;
          grid-template-rows: auto auto !important;
          column-gap: 12px !important;
          row-gap: 0px !important;
          align-items: start !important;
          padding: 0 !important;
          margin: 0 !important;
          padding-inline-end: 24px !important;
        }

        /* ─── Ícone: coluna 1, span 2 rows, centralizado verticalmente (Figma: 20px, items-center) ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-icon {
          position: static !important;
          grid-column: 1 !important;
          grid-row: 1 / 3 !important;
          align-self: center !important;
          font-size: 20px !important;
          line-height: 1 !important;
          width: 20px !important;
          height: 20px !important;
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        /* ─── Título: coluna 2, row 1 (Figma: 16px Inter Regular 400, line-height 1.2, #262626) ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-title,
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-message {
          grid-column: 2 !important;
          grid-row: 1 !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          color: ${designSystemColors.neutral[800]} !important;
          margin: 0 !important;
          padding: 0 !important;
          min-width: 0 !important;
        }

        /* ─── Descrição: coluna 2, row 2 (Figma: 13px Inter Regular 400, line-height 1.2, #6d6d6e, gap 4px) ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-description {
          grid-column: 2 !important;
          grid-row: 2 !important;
          font-size: 13px !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          color: ${designSystemColors.neutral[500]} !important;
          margin: 0 !important;
          margin-top: 4px !important;
          padding: 0 !important;
        }

        /* ─── Ações: coluna 3, span 2 rows, centralizado verticalmente (Figma: items-center na row) ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-actions {
          grid-column: 3 !important;
          grid-row: 1 / 3 !important;
          align-self: center !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* ─── Sem ícone: título e descrição diretos ─── */
        .ds-notification .ant-notification-notice-title,
        .ds-notification .ant-notification-notice-message {
          font-size: 16px !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          color: ${designSystemColors.neutral[800]} !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .ds-notification .ant-notification-notice-description {
          font-size: 13px !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          color: ${designSystemColors.neutral[500]} !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* ─── Botão fechar (Figma: 12px, centralizado verticalmente, right 16px) ─── */
        .ds-notification .ant-notification-notice-close {
          top: 50% !important;
          transform: translateY(-50%) !important;
          inset-inline-end: 16px !important;
          width: 12px !important;
          height: 12px !important;
          color: ${designSystemColors.neutral[400]} !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .ds-notification .ant-notification-notice-close .ant-notification-notice-close-x {
          font-size: 12px !important;
          width: 12px !important;
          height: 12px !important;
          line-height: 12px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .ds-notification .ant-notification-notice-close svg {
          width: 12px !important;
          height: 12px !important;
        }

        /* ─── Variante Error (Figma: mesmo bg neutral-50, texto e ícone red-500) ─── */
        .ds-notification.ds-notification-error .ant-notification-notice-with-icon .ant-notification-notice-icon {
          color: ${designSystemColors.feedback.red[500]} !important;
        }
        .ds-notification.ds-notification-error .ant-notification-notice-with-icon .ant-notification-notice-title,
        .ds-notification.ds-notification-error .ant-notification-notice-with-icon .ant-notification-notice-message {
          color: ${designSystemColors.feedback.red[500]} !important;
        }
        .ds-notification.ds-notification-error .ant-notification-notice-with-icon .ant-notification-notice-description {
          color: ${designSystemColors.feedback.red[500]} !important;
        }
        .ds-notification.ds-notification-error .ant-notification-notice-title,
        .ds-notification.ds-notification-error .ant-notification-notice-message {
          color: ${designSystemColors.feedback.red[500]} !important;
        }
        .ds-notification.ds-notification-error .ant-notification-notice-description {
          color: ${designSystemColors.feedback.red[500]} !important;
        }
      `}</style>
      {contextHolder}
    </ConfigProvider>
  );

  return [wrappedApi, wrappedContextHolder] as const;
}

/**
 * Notification component
 *
 * @example
 * const [api, contextHolder] = Notification.useNotification();
 *
 * return (
 *   <>
 *     {contextHolder}
 *     <Button onClick={() => api.success({ message: 'Sucesso', description: 'Operação concluída.' })}>
 *       Mostrar
 *     </Button>
 *   </>
 * )
 */
export const Notification = {
  useNotification,
};
