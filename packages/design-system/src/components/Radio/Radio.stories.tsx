import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./Radio";
import { shadow } from "../../theme/foundations/shadow";
import { designSystemColors } from "../../theme";

type RadioStoryProps = React.ComponentProps<typeof Radio> & {
  focus?: boolean;
  hover?: boolean;
  active?: boolean;
};

const meta: Meta<RadioStoryProps> = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4062-4957&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de seleção única baseado no [Ant Design Radio](https://ant.design/components/radio).

### Props:
- **Extended (Ant Design)**: Suporta as propriedades padrão do AntD Radio.
- **Custom (Juscash)**:
  - \`error\`: Define o estado de erro visual (vermelho: borda e dot) quando verdadeiro.

### Notas de Design:
- O estado **Checked** deve apresentar a borda Cinza (Neutral 300) e o Dot Verde (Brand Primary 600), com fundo Branco.
- O estado **Error** torna a borda e o Dot vermelhos.
- Focus ring é aplicado apenas ao elemento redondo.
`,
      },
    },
  },
  args: {
    children: "Radio option",
  },
  argTypes: {
    error: {
      control: "boolean",
      description: "Define o estado de erro (borda vermelha e cor de destaque)",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita a interação com o componente",
    },
    focus: {
      control: "boolean",
      description: "Força o estado focus (visual)",
      table: { category: "Pseudo States" },
    },
    hover: {
      control: "boolean",
      description: "Força o estado hover (visual)",
      table: { category: "Pseudo States" },
    },
    active: {
      control: "boolean",
      description: "Força o estado active (visual)",
      table: { category: "Pseudo States" },
    },
  },
  render: (args) => {
    const { focus, style, ...props } = args;

    const focusColor = props.error ? shadow.focusError : shadow.focus;

    const focusStyleContext = focus ? (
      <style>{`
        .story-radio-focus-target .ant-radio-inner {
          box-shadow: ${focusColor} !important;
        }
      `}</style>
    ) : null;

    return (
      <div className={focus ? "story-radio-focus-target" : ""}>
        {focusStyleContext}
        <Radio {...props} style={style} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<RadioStoryProps>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
    checked: false,
  },
};

export const ErrorChecked: Story = {
  args: {
    error: true,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const Focus: Story = {
  args: {
    focus: true,
    checked: false,
  },
};

export const ErrorFocus: Story = {
  args: {
    focus: true,
    error: true,
    checked: false,
  },
};

export const Group: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, color: designSystemColors.neutral[900] }}>
        Radio Group
      </label>
      <RadioGroup defaultValue="a" {...args}>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
    </div>
  ),
  args: {
    children: undefined,
  },
};
