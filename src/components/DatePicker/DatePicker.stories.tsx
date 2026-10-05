import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { DatePicker } from ".";
import { CalendarHeader } from "./parts/CalendarHeader";
import type { CalendarFieldMode } from "../../types/components/DatePicker";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4066-8379&m=dev";

const SAMPLE_DATE = dayjs("2025-05-15");

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Seleção de data baseada no [Ant Design DatePicker](https://ant.design/components/date-picker). Embrulha o componente do Antd com a identidade JusCash: input editável, popup na superfície do \`MenuCombobox\`, células e header conforme o Figma.

### Props proprietárias
- **size** — \`xs\` (24) · \`s\` (32) · \`m\` (36, default) · \`l\` (40). Igual ao \`Input\`.
- **headerVariant** — header do calendário: \`year-and-month\` (default) · \`only-month\` · \`only-year\` · \`static\`. Ver a story **Header Variants**.
- **tooltip** — conteúdo do \`Tooltip\` do DS exibido no hover do input.
- **dateTooltip** — \`(date) => ReactNode\`: tooltip por dia (ex.: "Dia de pagamento"). Ver a story **Date Tooltips**.
- **showToday** — exibe o botão "Hoje" no rodapé do popup (default oculto).

Demais props (\`picker\`, \`format\`, \`disabled\`, \`disabledDate\`, \`allowClear\`, \`onChange\`, \`value\`/\`defaultValue\`…) são repassadas ao Antd.

### Como usar
\`\`\`tsx
import { DatePicker } from "@juscash/design-system";
import dayjs from "dayjs";

// Básico (controlado)
<DatePicker value={value} onChange={(date) => setValue(date)} />

// Tamanho + tipo de picker
<DatePicker size="s" picker="month" format="MM/YYYY" />

// Valor inicial + variação do header
<DatePicker defaultValue={dayjs("2025-05-15")} headerVariant="only-year" />

// Tooltip no input
<DatePicker tooltip="Selecione a data de início" />

// Tooltip por dia (substitui o title nativo)
<DatePicker
  dateTooltip={(date) => (date.date() === 10 ? "Dia de pagamento" : null)}
/>

// Botão "Hoje" no rodapé
<DatePicker showToday />
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
    picker: { control: "select", options: ["date", "week", "month", "quarter", "year"] },
    headerVariant: { control: "select", options: ["year-and-month", "only-month", "only-year", "static"] },
    disabled: { control: "boolean" },
    allowClear: { control: "boolean" },
    showToday: { control: "boolean" },
    inputReadOnly: { control: "boolean" },
    format: { control: "text" },
    placeholder: { control: "text" },
    tooltip: { control: "text", description: "Conteúdo do Tooltip do DS no hover do input." },
    // Props de objeto/função não são editáveis por controle (evita o
    // confuso "Definir objeto"); use no código — ver "Como usar" e a story
    // `DateTooltips` para o `dateTooltip` editável via texto.
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

type Story = StoryObj<typeof DatePicker>;

/** Estado padrão: input vazio com placeholder mascarado `__/__/____`. */
export const Default: Story = {};

/** Estado `value`: data preenchida (abra o calendário para ver a célula verde). */
export const WithValue: Story = {
  args: { defaultValue: SAMPLE_DATE },
};

/** Os quatro tamanhos do input (`xs`/`s`/`m`/`l`), alinhados ao `Input`. */
export const Sizes: Story = {
  parameters: { docs: { description: { story: "xs (24px) · s (32px) · m (36px, default) · l (40px)." } } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <DatePicker size="xs" />
      <DatePicker size="s" />
      <DatePicker size="m" />
      <DatePicker size="l" />
    </div>
  ),
};

/** Tipos de picker: dia, mês e ano (controle `picker`). */
export const PickerTypes: Story = {
  parameters: {
    docs: { description: { story: "Abra cada campo: dia (grade de dias), mês (grade de meses) e ano (grade de anos)." } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <DatePicker picker="date" placeholder="Dia" />
      <DatePicker picker="month" placeholder="Mês" format="MM/YYYY" />
      <DatePicker picker="year" placeholder="Ano" format="YYYY" />
    </div>
  ),
};

/** Input editável: digite a data no formato `DD/MM/AAAA` (parsing do Antd). */
export const Editable: Story = {
  parameters: { docs: { description: { story: "Clique e digite, por exemplo, `15/05/2025`." } } },
};

/** Datas anteriores a hoje desabilitadas — abra para ver as células `neutral-400`. */
export const DisabledDates: Story = {
  args: { disabledDate: (current) => current && current < dayjs().startOf("day") },
};

/** Campo desabilitado por inteiro. */
export const Disabled: Story = {
  args: { disabled: true, defaultValue: SAMPLE_DATE },
};

/** Com `allowClear`: exibe o botão de limpar quando há valor. */
export const AllowClear: Story = {
  args: { allowClear: true, defaultValue: SAMPLE_DATE },
};

/** Com o botão "Hoje" opcional no rodapé do popup (`showToday`). */
export const WithToday: Story = {
  args: { showToday: true },
  parameters: { docs: { description: { story: "Abra o calendário: o rodapé exibe o botão `Hoje`." } } },
};

/** Com `tooltip`: passe o mouse sobre o input para ver o Tooltip do DS. */
export const WithTooltip: Story = {
  args: { tooltip: "Selecione a data de início do período" },
};

type DateTooltipsArgs = React.ComponentProps<typeof DatePicker> & { tooltipText: string; tooltipDay: number };

/**
 * Tooltip por dia (`dateTooltip`). Como `dateTooltip` é uma função, não há
 * controle direto — então este exemplo expõe os args editáveis **tooltipText**
 * e **tooltipDay**: abra o calendário e passe o mouse sobre o dia escolhido
 * (dias passados mostram "Data já passou"). Substitui o `title` nativo do antd.
 */
export const DateTooltips: StoryObj<DateTooltipsArgs> = {
  args: { tooltipText: "Dia de pagamento", tooltipDay: 10 },
  argTypes: {
    tooltipText: { control: "text", description: "Texto do tooltip do dia destacado." },
    tooltipDay: { control: { type: "number", min: 1, max: 28 }, description: "Dia do mês que recebe o tooltip." },
  },
  render: ({ tooltipText, tooltipDay, ...args }) => (
    <DatePicker
      {...args}
      disabledDate={(current) => Boolean(current && current < dayjs().startOf("day"))}
      dateTooltip={(date) => {
        if (date < dayjs().startOf("day")) return "Data já passou";
        if (date.date() === tooltipDay) return tooltipText;
        return null;
      }}
    />
  ),
};

const HEADER_SURFACE: React.CSSProperties = {
  background: "var(--color-neutral-50)",
  border: "1px solid var(--color-neutral-300)",
  borderRadius: 8,
  boxShadow: "var(--shadow-m)",
  paddingBottom: 16,
};

/** Renderiza um `CalendarHeader` funcional (selects navegam) numa superfície de popup. */
function HeaderDemo({ monthField, yearField }: { monthField: CalendarFieldMode; yearField: "select" | "text" }): React.ReactElement {
  const [view, setView] = React.useState(dayjs("2025-06-01"));
  return (
    <div style={{ width: "100%", ...HEADER_SURFACE }}>
      <CalendarHeader value={view} onChange={setView} stepUnit="month" monthField={monthField} yearField={yearField} />
    </div>
  );
}

/** Mês/ano por extenso com inicial maiúscula (ex.: "Janeiro 2025"). */
function formatMonthYear(date: dayjs.Dayjs): string {
  const label = date.format("MMMM YYYY");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/** Header funcional "2 meses" (variação do RangePicker): as setas navegam os dois meses. */
function TwoMonthsHeader(): React.ReactElement {
  const [view, setView] = React.useState(dayjs("2025-01-01"));
  return (
    <div style={{ width: "100%", ...HEADER_SURFACE }}>
      <div className="ds-datepicker-header">
        <button
          type="button"
          className="ds-datepicker-navbtn ds-datepicker-navbtn--bordered"
          aria-label="Anterior"
          onClick={() => setView(view.subtract(1, "month"))}
        >
          <ChevronLeft size={16} />
        </button>
        <div style={{ display: "flex", gap: 48 }}>
          <span className="ds-datepicker-headertext">{formatMonthYear(view)}</span>
          <span className="ds-datepicker-headertext">{formatMonthYear(view.add(1, "month"))}</span>
        </div>
        <button
          type="button"
          className="ds-datepicker-navbtn ds-datepicker-navbtn--bordered"
          aria-label="Próximo"
          onClick={() => setView(view.add(1, "month"))}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/** Rótulo + exemplo, em coluna. */
function HeaderLabeled({ label, children }: { label: string; children: React.ReactNode }): React.ReactElement {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <code style={{ fontSize: 12 }}>{label}</code>
      {children}
    </div>
  );
}

/**
 * As 5 variações do header (Figma `.date picker / header` 4066:4959). As quatro
 * de calendário único são a prop `headerVariant` do DatePicker; "2 meses" é o
 * RangePicker. Os selects são funcionais — troque mês/ano ou use as setas.
 */
export const HeaderVariants: Story = {
  parameters: {
    docs: { description: { story: "Matriz das 5 variações do header. Selects e setas funcionam de verdade." } },
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      <HeaderLabeled label='1 mês — headerVariant="static"'>
        <HeaderDemo monthField="text" yearField="text" />
      </HeaderLabeled>
      <HeaderLabeled label="2 meses — RangePicker">
        <TwoMonthsHeader />
      </HeaderLabeled>
      <HeaderLabeled label='ano e mês — headerVariant="year-and-month" (default)'>
        <HeaderDemo monthField="select" yearField="select" />
      </HeaderLabeled>
      <HeaderLabeled label='apenas mês — headerVariant="only-month"'>
        <HeaderDemo monthField="select" yearField="text" />
      </HeaderLabeled>
      <HeaderLabeled label='apenas ano — headerVariant="only-year"'>
        <HeaderDemo monthField="text" yearField="select" />
      </HeaderLabeled>
    </div>
  ),
};

/** Playground controlado pelos `args`. */
export const Playground: Story = {
  args: { placeholder: "__/__/____" },
};
