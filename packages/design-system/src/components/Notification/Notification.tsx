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
        /* ─── Base ─── */
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

        /* ─── Layout: flex row com wrap ─── */
        /* Ordem DOM: icon → title → description → actions             */
        /* Reordenamos via CSS order para: icon | title | actions / description */
        .ds-notification .ant-notification-notice-with-icon {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          padding-inline-end: 24px !important;
        }

        /* ─── Ícone: static, row 1 ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-icon {
          position: static !important;
          order: 1 !important;
          flex-shrink: 0 !important;
          font-size: 20px !important;
          line-height: 1 !important;
          margin: 0 !important;
          margin-inline-end: 12px !important;
          display: flex !important;
          align-items: center !important;
        }

        /* ─── Título: row 1, expande ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-title,
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-message {
          order: 2 !important;
          flex: 1 !important;
          min-width: 0 !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          color: ${designSystemColors.neutral[800]} !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* ─── Ações: row 1, direita (reordenado antes da description) ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-actions {
          order: 3 !important;
          flex-shrink: 0 !important;
          margin: 0 !important;
          margin-inline-start: 8px !important;
          padding: 0 !important;
        }

        /* ─── Descrição: row 2, indentada (order 4 → vai para próxima linha) ─── */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-description {
          order: 4 !important;
          flex-basis: 100% !important;
          font-size: 13px !important;
          font-weight: 400 !important;
          line-height: 1.2 !important;
          color: ${designSystemColors.neutral[500]} !important;
          margin: 0 !important;
          margin-top: 4px !important;
          padding: 0 !important;
          padding-inline-start: 32px !important;
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

        /* ─── Botão fechar ─── */
        .ds-notification .ant-notification-notice-close {
          top: 16px !important;
          inset-inline-end: 16px !important;
          color: ${designSystemColors.neutral[400]} !important;
        }

        /* ─── Variante Error: bg levemente rosa, só o ícone em vermelho ─── */
        .ds-notification-error {
          background-color: ${designSystemColors.feedback.red[50]} !important;
        }
        .ds-notification-error .ant-notification-notice-icon {
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
