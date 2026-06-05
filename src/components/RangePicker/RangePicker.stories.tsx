import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import dayjs from "dayjs";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { RangePicker } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4066-8379&m=dev";

const SAMPLE_RANGE: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs("2025-05-15"), dayjs("2025-06-08")];

const meta: Meta<typeof RangePicker> = {
  title: "Components/RangePicker",
  component: RangePicker,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Seleção de intervalo baseada no \`DatePicker.RangePicker\` do [Ant Design](https://ant.design/components/date-picker). Reusa os tokens, o popup (2 meses) e os estilos do \`DatePicker\` do design system. Os extremos do intervalo ficam verdes; o miolo, cinza.

### Props proprietárias
- **size** — \`xs\` (24) · \`s\` (32) · \`m\` (36, default) · \`l\` (40).
- **tooltip** — conteúdo do \`Tooltip\` do DS exibido no hover do input.

Demais props (\`format\`, \`disabled\`, \`disabledDate\`, \`allowClear\`, \`onChange\`, \`value\`/\`defaultValue\`…) são repassadas ao Antd.

### Como usar
\`\`\`tsx
import { RangePicker } from "@juscash/design-system";

<RangePicker onChange={(dates) => console.log(dates)} />
<RangePicker size="s" placeholder={["De", "Até"]} />
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>🎨 Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "s", "m", "l"] },
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    showToday: { control: "boolean" },
    inputReadOnly: { control: "boolean" },
    format: { control: "text" },
    tooltip: { control: "text", description: "Conteúdo do Tooltip do DS no hover do input." },
    placeholder: { control: "object", description: 'Array [início, fim] — ex.: ["Data inicial", "Data final"].' },
    // Props de objeto/função não editáveis por controle (use no código).
    value: { control: false },
    defaultValue: { control: false },
    onChange: { control: false },
    disabledDate: { control: false },
    dateTooltip: { control: false },
    cellRender: { control: false },
  },
  args: { size: "m" },
};

export default meta;

type Story = StoryObj<typeof RangePicker>;

/** Estado padrão: dois campos (`Data inicial` / `Data final`) separados por `-`. */
export const Default: Story = {};

/** Estado `value`: intervalo preenchido (abra para ver extremos verdes + miolo cinza). */
export const WithValue: Story = {
  args: { defaultValue: SAMPLE_RANGE },
};

/** Os quatro tamanhos do input. */
export const Sizes: Story = {
  parameters: { docs: { description: { story: "xs (24px) · s (32px) · m (36px, default) · l (40px)." } } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <RangePicker size="xs" />
      <RangePicker size="s" />
      <RangePicker size="m" />
      <RangePicker size="l" />
    </div>
  ),
};

/** Placeholders customizados. */
export const CustomPlaceholder: Story = {
  args: { placeholder: ["De", "Até"] },
};

/** Campo desabilitado por inteiro. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: SAMPLE_RANGE },
};

/** Com `allowClear`: exibe o botão de limpar quando há valor. */
export const AllowClear: Story = {
  args: { allowClear: true, defaultValue: SAMPLE_RANGE },
};

/** Com `tooltip`: passe o mouse sobre o input para ver o Tooltip do DS. */
export const WithTooltip: Story = {
  args: { tooltip: "Selecione o período" },
};

/** Com o botão "Hoje" opcional no rodapé do popup (`showToday`). */
export const WithToday: Story = {
  args: { showToday: true },
  parameters: { docs: { description: { story: "Abra o calendário: o rodapé exibe o botão `Hoje`." } } },
};

/**
 * Tooltip por dia (`dateTooltip`): abra o calendario e passe o mouse sobre os
 * dias — passados mostram "Data ja passou"; o dia 10, "Dia de pagamento".
 */
export const DateTooltips: Story = {
  args: {
    disabledDate: (current) => Boolean(current && current < dayjs().startOf("day")),
    dateTooltip: (date) => {
      if (date < dayjs().startOf("day")) return "Data já passou";
      if (date.date() === 10) return "Dia de pagamento";
      return null;
    },
  },
};

/** Playground controlado pelos `args`. */
export const Playground: Story = {
  args: { placeholder: ["Data inicial", "Data final"] },
};
