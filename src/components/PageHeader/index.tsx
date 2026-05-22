import React from "react";
import { Flex, Space } from "antd";
import { Card } from "../Card";
import { Heading6, Body1 } from "../Typography";
import { spacing } from "../../theme";
import type { PageHeaderProps } from "../../types/components/PageHeader";

/**
 * Cabeçalho de página padrão: card com título, descrição e ação opcional
 * alinhados horizontalmente.
 */
export function PageHeader({ title, description, action }: PageHeaderProps): React.ReactElement {
  return (
    <Card>
      <Flex justify="space-between" align="center" gap={spacing[1]}>
        <Space vertical size={spacing[2]}>
          <Heading6>{title}</Heading6>
          <Body1>{description}</Body1>
        </Space>
        {action && <Space>{action}</Space>}
      </Flex>
    </Card>
  );
}

PageHeader.displayName = "PageHeader";

export type { PageHeaderProps } from "../../types/components/PageHeader";
