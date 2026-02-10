import React from "react";
import { notification as antdNotification, ConfigProvider } from "antd";
import type { NotificationArgsProps } from "antd";
import { designSystemColors, radius, spacing, shadow } from "../../theme";

function getNotificationTokens() {
  return {
    zIndexPopup: 1050,
    width: 384,
    paddingContentHorizontalLG: spacing[4], // 16px
    colorBgElevated: designSystemColors.neutral[50],
    colorTextHeading: designSystemColors.neutral[900],
    colorText: designSystemColors.neutral[600],
    borderRadiusLG: radius["2xl"], // 12px
    boxShadow: shadow.l,
    marginXS: spacing[2],
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
      const customClassName = isError ? "ant-notification-error-custom" : "";
      api[type]({
        ...args,
        style: { ...customStyle, ...args.style },
        className: `${customClassName} ${args.className || ""}`,
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
            // Ensure icon sizes if token available, or handle via CSS
          },
        },
      }}
    >
      {/* Global styles for specific overrides not covered by tokens */}
      <style>{`
        .ant-notification-notice-icon {
            font-size: 20px !important;
            margin-top: 4px; /* Minimal adjustment similar to original request */
        }
        

        .ant-notification-error-custom .ant-notification-notice-message, 
        .ant-notification-error-custom .ant-notification-notice-title { 
            color: ${designSystemColors.feedback.red[900]} !important;
        }
        .ant-notification-error-custom .ant-notification-notice-description {
            color: ${designSystemColors.feedback.red[900]} !important;
        }
        .ant-notification-error-custom .ant-notification-notice-icon {
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
