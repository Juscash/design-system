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
  FormItem,
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

const verticalRequiredCode = `import { Form, Input, Button, FormItem } from '@Juscash/design-system';

function VerticalRequiredForm() {
  const [form] = Form.useForm();
  
  const onFinish = (values: any) => {
    console.log('Valores:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <FormItem 
        label="Nome" 
        name="name" 
        required
        rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
      >
        <Input placeholder="Digite seu nome" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </FormItem>
    </Form>
  );
}

render(<VerticalRequiredForm />);`;

const horizontalRequiredCode = `import { Form, Input, Button, FormItem } from '@Juscash/design-system';

function HorizontalRequiredForm() {
  const [form] = Form.useForm();
  
  const onFinish = (values: any) => {
    console.log('Valores:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <FormItem 
        label="Nome" 
        name="name" 
        required
        rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
      >
        <Input placeholder="Digite seu nome" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </FormItem>
    </Form>
  );
}

render(<HorizontalRequiredForm />);`;

const verticalNoRequiredCode = `import { Form, Input, Button, FormItem } from '@Juscash/design-system';

function VerticalNoRequiredForm() {
  const [form] = Form.useForm();
  
  const onFinish = (values: any) => {
    console.log('Valores:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <FormItem 
        label="Nome" 
        name="name"
      >
        <Input placeholder="Digite seu nome" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </FormItem>
    </Form>
  );
}

render(<VerticalNoRequiredForm />);`;

const horizontalNoRequiredCode = `import { Form, Input, Button, FormItem } from '@Juscash/design-system';

function HorizontalNoRequiredForm() {
  const [form] = Form.useForm();
  
  const onFinish = (values: any) => {
    console.log('Valores:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <FormItem 
        label="Nome" 
        name="name"
      >
        <Input placeholder="Digite seu nome" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </FormItem>
    </Form>
  );
}

render(<HorizontalNoRequiredForm />);`;

export const FormShowcase: React.FC = () => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Valores:", values);
  };

  return (
    <Space direction="vertical" size={24} style={{ width: "100%" }}>
      <Heading2>Form</Heading2>
      <Body1>
        Formulário com validação usando o componente Form customizado do design
        system. Suporta layouts vertical e horizontal, com ou sem campos
        obrigatórios.
      </Body1>

      <DemoCard
        title="Formulário Vertical com Required"
        description="Formulário com layout vertical e campo obrigatório (com asterisco vermelho)."
        code={verticalRequiredCode}
        preview={
          <Form
            form={form1}
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 400 }}
          >
            <FormItem
              label={<Body1 strong>Nome</Body1>}
              name="name"
              required
              rules={[
                { required: true, message: "Por favor, insira seu nome!" },
              ]}
            >
              <Input placeholder="Digite seu nome" />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </FormItem>
          </Form>
        }
      />

      <DemoCard
        title="Formulário Horizontal com Required"
        description="Formulário com layout horizontal e campo obrigatório (com asterisco vermelho)."
        code={horizontalRequiredCode}
        preview={
          <Form
            form={form2}
            onFinish={onFinish}
            layout="horizontal"
            style={{ maxWidth: 500 }}
          >
            <FormItem
              label="Nome"
              name="name"
              required
              rules={[
                { required: true, message: "Por favor, insira seu nome!" },
              ]}
            >
              <Input placeholder="Digite seu nome" style={{ width: 200 }} />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </FormItem>
          </Form>
        }
      />

      <DemoCard
        title="Formulário Vertical sem Required"
        description="Formulário com layout vertical sem campo obrigatório."
        code={verticalNoRequiredCode}
        preview={
          <Form
            form={form3}
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 400 }}
          >
            <FormItem label="Nome" name="name">
              <Input placeholder="Digite seu nome" />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </FormItem>
          </Form>
        }
      />

      <DemoCard
        title="Formulário Horizontal sem Required"
        description="Formulário com layout horizontal sem campo obrigatório."
        code={horizontalNoRequiredCode}
        preview={
          <Form
            form={form4}
            onFinish={onFinish}
            layout="horizontal"
            style={{ maxWidth: 500 }}
          >
            <FormItem label="Nome" name="name">
              <Input placeholder="Digite seu nome" style={{ width: 200 }} />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </FormItem>
          </Form>
        }
      />
    </Space>
  );
};
