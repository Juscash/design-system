"use client";

import React, { useState } from "react";
import {
  Card,
  Space,
  Form,
  Input,
  Button,
  Heading2,
  Body1,
  Body2,
} from "@Juscash/design-system";

import { ButtonPlayground } from "../buttons/ButtonPlayground";

interface DemoCardProps {
  title: string;
  description: string;
  code: string;
  preview: React.ReactNode;
}

const DemoCard: React.FC<DemoCardProps> = ({
  title,
  description,
  code,
  preview,
}) => {
  const [showPlayground, setShowPlayground] = useState(false);

  return (
    <Card
      title={title}
      style={{ width: "100%" }}
      extra={
        <Body2
          onClick={() => setShowPlayground((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: "#136CE2",
            fontWeight: 600,
          }}
        >
          {showPlayground ? "Ocultar exemplo" : "Exemplo interativo"}
        </Body2>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Body1>{description}</Body1>
        {preview}
        {showPlayground ? <ButtonPlayground code={code} /> : null}
      </Space>
    </Card>
  );
};

const simpleFormCode = `import { Form, Input, Button } from '@Juscash/design-system';

function SimpleForm() {
  const onFinish = (values: any) => {
    console.log('Valores:', values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="Nome" name="name" rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}>
        <Input placeholder="Digite seu nome" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

render(<SimpleForm />);`;

export const FormShowcase: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Valores:", values);
  };

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Heading2>Form</Heading2>
      <Body1>
        Formulário simples com validação usando o componente Form do Ant Design.
      </Body1>

      <DemoCard
        title="Formulário Simples"
        description="Exemplo básico de formulário com um campo de input e validação."
        code={simpleFormCode}
        preview={
          <Form form={form} onFinish={onFinish} layout="vertical" style={{ maxWidth: 400 }}>
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Por favor, insira seu nome!" }]}
            >
              <Input placeholder="Digite seu nome" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Form.Item>
          </Form>
        }
      />
    </Space>
  );
};

