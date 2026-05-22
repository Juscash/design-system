import React from "react";
import { Flex, Space } from "antd";
import { Card } from "../Card";
import { Heading6, Body1 } from "../Typography";
import { spacing } from "../../theme";
import type { PageHeaderProps } from "../../types/components/PageHeader";

/**
 * Cabeçalho de página padrão: card com título, descrição opcional e ação
 * opcional alinhados horizontalmente. Repassa `className`/`style` para o
 * `Card` raiz para permitir composição com o consumidor.
 */
export function PageHeader({ title, description, action, className, style }: PageHeaderProps): React.ReactElement {
  return (
    <Card className={className} style={style}>
      <Flex justify="space-between" align="center" gap={spacing[1]}>
        <Space vertical size={spacing[2]}>
          <Heading6>{title}</Heading6>
          {description ? <Body1>{description}</Body1> : null}
        </Space>
        {action && <Space>{action}</Space>}
      </Flex>
    </Card>
  );
}

PageHeader.displayName = "PageHeader";

export type { PageHeaderProps } from "../../types/components/PageHeader";
