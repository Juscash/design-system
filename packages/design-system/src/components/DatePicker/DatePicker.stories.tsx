import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker, RangePicker } from "./DatePicker";
import React from "react";

const meta: Meta<typeof DatePicker> = {
  title: "Components/Data Entry/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4066-8379&m=dev",
    },
    docs: {
      description: {
        component: `
Componente de seleção de data (DatePicker) e intervalo de datas (RangePicker).

### Features Juscash:
- **Ícones Customizados**: Uso de ícones Lucide (Chevron, Calendar).
- **Navegação**: Botões de navegação (anterior/próximo) estilizados com borda.
- **Locale**: Configurado para pt-BR com formato de mês completo.
- **Tema**: Cores customizadas para placeholder e estados ativos.

### Como usar:

\`\`\`tsx
import { DatePicker, RangePicker } from '@juscash/design-system';

function Example() {
  return (
    <>
      <DatePicker onChange={(date) => console.log(date)} />
      <RangePicker onChange={(dates) => console.log(dates)} />
    </>
  );
}
\`\`\`
`,
      },
    },
  },
};

export default meta;

type DatePickerStory = StoryObj<typeof DatePicker>;
type RangePickerStory = StoryObj<typeof RangePicker>;

export const Default: DatePickerStory = {
  render: () => <DatePicker />,
};

export const WithPlaceholder: DatePickerStory = {
  args: {
    placeholder: "Selecione uma data",
  },
};

export const Range: RangePickerStory = {
  render: () => <RangePicker />,
};

export const RangeWithPlaceholder: RangePickerStory = {
  render: () => <RangePicker placeholder={["Data inicial", "Data final"]} />,
};

export const FigmaExample: DatePickerStory = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo demonstrando DatePicker e RangePicker lado a lado.",
      },
    },
  },
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 24, width: 400 }}
    >
      <div>
        <label
          style={{
            display: "block",
            marginBottom: 8,
            fontFamily: "Inter",
            fontSize: 14,
          }}
        >
          Date Picker
        </label>
        <DatePicker style={{ width: "100%" }} />
      </div>
      <div>
        <label
          style={{
            display: "block",
            marginBottom: 8,
            fontFamily: "Inter",
            fontSize: 14,
          }}
        >
          Range Picker
        </label>
        <RangePicker style={{ width: "100%" }} />
      </div>
    </div>
  ),
};
