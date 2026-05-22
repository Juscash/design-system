import React from "react";
import { Alert as AntdAlert, ConfigProvider } from "antd";
import type { AlertProps as AntdAlertProps } from "antd";
import type { ComponentToken } from "antd/es/alert/style";
import { CircleCheck, CircleX, AlertCircle, Info } from "lucide-react";
import { designSystemColors, radius, spacing } from "../../theme";
import { Body1, Body2 } from "../Typography";
import type { CustomTypographyProps } from "../../types/components/Typography";
import type { AlertProps, AlertVariant } from "../../types/components/Alert";

const ICON_SIZE = 16;

type AlertComponentToken = Partial<ComponentToken> & Record<string, unknown>;

function getNeutralTokens(): AlertComponentToken {
  return {
    colorInfoBg: designSystemColors.neutral[50],
    colorInfoBorder: designSystemColors.neutral[300],
    colorTextCount: designSystemColors.neutral[500],
    colorTextHeading: designSystemColors.neutral[800],
    colorText: designSystemColors.neutral[500],
    colorIcon: designSystemColors.neutral[800],
    colorInfo: designSystemColors.neutral[800],
  };
}

function getErrorTokens(): AlertComponentToken {
  return {
    colorErrorBg: designSystemColors.neutral[50],
    colorErrorBorder: designSystemColors.neutral[300],
    colorTextHeading: designSystemColors.feedback.red[500],
    colorText: designSystemColors.feedback.red[500],
    colorError: designSystemColors.feedback.red[500],
  };
}

function getSuccessTokens(): AlertComponentToken {
  return {
    colorSuccessBg: designSystemColors.neutral[50],
    colorSuccessBorder: designSystemColors.neutral[300],
    colorTextHeading: designSystemColors.feedback.green[500],
    colorText: designSystemColors.feedback.green[500],
    colorSuccess: designSystemColors.feedback.green[500],
  };
}

function getInfoTokens(): AlertComponentToken {
  return {
    colorInfoBg: designSystemColors.neutral[50],
    colorInfoBorder: designSystemColors.neutral[300],
    colorTextHeading: designSystemColors.feedback.blue[500],
    colorText: designSystemColors.feedback.blue[500],
    colorInfo: designSystemColors.feedback.blue[500],
  };
}

function getWarningTokens(): AlertComponentToken {
  return {
    colorWarningBg: designSystemColors.neutral[50],
    colorWarningBorder: designSystemColors.neutral[300],
    colorTextHeading: designSystemColors.feedback.yellow[500],
    colorText: designSystemColors.feedback.yellow[500],
    colorWarning: designSystemColors.feedback.yellow[500],
  };
}

function getVariantTokens(type: AlertVariant): AlertComponentToken {
  switch (type) {
    case "neutral":
      return getNeutralTokens();
    case "error":
      return getErrorTokens();
    case "success":
      return getSuccessTokens();
    case "info":
      return getInfoTokens();
    case "warning":
      return getWarningTokens();
    default:
      return {};
  }
}

function getDefaultIcon(type: AlertVariant): React.ReactElement {
  const iconProps = { size: ICON_SIZE } as const;
  switch (type) {
    case "success":
      return <CircleCheck {...iconProps} />;
    case "info":
      return <Info {...iconProps} />;
    case "warning":
      return <AlertCircle {...iconProps} />;
    case "error":
      return <CircleX {...iconProps} />;
    case "neutral":
    default:
      return <Info {...iconProps} />;
  }
}

function resolveAntdType(type: AlertVariant): AntdAlertProps["type"] {
  return type === "neutral" ? "info" : (type as AntdAlertProps["type"]);
}

function resolveTypographyColor(type: AlertVariant): CustomTypographyProps["color"] {
  return type === "neutral" ? "dark" : (type as CustomTypographyProps["color"]);
}

function resolveDescriptionColor(type: AlertVariant): CustomTypographyProps["color"] {
  return type === "neutral" ? "neutral" : (type as CustomTypographyProps["color"]);
}

type IconElement = React.ReactElement<{ style?: React.CSSProperties }>;

/**
 * Aplica os estilos compostos (margin-top quando há descrição, cor neutra
 * quando o `type` é `neutral`) sobre o ícone resolvido. Retorna `null`/o
 * próprio nó quando o ícone não é um elemento React clonável.
 */
function buildIconNode(resolvedIcon: React.ReactNode, type: AlertVariant, hasDescription: boolean): React.ReactNode {
  if (!resolvedIcon || !React.isValidElement(resolvedIcon)) {
    return resolvedIcon;
  }
  const icon = resolvedIcon as IconElement;
  const iconColorStyle = type === "neutral" ? { color: designSystemColors.neutral[800] } : {};
  return React.cloneElement(icon, {
    style: {
      ...(hasDescription ? { marginTop: 4 } : {}),
      ...iconColorStyle,
      ...(icon.props.style || {}),
    },
  });
}

function buildAlertTheme(type: AlertVariant): NonNullable<React.ComponentProps<typeof ConfigProvider>["theme"]> {
  return {
    components: {
      Alert: {
        ...getVariantTokens(type),
        paddingContentVertical: spacing[4],
        paddingContentHorizontal: spacing[4],
        borderRadiusLG: radius.xl,
        withDescriptionIconSize: ICON_SIZE,
        defaultPadding: `${spacing[4]}px ${spacing[4]}px`,
        withDescriptionPadding: `${spacing[4]}px ${spacing[4]}px`,
      },
    },
  };
}

/**
 * Alert do design system. Aceita as variantes proprietárias `neutral`,
 * `error`, `success`, `info` e `warning`, todas com fundo neutral[50] e
 * borda neutral[300]; o `type` afeta apenas cor do título, descrição e ícone.
 */
export function Alert(props: AlertProps): React.ReactElement {
  const { type = "neutral", showLine2, showButton, showLeftIcon, ...rest } = props;
  void showButton;

  const finalShowIcon = rest.showIcon ?? showLeftIcon;
  const hasDescription = !!(rest.description || showLine2);
  const resolvedIcon = rest.icon || (finalShowIcon ? getDefaultIcon(type) : null);
  const iconNode = buildIconNode(resolvedIcon, type, hasDescription);

  return (
    <ConfigProvider theme={buildAlertTheme(type)}>
      <AntdAlert
        {...rest}
        type={resolveAntdType(type)}
        showIcon={finalShowIcon}
        icon={iconNode}
        message={rest.message ? <Body1 color={resolveTypographyColor(type)}>{rest.message}</Body1> : undefined}
        description={
          rest.description ? <Body2 color={resolveDescriptionColor(type)}>{rest.description}</Body2> : undefined
        }
        className={type === "neutral" ? "ant-alert-neutral" : ""}
        style={{ ...rest.style }}
      />
    </ConfigProvider>
  );
}

Alert.displayName = "Alert";

export type { AlertProps, AlertVariant } from "../../types/components/Alert";
