import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Form } from "antd";
import { Upload } from "./Upload";
import { FormItem } from "../FormItem/FormItem";

import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4051-2649&m=dev";

type UploadStoryProps = React.ComponentProps<typeof Upload> & {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
};

const FILE_DEFAULT = [{ uid: "1", name: "Nomedoarquivo.pdf", status: "done" as const }];
const FILE_SHORT = [{ uid: "2", name: "rg.pdf", status: "done" as const }];
const FILE_TWO = [
  { uid: "3", name: "rg.pdf", status: "done" as const },
  { uid: "4", name: "Nomedoarquivo.pdf", status: "done" as const },
];
const FILE_ERROR = [{ uid: "5", name: "Nomedoarquivo.pdf", status: "error" as const }];
const FILE_LOADING = [{ uid: "6", name: "Nomedoarquivo.pdf", status: "uploading" as const }];

const getPseudoClassName = (args: { hover?: boolean; active?: boolean; focus?: boolean; className?: string }) => {
  const pseudoClasses = [args.hover && "pseudo-hover", args.active && "pseudo-active", args.focus && "pseudo-focus-visible"]
    .filter(Boolean)
    .join(" ");

  return [args.className, pseudoClasses].filter(Boolean).join(" ");
};

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 16,
  lineHeight: "1.2",
  fontWeight: 400,
  color: "var(--color-neutral-800)",
};

const helperStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 13,
  lineHeight: "1.2",
  fontWeight: 400,
  color: "var(--color-neutral-500)",
};

const meta: Meta<UploadStoryProps> = {
  title: "Components/Upload",
  component: Upload,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: FIGMA_URL,
    },
    docs: {
      codePanel: true,
      description: {
        component: `
Componente de upload de arquivos baseado no [Ant Design Upload](https://ant.design/components/upload).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Upload.
- **Custom (Juscash)**:
  - \`dsSize\`: Define o tamanho específico seguindo o Design System (\`xs\`, \`s\`, \`m\`, \`l\`).
  - \`layout\`: Define o layout do componente (\`vertical\` ou \`horizontal\`).
  - \`showTrigger\`: Permite exibir apenas a lista de arquivos.
  - \`validationStatus\`: Permite controlar o estado visual de erro do trigger.

### Como usar:

\`\`\`tsx
import { Upload } from "@juscash/design-system";

function Example() {
  return <Upload layout="vertical" />;
}
\`\`\`
`,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <Primary />

          <Controls />

          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <h3
              style={{
                marginBottom: "1rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Figma Spec
            </h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>

          <Stories />
        </>
      ),
    },
  },
  args: {
    layout: "vertical",
    children: undefined,
    hover: false,
    active: false,
    focus: false,
  },
  argTypes: {
    dsSize: {
      control: "select",
      options: ["xs", "s", "m", "l"],
      description: "Tamanho do Design System",
    },
    layout: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Layout do botão e lista",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o componente",
    },
    showTrigger: {
      control: "boolean",
      description: "Exibe apenas a lista de arquivos",
    },
    validationStatus: {
      control: "select",
      options: [undefined, "error"],
      description: "Estado visual de erro do trigger",
    },
    hover: {
      control: "boolean",
      description: "Força o estado hover",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active",
      table: { category: "Pseudo States" },
    },
    focus: {
      control: "boolean",
      description: "Força o estado de focus (Visual)",
      table: { category: "Pseudo States" },
    },
  },
  decorators: [
    (Story) => (
      <Form layout="vertical">
        <div style={{ width: 400 }}>
          <Story />
        </div>
      </Form>
    ),
  ],
  render: (args) => {
    const { focus, hover, active, className, ...props } = args;
    const mergedClassName = getPseudoClassName({
      hover,
      active,
      focus,
      className,
    });

    return (
      <FormItem label="Upload Label">
        <Upload {...props} className={mergedClassName} />
      </FormItem>
    );
  },
};

export default meta;
type Story = StoryObj<UploadStoryProps>;

export const Vertical: Story = {
  args: {
    layout: "vertical",
  },
  name: "Vertical (Default)",
};

export const Horizontal: Story = {
  args: {
    layout: "horizontal",
    fileList: FILE_SHORT,
  },
  name: "Horizontal",
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    validationStatus: "error",
  },
  name: "Error State",
};

export const Focus: Story = {
  args: {
    focus: true,
  },
  name: "Focus State",
};

