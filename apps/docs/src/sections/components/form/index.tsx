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
  Upload,
  Row,
  Col,
} from "@Juscash/design-system";
import { message } from "antd";
import { LIST_IGNORE } from "antd/es/upload/Upload";

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

const verticalRequiredCode = `import { Form, Input, Button, FormItem, Upload, Row, Col } from '@Juscash/design-system';
import { message } from 'antd';
import { LIST_IGNORE } from 'antd/es/upload/Upload';

function VerticalRequiredForm() {
  const [form] = Form.useForm();
  
  const name = Form.useWatch('name', form);
  const file = Form.useWatch('file', form);
  const description = Form.useWatch('description', form);
  
  const isButtonDisabled = !name || !file || !Array.isArray(file) || file.length === 0 || !description;
  
  const beforeUpload = (file: any) => {
    const isExcel = 
      file.type === 'application/vnd.ms-excel' || 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.xlsx');
    
    if (!isExcel) {
      message.error('Você só pode fazer upload de arquivos Excel (.xls ou .xlsx)!');
      form.setFields([
        {
          name: 'file',
          errors: ['Por favor, faça upload de um arquivo Excel válido!'],
        },
      ]);
      return LIST_IGNORE;
    }
    form.setFields([
      {
        name: 'file',
        errors: [],
      },
    ]);
    return false;
  };
  
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
      <FormItem
        label="Arquivo Excel"
        name="file"
        required
        rules={[{ required: true, message: 'Por favor, faça upload de um arquivo Excel!' }]}
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
      >
        <Upload
          accept=".xls,.xlsx"
          beforeUpload={beforeUpload}
          maxCount={1}
        />
      </FormItem>
      <FormItem
        label="Descrição"
        name="description"
        required
        rules={[{ required: true, message: 'Por favor, insira uma descrição!' }]}
      >
        <Input.TextArea placeholder="Digite uma descrição" rows={4} />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
          Enviar
        </Button>
      </FormItem>
    </Form>
  );
}

render(<VerticalRequiredForm />);`;

const horizontalRequiredCode = `import { Form, Input, Button, FormItem, Upload, Row, Col } from '@Juscash/design-system';
import { message } from 'antd';
import { LIST_IGNORE } from 'antd/es/upload/Upload';

function HorizontalRequiredForm() {
  const [form] = Form.useForm();
  
  const name = Form.useWatch('name', form);
  const file = Form.useWatch('file', form);
  const description = Form.useWatch('description', form);
  
  const isButtonDisabled = !name || !file || !Array.isArray(file) || file.length === 0 || !description;
  
  const beforeUpload = (file: any) => {
    const isExcel = 
      file.type === 'application/vnd.ms-excel' || 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.xlsx');
    
    if (!isExcel) {
      message.error('Você só pode fazer upload de arquivos Excel (.xls ou .xlsx)!');
      form.setFields([
        {
          name: 'file',
          errors: ['Por favor, faça upload de um arquivo Excel válido!'],
        },
      ]);
      return LIST_IGNORE;
    }
    form.setFields([
      {
        name: 'file',
        errors: [],
      },
    ]);
    return false;
  };
  
  const onFinish = (values: any) => {
    console.log('Valores:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Row gutter={16}>
        <Col span={8}>
          <FormItem 
            label="Nome" 
            name="name" 
            required
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input placeholder="Digite seu nome" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            label="Arquivo Excel"
            name="file"
            required
            rules={[{ required: true, message: 'Por favor, faça upload de um arquivo Excel!' }]}
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              accept=".xls,.xlsx"
              beforeUpload={beforeUpload}
              maxCount={1}
            />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            label="Descrição"
            name="description"
            required
            rules={[{ required: true, message: 'Por favor, insira uma descrição!' }]}
          >
            <Input.TextArea placeholder="Descrição" rows={4} />
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
          Enviar
        </Button>
      </FormItem>
    </Form>
  );
}

render(<HorizontalRequiredForm />);`;

const verticalNoRequiredCode = `import { Form, Input, Button, FormItem, Upload, Row, Col } from '@Juscash/design-system';
import { message } from 'antd';
import { LIST_IGNORE } from 'antd/es/upload/Upload';

function VerticalNoRequiredForm() {
  const [form] = Form.useForm();
  
  const beforeUpload = (file: any) => {
    const isExcel = 
      file.type === 'application/vnd.ms-excel' || 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.xlsx');
    
    if (!isExcel) {
      message.error('Você só pode fazer upload de arquivos Excel (.xls ou .xlsx)!');
      form.setFields([
        {
          name: 'file',
          errors: ['Por favor, faça upload de um arquivo Excel válido!'],
        },
      ]);
      return LIST_IGNORE;
    }
    form.setFields([
      {
        name: 'file',
        errors: [],
      },
    ]);
    return false;
  };
  
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
      <FormItem
        label="Arquivo Excel"
        name="file"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e?.fileList;
        }}
      >
        <Upload
          accept=".xls,.xlsx"
          beforeUpload={beforeUpload}
          maxCount={1}
        />
      </FormItem>
      <FormItem
        label="Descrição"
        name="description"
      >
        <Input.TextArea placeholder="Digite uma descrição" rows={4} />
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

const horizontalNoRequiredCode = `import { Form, Input, Button, FormItem, Upload, Row, Col } from '@Juscash/design-system';
import { message } from 'antd';
import { LIST_IGNORE } from 'antd/es/upload/Upload';

