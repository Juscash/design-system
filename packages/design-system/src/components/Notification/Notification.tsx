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
    marginXS: spacing[1], // 4px gap between title/desc
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
    const wrap = (type: "success" | "info" | "warning" | "error") => (args: NotificationArgsProps) => {
      const isError = type === "error";

      const customStyle =
        isError ?
          {
            color: designSystemColors.feedback.red[500],
          }
        : {};
      const customClassName = isError ? "ds-notification-error" : "";
      api[type]({
        ...args,
        style: { ...customStyle, ...args.style },
        className: `ds-notification ${customClassName} ${args.className || ""}`.trim(),
      });
    };
    return {
      success: wrap("success"),
      info: wrap("info"),
      warning: wrap("warning"),
      error: wrap("error"),
      open: api.open,
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
        /* Notification: border, radius conforme Figma */
        .ds-notification {
          border: 1px solid ${designSystemColors.neutral[300]} !important;
          border-radius: ${radius.xl}px !important;
        }

        /* Icon: 20px, centralizado verticalmente com o conteúdo */
        .ds-notification .ant-notification-notice-icon {
          font-size: 20px !important;
          line-height: 20px !important;
        }

        /* Layout com ícone: gap 12px entre ícone e texto */
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-message,
        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-title {
          font-size: 16px !important;
          color: ${designSystemColors.neutral[800]} !important;
          line-height: 1.2 !important;
          margin-bottom: 0 !important;
          padding-inline-start: 32px !important;
        }

        .ds-notification .ant-notification-notice-with-icon .ant-notification-notice-description {
          font-size: 13px !important;
          color: ${designSystemColors.neutral[500]} !important;
          line-height: 1.2 !important;
          margin-top: 4px !important;
          padding-inline-start: 32px !important;
        }

        /* Sem ícone */
        .ds-notification .ant-notification-notice-message,
        .ds-notification .ant-notification-notice-title {
          font-size: 16px !important;
          color: ${designSystemColors.neutral[800]} !important;
          line-height: 1.2 !important;
        }

        .ds-notification .ant-notification-notice-description {
          font-size: 13px !important;
          color: ${designSystemColors.neutral[500]} !important;
          line-height: 1.2 !important;
        }

        .ds-notification .ant-notification-notice-close {
          font-size: 12px !important;
          color: ${designSystemColors.neutral[800]} !important;
          top: 16px !important;
          inset-inline-end: 16px !important;
        }

        /* Error variant */
        .ds-notification-error .ant-notification-notice-message,
        .ds-notification-error .ant-notification-notice-title {
          color: ${designSystemColors.feedback.red[900]} !important;
        }
        .ds-notification-error .ant-notification-notice-description {
          color: ${designSystemColors.feedback.red[900]} !important;
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
 * NOTE: This component is primarily used via the `useNotification` hook.
 *
 * @example
 * const [api, contextHolder] = Notification.useNotification();
 *
 * return (
 *   <>
 *     {contextHolder}
 *     <Button onClick={() => api.success({ message: 'Success' })}>
 *       Show Notification
 *     </Button>
 *   </>
 * )
 */
export const Notification = {
  useNotification,
};
