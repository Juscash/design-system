"use client";

import React, { ReactNode } from "react";
import { Flex, Space } from "antd";
import { Card } from "./Card";
import { Heading6, Body1 } from "./Typography";
import { spacing } from "../theme";

export interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps): React.ReactElement {
  return (
    <Card>
      <Flex justify="space-between" align="center">
        <Space vertical size={spacing[2]}>
          <Heading6 strong>{title}</Heading6>
          <Body1>{description}</Body1>
        </Space>
        {action && <Space>{action}</Space>}
      </Flex>
    </Card>
  );
}