function HorizontalNoRequiredForm() {
  const [form] = Form.useForm();
  
  const beforeUpload = (file: any) => {
    const isExcel = 
      file.type === 'application/vnd.ms-excel' || 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.name.endsWith('.xls') ||
      file.name.endsWith('.xlsx');
    
    if (!isExcel) {
      message.error('Você só pode fazer upload de arquivos Excel (.xls ou .xlsx)!');
      form.setFields([
        {
          name: 'file',
          errors: ['Por favor, faça upload de um arquivo Excel válido!'],
        },
      ]);
      return LIST_IGNORE;
    }
    form.setFields([
      {
        name: 'file',
        errors: [],
      },
    ]);
    return false;
  };
  
  const onFinish = (values: any) => {
    console.log('Valores:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Row gutter={16}>
        <Col span={8}>
          <FormItem 
            label="Nome" 
            name="name"
          >
            <Input placeholder="Digite seu nome" />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            label="Arquivo Excel"
            name="file"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              accept=".xls,.xlsx"
              beforeUpload={beforeUpload}
              maxCount={1}
            />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            label="Descrição"
            name="description"
          >
            <Input.TextArea placeholder="Descrição" rows={4} />
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </FormItem>
    </Form>
  );
}

render(<HorizontalNoRequiredForm />);`;

// Função auxiliar para validar arquivos Excel (recebe form como parâmetro)
const createBeforeUploadExcel = (form: any) => (file: any) => {
  const isExcel =
    file.type === "application/vnd.ms-excel" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.name.endsWith(".xls") ||
    file.name.endsWith(".xlsx");

  if (!isExcel) {
    message.error(
      "Você só pode fazer upload de arquivos Excel (.xls ou .xlsx)!"
    );
    form.setFields([
      {
        name: "file",
        errors: ["Por favor, faça upload de um arquivo Excel válido!"],
      },
    ]);
    return LIST_IGNORE;
  }
  form.setFields([
    {
      name: "file",
      errors: [],
    },
  ]);
  return false;
};

export const FormShowcase: React.FC = () => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Valores:", values);
  };

  // Valores observados para validação dos botões (form1 e form2 - required)
  const name1 = Form.useWatch("name", form1);
  const file1 = Form.useWatch("file", form1);
  const description1 = Form.useWatch("description", form1);
  const isButtonDisabled1 =
    !name1 ||
    !file1 ||
    !Array.isArray(file1) ||
    file1.length === 0 ||
    !description1;

  const name2 = Form.useWatch("name", form2);
  const file2 = Form.useWatch("file", form2);
  const description2 = Form.useWatch("description", form2);
  const isButtonDisabled2 =
    !name2 ||
    !file2 ||
    !Array.isArray(file2) ||
    file2.length === 0 ||
    !description2;

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
        description="Formulário com layout vertical e campos obrigatórios (com asterisco vermelho)."
        code={verticalRequiredCode}
        preview={
          <Form
            form={form1}
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 400 }}
          >
            <FormItem
              label="Nome"
              name="name"
              required
              rules={[
                { required: true, message: "Por favor, insira seu nome!" },
              ]}
            >
              <Input placeholder="Digite seu nome" />
            </FormItem>
            <FormItem
              label="Arquivo Excel"
              name="file"
              required
              rules={[
                {
                  required: true,
                  message: "Por favor, faça upload de um arquivo Excel!",
                },
              ]}
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                accept=".xls,.xlsx"
                beforeUpload={createBeforeUploadExcel(form1)}
                maxCount={1}
              />
            </FormItem>
            <FormItem
              label="Descrição"
              name="description"
              required
              rules={[
                { required: true, message: "Por favor, insira uma descrição!" },
              ]}
            >
              <Input.TextArea placeholder="Digite uma descrição" rows={4} />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled1}
              >
                Enviar
              </Button>
            </FormItem>
          </Form>
        }
      />

      <DemoCard
        title="Formulário Horizontal com Required"
        description="Formulário com layout horizontal e campos obrigatórios (com asterisco vermelho)."
        code={horizontalRequiredCode}
        preview={
          <Form
            form={form2}
            onFinish={onFinish}
            layout="horizontal"
            style={{ maxWidth: 800 }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <FormItem
                  label="Nome"
                  name="name"
                  required
                  rules={[
                    { required: true, message: "Por favor, insira seu nome!" },
                  ]}
                >
                  <Input placeholder="Digite seu nome" />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Arquivo Excel"
                  name="file"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Por favor, faça upload de um arquivo Excel!",
                    },
                  ]}
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                >
                  <Upload
                    accept=".xls,.xlsx"
                    beforeUpload={createBeforeUploadExcel(form2)}
                    maxCount={1}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Descrição"
                  name="description"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira uma descrição!",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Descrição" rows={4} />
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled2}
              >
                Enviar
              </Button>
            </FormItem>
          </Form>
        }
      />

      <DemoCard
        title="Formulário Vertical sem Required"
        description="Formulário com layout vertical sem campos obrigatórios."
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
            <FormItem
              label="Arquivo Excel"
              name="file"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                accept=".xls,.xlsx"
                beforeUpload={createBeforeUploadExcel(form3)}
                maxCount={1}
              />
            </FormItem>
            <FormItem label="Descrição" name="description">
              <Input.TextArea placeholder="Digite uma descrição" rows={4} />
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
        description="Formulário com layout horizontal sem campos obrigatórios."
        code={horizontalNoRequiredCode}
        preview={
          <Form
            form={form4}
            onFinish={onFinish}
            layout="horizontal"
            style={{ maxWidth: 800 }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label="Nome" name="name">
                  <Input placeholder="Digite seu nome" />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Arquivo Excel"
                  name="file"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                >
                  <Upload
                    accept=".xls,.xlsx"
                    beforeUpload={createBeforeUploadExcel(form4)}
                    maxCount={1}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Descrição" name="description">
                  <Input.TextArea placeholder="Descrição" rows={4} />
                </FormItem>
              </Col>
            </Row>
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