export const FigmaGrid: Story = {
  name: "Figma — Grid",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [],
  render: () => (
    <div style={{ padding: 48, background: "white", display: "flex", flexDirection: "column", gap: 56 }}>
      <div style={{ display: "grid", gridTemplateColumns: "96px repeat(4, 320px)", gap: 24, alignItems: "start" }}>
        <div />
        <MetaTitle label="Regular" />
        <MetaTitle label="Large" />
        <MetaTitle label="Small" />
        <MetaTitle label="Mini" />

        <SectionLabel label="Without file" />
        <UploadField label="Label">
          <Upload dsSize="m" />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="l" />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="s" />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="xs" />
        </UploadField>

        <SectionLabel label="With file vertical" />
        <UploadField label="Label">
          <Upload dsSize="m" fileList={FILE_DEFAULT} />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="l" fileList={FILE_DEFAULT} />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="s" fileList={FILE_DEFAULT} />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="xs" fileList={FILE_DEFAULT} />
        </UploadField>

        <SectionLabel label="With file horizontal" />
        <UploadField label="Label">
          <Upload dsSize="m" layout="horizontal" fileList={FILE_DEFAULT} />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="l" layout="horizontal" fileList={FILE_DEFAULT} />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="s" layout="horizontal" fileList={FILE_DEFAULT} />
        </UploadField>
        <UploadField label="Label">
          <Upload dsSize="xs" layout="horizontal" fileList={FILE_DEFAULT} />
        </UploadField>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "70px 362.5px 362.5px", gap: 24, alignItems: "center" }}>
        <div />
        <MetaTitle label="upload" />
        <MetaTitle label="File" />

        <StateLabel label="Default" />
        <Upload dsSize="m" />
        <Upload dsSize="m" showTrigger={false} fileList={FILE_DEFAULT} />

        <StateLabel label="Focus" />
        <Upload dsSize="m" className="pseudo-focus-visible" />
        <Upload dsSize="m" showTrigger={false} fileList={FILE_DEFAULT} className="pseudo-focus-visible" />

        <StateLabel label="Error" />
        <Upload dsSize="m" validationStatus="error" />
        <Upload dsSize="m" showTrigger={false} fileList={FILE_ERROR} />

        <StateLabel label="Error Focus" />
        <Upload dsSize="m" validationStatus="error" className="pseudo-focus-visible" />
        <Upload dsSize="m" showTrigger={false} fileList={FILE_ERROR} className="pseudo-focus-visible" />

        <StateLabel label="Disabled" />
        <Upload dsSize="m" disabled />
        <Upload dsSize="m" showTrigger={false} fileList={FILE_DEFAULT} disabled />

        <StateLabel label="Loading" />
        <div />
        <Upload dsSize="m" showTrigger={false} fileList={FILE_LOADING} />
      </div>
    </div>
  ),
};

export const FigmaExamples: Story = {
  name: "Figma — Examples",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [],
  render: () => (
    <div style={{ padding: 48, background: "white" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 320px)", gap: 24, alignItems: "start" }}>
        <UploadField label="Anexe seu RG">
          <Upload dsSize="m" />
        </UploadField>

        <UploadField label="Anexe seu RG" helper="Envie seu documento para concluir a solicitação." helperGap={6}>
          <Upload dsSize="m" />
        </UploadField>

        <UploadField label="Anexe seu RG" helper="Envie seu documento para concluir a solicitação." helperGap={6}>
          <Upload dsSize="m" fileList={FILE_SHORT} disabled />
        </UploadField>

        <UploadField label="Anexe seu RG" helper="Envie seu documento para concluir a solicitação." helperGap={6}>
          <Upload dsSize="m" fileList={FILE_TWO} />
        </UploadField>

        <UploadField label="Anexe seu RG" helper="Envie seu documento para concluir a solicitação." helperGap={6}>
          <Upload dsSize="m" fileList={FILE_SHORT} disabled />
        </UploadField>
      </div>
    </div>
  ),
};

function UploadField(props: { label: string; helper?: string; helperGap?: number; children: React.ReactNode }) {
  const { label, helper, helperGap = 8, children } = props;

  return (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: helper ? helperGap : 8 }}>
      <div style={fieldLabelStyle}>{label}</div>
      {children}
      {helper ? <div style={helperStyle}>{helper}</div> : null}
    </div>
  );
}

function MetaTitle(props: { label: string }) {
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        lineHeight: "1.5",
        color: "#7c3aed",
      }}
    >
      {props.label}
    </div>
  );
}

function SectionLabel(props: { label: string }) {
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        lineHeight: "1.5",
        color: "#7c3aed",
        paddingTop: 20,
      }}
    >
      {props.label}
    </div>
  );
}

function StateLabel(props: { label: string }) {
  return (
    <div
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        lineHeight: "1.5",
        color: "#7c3aed",
      }}
    >
      {props.label}
    </div>
  );
}
