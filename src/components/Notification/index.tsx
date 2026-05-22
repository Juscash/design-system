import React from "react";
import { notification as antdNotification, ConfigProvider } from "antd";
import type { NotificationArgsProps } from "antd";
import { designSystemColors, radius, shadow, spacing } from "../../theme";
import type { NotificationApi, NotificationVariant, UseNotificationReturn } from "../../types/components/Notification";
import "./index.module.css";

const NOTIFICATION_WIDTH = 356;
const NOTIFICATION_MAX_COUNT = 3;
const NOTIFICATION_DURATION = 4;
const NOTIFICATION_TOP_OFFSET = 16;
const NOTIFICATION_Z_INDEX = 1050;

function getNotificationTokens(): Record<string, unknown> {
  return {
    zIndexPopup: NOTIFICATION_Z_INDEX,
    width: NOTIFICATION_WIDTH,
    paddingContentHorizontalLG: spacing[4],
    colorBgElevated: designSystemColors.neutral[50],
    colorTextHeading: designSystemColors.neutral[800],
    colorText: designSystemColors.neutral[500],
    borderRadiusLG: radius.xl,
    boxShadow: shadow.m,
    marginXS: spacing[1],
  };
}

type AntdNotificationApi = ReturnType<typeof antdNotification.useNotification>[0];

function buildWrappedApi(api: AntdNotificationApi): NotificationApi {
  const wrapType =
    (type: NotificationVariant) =>
    (args: NotificationArgsProps): void => {
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
}

/**
 * Hook que retorna `[api, contextHolder]` do Notification, com `api` já
 * envelopado para aplicar a classe `ds-notification` em todas as chamadas e
 * `contextHolder` envolto em `ConfigProvider` com os tokens do design system.
 */
export function useNotification(): UseNotificationReturn {
  const [api, contextHolder] = antdNotification.useNotification({
    maxCount: NOTIFICATION_MAX_COUNT,
    duration: NOTIFICATION_DURATION,
    placement: "top",
    top: NOTIFICATION_TOP_OFFSET,
  });

  const wrappedApi = React.useMemo(() => buildWrappedApi(api), [api]);

  const wrappedContextHolder = (
    <ConfigProvider
      theme={{
        components: {
          Notification: getNotificationTokens(),
        },
      }}
    >
      {contextHolder}
    </ConfigProvider>
  );

  return [wrappedApi, wrappedContextHolder] as const;
}

/**
 * Notification do design system.
 *
 * @example
 * ```tsx
 * const [api, contextHolder] = Notification.useNotification();
 *
 * return (
 *   <>
 *     {contextHolder}
 *     <Button onClick={() => api.success({ message: "Sucesso", description: "Operação concluída." })}>
 *       Mostrar
 *     </Button>
 *   </>
 * );
 * ```
 */
export const Notification = {
  useNotification,
};

export type { NotificationApi, NotificationVariant, UseNotificationReturn } from "../../types/components/Notification";
