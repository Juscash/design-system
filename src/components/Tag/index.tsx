import React from "react";
import { ConfigProvider, Tag as AntdTag } from "antd";
import { designSystemColors, radius, spacing } from "../../theme";
import type { ComponentToken } from "antd/es/tag/style";
import type { TagProps } from "../../types/components/Tag";

const TAG_PADDING_BLOCK = 4;
const TAG_PADDING_BLOCK_SM = 2;
const TAG_FONT_SIZE = 13;
const TAG_FONT_SIZE_SM = 12;
const TAG_CLOSE_SIZE = 12;

// O `ComponentToken` do Tag no Antd 6 não expõe publicamente todos os campos
// que usamos (padding/borda/cor de fundo). Como o `ConfigProvider` aceita
// chaves arbitrárias em runtime, declaramos um union manual mantendo
// segurança em tempo de leitura.
type TagComponentToken = Partial<ComponentToken> & Record<string, unknown>;

const baseTokens: TagComponentToken = {
  paddingInlineSM: spacing[2],
  paddingBlockSM: TAG_PADDING_BLOCK_SM,
  paddingInline: spacing[3],
  paddingBlock: TAG_PADDING_BLOCK,
  fontSizeSM: TAG_FONT_SIZE_SM,
  fontSize: TAG_FONT_SIZE,
  lineHeightSM: 1.4,
  lineHeight: 1.4,
  colorBorder: designSystemColors.neutral[300],
  colorText: designSystemColors.neutral[800],
  colorBg: designSystemColors.neutral[100],
  colorFill: designSystemColors.neutral[100],
  closeSize: TAG_CLOSE_SIZE,
};

type TagStatus = "error" | "success" | "warning";

const statusTokens: Record<TagStatus, TagComponentToken> = {
  error: {
    colorBg: designSystemColors.feedback.red[50],
    colorBorder: designSystemColors.feedback.red[500],
    colorText: designSystemColors.feedback.red[900],
    colorFill: designSystemColors.feedback.red[50],
  },
  success: {
    colorBg: designSystemColors.feedback.green[50],
    colorBorder: designSystemColors.feedback.green[500],
    colorText: designSystemColors.feedback.green[900],
    colorFill: designSystemColors.feedback.green[50],
  },
  warning: {
    colorBg: designSystemColors.feedback.yellow[50],
    colorBorder: designSystemColors.feedback.yellow[500],
    colorText: designSystemColors.feedback.yellow[900],
    colorFill: designSystemColors.feedback.yellow[50],
  },
};

function resolveStatusToken(props: TagProps): TagComponentToken | undefined {
  if (props.error) return statusTokens.error;
  if (props.success) return statusTokens.success;
  if (props.warning) return statusTokens.warning;
  return undefined;
}

/**
 * Tag do design system. Aceita variantes de status `error`, `success` e
 * `warning` (mutuamente exclusivas) que ajustam paleta de fundo, borda e texto.
 */
export function Tag(props: TagProps): React.ReactElement {
  const { error, success, warning, ...rest } = props;
  void error;
  void success;
  void warning;

  const statusToken = resolveStatusToken(props);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            ...baseTokens,
            ...(statusToken ?? {}),
          },
        },
        token: {
          borderRadius: radius.xl,
        },
      }}
    >
      <AntdTag {...rest} />
    </ConfigProvider>
  );
}

Tag.displayName = "Tag";

export type { TagProps } from "../../types/components/Tag";
