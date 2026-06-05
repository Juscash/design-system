import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { ChevronDown, ChevronUp } from "lucide-react";
import { MenuCombobox } from ".";
import { Loading } from "../Loading";
import { DatePicker } from "../DatePicker";
import { Tooltip } from "../Tooltip";
import type { MenuComboboxOptionOrGroup, MenuComboboxValue } from ".";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4115-13286&m=dev";

const DEFAULT_FRAME_WIDTH = 240;

const triggerFieldStyle: React.CSSProperties = {
  width: DEFAULT_FRAME_WIDTH,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 12px",
  border: "1px solid var(--color-border-regular, #d4d4d4)",
  borderRadius: 8,
  background: "var(--color-neutral-50, #fafafa)",
  fontSize: 13,
  color: "var(--color-text-soft, #6d6d6e)",
  boxSizing: "border-box",
};

const meta: Meta<typeof MenuCombobox> = {
  title: "Components/MenuCombobox",
  component: MenuCombobox,
  tags: ["autodocs"],
  parameters: {
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      codePanel: true,
      description: {
        component: `
Conteúdo de popups de **menu**, **dropdown** ou **combobox** (largura 100% — preenche o trigger/popup). Não inclui o trigger nem o positioning — combine com \`Popover\`, \`Dropdown\` ou um menu posicionado manualmente.

Funciona em **dois modos**:

- **Data-driven** — passe \`options\`; o componente monta os itens, **filtra pela busca**, **gerencia a seleção** (\`value\`/\`onChange\`/\`multiple\`) e exibe o **empty state**.
- **Composição** — passe \`children\` (\`MenuCombobox.Item\`, \`.GroupLabel\`, \`.Search\`, \`.Overflow\`).

Em ambos os modos a **navegação por teclado** (↑/↓, Home/End, Enter/Space, Esc) e o **scroll com indicadores de overflow** (\`maxHeight\`) funcionam de verdade.

### Sub-componentes (modo composição)

- \`MenuCombobox\` — container (padding via \`spacing\`).
- \`MenuCombobox.Item\` — entrada (\`size\` m/l, \`type\` default/destructive, \`state\` default/selected/disabled/loading, \`icon\`/\`rightIcon\`, \`label\`, \`description\`).
- \`MenuCombobox.GroupLabel\` — rótulo de seção (\`size\`; \`indented\` recua 40px).
- \`MenuCombobox.Search\` — input de busca embarcado.
- \`MenuCombobox.Overflow\` — chevron indicador de scroll (up/down).

> **Empty state** e **loading** reusam os componentes \`EmptyState\` e \`Loading\` do design system.

### Como usar (data-driven)

\`\`\`tsx
import { MenuCombobox } from "@juscash/design-system";

<MenuCombobox
  aria-label="Ações"
  searchable
  value={value}
  onChange={setValue}
  options={[
    { groupLabel: "Conta", options: [
      { value: "profile", label: "Meu perfil", icon: "User" },
      { value: "settings", label: "Configurações", icon: "Settings" },
    ]},
    { value: "logout", label: "Sair", icon: "LogOut", type: "destructive" },
  ]}
/>
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
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>Figma Spec</h3>
            <Figma showLink url={FIGMA_URL} height="400px" />
          </div>
          <Stories />
        </>
      ),
    },
  },
};

export default meta;

type Story = StoryObj<typeof MenuCombobox>;

/** Wrapper que simula a largura de um trigger/popup (o container é 100%). */
const Frame = ({ children, width = DEFAULT_FRAME_WIDTH }: { children: React.ReactNode; width?: number }): React.ReactElement => (
  <div style={{ width }}>{children}</div>
);

const decorate = (children: React.ReactNode): React.ReactElement => (
  <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>{children}</div>
);

const BASIC_OPTIONS: MenuComboboxOptionOrGroup[] = [
  {
    groupLabel: "Group label",
    options: [
      { value: "option-1", label: "Option 1" },
      { value: "option-2", label: "Option 2" },
      { value: "option-3", label: "Option 3" },
      { value: "option-4", label: "Option 4" },
    ],
  },
];

const ICON_OPTIONS: MenuComboboxOptionOrGroup[] = [
  {
    groupLabel: "Conta",
    options: [
      { value: "profile", label: "Meu perfil", icon: "User" },
      { value: "settings", label: "Configurações", icon: "Settings" },
      { value: "help", label: "Ajuda", icon: "HelpCircle" },
    ],
  },
  { value: "logout", label: "Sair", icon: "LogOut", type: "destructive" },
];

const FRUIT_OPTIONS: MenuComboboxOptionOrGroup[] = [
  { value: "apple", label: "Maçã" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Laranja" },
  { value: "mango", label: "Manga" },
  { value: "pineapple", label: "Abacaxi" },
  { value: "grape", label: "Uva" },
];

const MANY_OPTIONS: MenuComboboxOptionOrGroup[] = Array.from({ length: 16 }, (_, index) => ({
  value: `option-${index + 1}`,
  label: `Option ${index + 1}`,
}));

/** Composição padrão data-driven: busca funcional + group label + itens + seleção. */
export const Default: Story = {
  parameters: { docs: { description: { story: "Modo data-driven: a busca filtra de verdade; clicar seleciona (check à direita); sem resultados, mostra o empty state." } } },
  render: () => {
    const [value, setValue] = React.useState<MenuComboboxValue>("option-2");
    return decorate(
      <Frame>
        <MenuCombobox aria-label="Menu padrão" searchable value={value} onChange={setValue} options={BASIC_OPTIONS} />
      </Frame>,
    );
  },
};

/** Variantes de `spacing` do container: none, 8, 16, 24. */
export const Spacing: Story = {
  parameters: { docs: { description: { story: "Padding interno do container: `none` (0), `8`, `16`, `24`." } } },
  render: () =>
    decorate(
      <>
        {(["none", "8", "16", "24"] as const).map((spacing) => (
          <Frame key={spacing}>
            <MenuCombobox spacing={spacing} aria-label={`Spacing ${spacing}`}>
              <MenuCombobox.Item label={`spacing="${spacing}"`} />
            </MenuCombobox>
          </Frame>
        ))}
      </>,
    ),
};

/** Item `size="m"` (min 32px) vs `size="l"` (min 36px). */
export const ItemSizes: Story = {
  parameters: { docs: { description: { story: "Tamanhos m (32px) e l (36px) do item. O ícone do l usa caixa 40×40 conforme o Figma." } } },
  render: () =>
    decorate(
      <>
        <Frame>
          <MenuCombobox spacing="none" aria-label="Itens m">
            <MenuCombobox.GroupLabel size="m">Regular</MenuCombobox.GroupLabel>
            <MenuCombobox.Item size="m" label="Item m" />
            <MenuCombobox.Item size="m" icon="Star" label="Com ícone" />
          </MenuCombobox>
        </Frame>
        <Frame>
          <MenuCombobox spacing="none" aria-label="Itens l">
            <MenuCombobox.GroupLabel size="l">Large</MenuCombobox.GroupLabel>
            <MenuCombobox.Item size="l" label="Item l" />
            <MenuCombobox.Item size="l" icon="Star" label="Com ícone" />
          </MenuCombobox>
        </Frame>
      </>,
    ),
};

/** Item `type="destructive"` (texto vermelho `feedback/red/900`, hover `red/50`). */
export const ItemDestructive: Story = {
  parameters: { docs: { description: { story: "Item destructive — ações como excluir/sair. Passe o mouse para ver o hover vermelho." } } },
  render: () =>
    decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Destructive">
          <MenuCombobox.Item icon="Trash2" type="destructive" label="Excluir" />
          <MenuCombobox.Item icon="LogOut" type="destructive" label="Sair" />
        </MenuCombobox>
      </Frame>,
    ),
};

/** Estados declarativos do item: default, selected (com check), disabled e loading. */
export const ItemStates: Story = {
  parameters: { docs: { description: { story: "Estados declarativos. Hover/active/focus são reais (CSS) — não são props." } } },
  render: () =>
    decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Estados">
          <MenuCombobox.Item label="Default" />
          <MenuCombobox.Item label="Selecionado" state="selected" rightIcon="Check" />
          <MenuCombobox.Item label="Desabilitado" state="disabled" />
          <MenuCombobox.Item label="Carregando" state="loading" />
        </MenuCombobox>
      </Frame>,
    ),
};

/** Group label: m (caption 10px soft) vs l (body 13px dark), e `indented` (recuo 40px). */
export const GroupLabels: Story = {
  parameters: { docs: { description: { story: "Rótulo de seção (fonte/cor dependem do size; `indented` recua 40px para alinhar com itens que têm ícone). Clicar em um item o seleciona (fundo neutral/200 + check à direita)." } } },
  render: () => {
    const [selected, setSelected] = React.useState<string>("option-1");
    const make = (value: string) => ({
      state: selected === value ? ("selected" as const) : ("default" as const),
      rightIcon: selected === value ? "Check" : undefined,
      onClick: () => setSelected(value),
    });
    return decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Com grupos">
          <MenuCombobox.GroupLabel size="m">Group label (m)</MenuCombobox.GroupLabel>
          <MenuCombobox.Item label="Option 1" {...make("option-1")} />
          <MenuCombobox.GroupLabel size="l">Group label (l)</MenuCombobox.GroupLabel>
          <MenuCombobox.Item label="Option 2" {...make("option-2")} />
          <MenuCombobox.GroupLabel indented>Indented</MenuCombobox.GroupLabel>
          <MenuCombobox.Item label="Option 3" {...make("option-3")} />
        </MenuCombobox>
      </Frame>,
    );
  },
};

/** Item com 2ª linha (`description`, caption 10px) — composição "more option". */
export const WithDescription: Story = {
  parameters: { docs: { description: { story: "Itens com texto secundário (2ª linha). Clicar seleciona (fundo neutral/200 + check); o item desabilitado não responde a clique." } } },
  render: () => {
    const [selected, setSelected] = React.useState<string>("option-1");
    const make = (value: string) => ({
      state: selected === value ? ("selected" as const) : ("default" as const),
      rightIcon: selected === value ? "Check" : undefined,
      onClick: () => setSelected(value),
    });
    return decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Com descrição">
          <MenuCombobox.GroupLabel>Group label</MenuCombobox.GroupLabel>
          <MenuCombobox.Item label="Option 1" description="Line 2" {...make("option-1")} />
          <MenuCombobox.Item label="Option 2" description="Line 2" {...make("option-2")} />
          <MenuCombobox.Item label="Option 3" description="Line 2" state="disabled" />
        </MenuCombobox>
      </Frame>,
    );
  },
};

/** Search nos dois tamanhos: m (32px / input 13px) e l (36px / input 16px). Busca funcional. */
export const SearchSizes: Story = {
  parameters: { docs: { description: { story: "Tamanhos do search embarcado (busca funcional). m é o padrão usado em dropdowns." } } },
  render: () =>
    decorate(
      <>
        <Frame>
          <MenuCombobox aria-label="Search m" size="m" searchable searchPlaceholder="Procurar (m)..." options={BASIC_OPTIONS} />
        </Frame>
        <Frame>
          <MenuCombobox aria-label="Search l" size="l" searchable searchPlaceholder="Procurar (l)..." options={BASIC_OPTIONS} />
        </Frame>
      </>,
    ),
};

/** Indicadores de overflow (chevron up/down, 16px) — primitivo estático. A versão funcional está na story Scroll. */
export const Overflow: Story = {
  parameters: { docs: { description: { story: "Chevrons indicando scroll up/down. Estático aqui; clicável + scroll real na story **Scroll**." } } },
  render: () =>
    decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Com overflow">
          <MenuCombobox.Overflow direction="up" />
          <MenuCombobox.Item label="Option 5" />
          <MenuCombobox.Item label="Option 6" />
          <MenuCombobox.Item label="Option 7" />
          <MenuCombobox.Overflow direction="down" />
        </MenuCombobox>
      </Frame>,
    ),
};

/** Empty state ("Nenhum resultado encontrado.") — reusa `EmptyState`, disparado pela busca sem resultados. */
export const EmptyResults: Story = {
  parameters: { docs: { description: { story: "Começa com uma busca sem resultados (reusa `EmptyState`). Limpe o campo para ver as opções voltarem." } } },
  render: () => {
    const Demo = (): React.ReactElement => {
      const ref = React.useRef<HTMLDivElement>(null);
      React.useEffect(() => {
        const input = ref.current?.querySelector("input");
        if (input) {
          (input as HTMLInputElement).value = "xyz";
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }, []);
      return (
        <div ref={ref}>
          <MenuCombobox aria-label="Resultados" searchable searchPlaceholder="Tente 'Maçã'..." options={FRUIT_OPTIONS} />
        </div>
      );
    };
    return decorate(
      <Frame>
        <Demo />
      </Frame>,
    );
  },
};

/** Loading de menu: spinner de gradiente verde, 16px, reusando `Loading`. */
export const MenuLoading: Story = {
  parameters: { docs: { description: { story: "Carregamento do menu — anel de gradiente verde (16px) reusando o componente `Loading`." } } },
  render: () =>
    decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Carregando">
          <Loading variant="spinner" size={16} style={{ width: "100%", justifyContent: "center", paddingBottom: 8 }} />
        </MenuCombobox>
      </Frame>,
    ),
};

/** Multiselect data-driven: checkbox no slot de ícone (item `selected` = fundo neutral/200). */
export const MultiSelect: Story = {
  parameters: { docs: { description: { story: "`multiple` — clique alterna a seleção; o checkbox aparece no slot do ícone e o fundo fica neutral/200." } } },
  render: () => {
    const [value, setValue] = React.useState<MenuComboboxValue>(["option-1"]);
    return decorate(
      <Frame>
        <MenuCombobox aria-label="Multiselect" multiple value={value} onChange={setValue} options={BASIC_OPTIONS} />
      </Frame>,
    );
  },
};

/** Modo data-driven completo: grupos, ícones, item destructive, seleção controlada com check. */
export const DataDriven: Story = {
  parameters: { docs: { description: { story: "A prop `options` monta tudo: grupos, ícones, destructive e seleção (single, controlada)." } } },
  render: () => {
    const [value, setValue] = React.useState<MenuComboboxValue>("settings");
    return decorate(
      <Frame>
        <MenuCombobox aria-label="Conta" value={value} onChange={setValue} options={ICON_OPTIONS} />
      </Frame>,
    );
  },
};

/** Busca filtrando de verdade + empty state ao não encontrar nada. */
export const SearchableInteractive: Story = {
  parameters: { docs: { description: { story: "Digite para filtrar; sem resultados aparece o empty state; limpe para restaurar." } } },
  render: () => {
    const [value, setValue] = React.useState<MenuComboboxValue>(null);
    return decorate(
      <Frame>
        <MenuCombobox aria-label="Frutas" searchable searchPlaceholder="Procurar fruta..." value={value} onChange={setValue} options={FRUIT_OPTIONS} />
      </Frame>,
    );
  },
};

/** Scroll real: `maxHeight` ativa o scroll e os indicadores de overflow clicáveis (sobem/descem a lista). */
export const Scroll: Story = {
  parameters: { docs: { description: { story: "Com `maxHeight`, a lista rola internamente; os chevrons aparecem conforme a posição e, ao clicar, rolam a lista. Roda do mouse e setas ↑/↓ também rolam." } } },
  render: () => {
    const [value, setValue] = React.useState<MenuComboboxValue>(null);
    return decorate(
      <Frame>
        <MenuCombobox aria-label="Scroll" value={value} onChange={setValue} options={MANY_OPTIONS} maxHeight={240} />
      </Frame>,
    );
  },
};

/** Composição completa: search + groups + items + destructive + overflow num único menu manual. */
export const FullComposition: Story = {
  parameters: { docs: { description: { story: "Modo composição: combina todos os sub-componentes manualmente. Para listas dinâmicas prefira o modo data-driven (`options`)." } } },
  render: () => {
    const [selected, setSelected] = React.useState<string>("settings");
    const make = (value: string) => ({
      state: selected === value ? ("selected" as const) : ("default" as const),
      rightIcon: selected === value ? "Check" : undefined,
      onClick: () => setSelected(value),
    });
    return decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Composição completa">
          <MenuCombobox.Search placeholder="Procurar opção..." />
          <MenuCombobox.GroupLabel>Conta</MenuCombobox.GroupLabel>
          <MenuCombobox.Item icon="User" label="Meu perfil" {...make("profile")} />
          <MenuCombobox.Item icon="Settings" label="Configurações" {...make("settings")} />
          <MenuCombobox.GroupLabel indented>Sessão</MenuCombobox.GroupLabel>
          <MenuCombobox.Item icon="LogOut" type="destructive" label="Sair" {...make("logout")} />
        </MenuCombobox>
      </Frame>,
    );
  },
};

/** Navegação por teclado real: Tab entra no menu e ↑/↓, Home/End movem o foco; Enter/Space ativam; Esc sai. */
export const KeyboardNavigation: Story = {
  parameters: { docs: { description: { story: "Clique em \"Focar menu\" ou pressione Tab até o menu, então use ↑/↓, Home/End, Enter/Space e Esc. O anel de foco é real." } } },
  render: () => {
    const [value, setValue] = React.useState<MenuComboboxValue>(null);
    return decorate(
      <Frame>
        <MenuCombobox aria-label="Navegável por teclado" value={value} onChange={setValue} options={MANY_OPTIONS} maxHeight={240} />
      </Frame>,
    );
  },
};

/** Hover real: passe o mouse sobre os itens para ver o fundo neutral/200 (CSS `:hover`). */
export const Hover: Story = {
  parameters: { docs: { description: { story: "Hover é real (CSS). Passe o mouse sobre os itens — não há estado forçado." } } },
  render: () =>
    decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Hover">
          <MenuCombobox.Item icon="Star" label="Passe o mouse aqui" />
          <MenuCombobox.Item icon="Heart" label="E aqui" />
          <MenuCombobox.Item icon="Trash2" type="destructive" label="Hover vermelho" />
        </MenuCombobox>
      </Frame>,
    ),
};

/** Tooltip: um item pode exibir tooltip ao passar o mouse, reusando o `Tooltip` do design system. */
export const WithTooltip: Story = {
  parameters: { docs: { description: { story: "Itens suportam tooltip opcional via composição com o `Tooltip` do design system (passe o mouse sobre \"Option 2\")." } } },
  render: () =>
    decorate(
      <Frame>
        <MenuCombobox spacing="none" aria-label="Com tooltip">
          <MenuCombobox.Item label="Option 1" />
          <Tooltip title="Informação adicional sobre esta opção">
            <MenuCombobox.Item label="Option 2" rightIcon="Info" />
          </Tooltip>
          <MenuCombobox.Item label="Option 3" />
        </MenuCombobox>
      </Frame>,
    ),
};

/** Date picker hospedado no container do menu/combobox (seção "Date picker" do Figma, 256px). */
export const DatePickerInMenu: Story = {
  name: "DatePicker",
  parameters: {
    docs: { description: { story: "O popup do DatePicker reutiliza a superfície do menu/combobox (256px no Figma). Aqui o DatePicker é exibido aberto dentro do container." } },
  },
  render: () => {
    const hostRef = React.useRef<HTMLDivElement>(null);
    return decorate(
      <div className="ds-mc-datepicker-demo">
        <style>{`
          .ds-mc-datepicker-demo .ds-datepicker.ant-picker { display: none !important; }
          .ds-mc-datepicker-demo .ant-picker-dropdown {
            position: static !important; transform: none !important; inset: auto !important;
            width: 100% !important; pointer-events: auto !important;
          }
          .ds-mc-datepicker-demo .ant-picker-panel-container {
            border: none !important; box-shadow: none !important; border-radius: 0 !important; background: transparent !important;
          }
          .ds-mc-datepicker-demo .ant-picker-footer { border-top: none !important; padding: 0 16px 16px !important; min-width: auto !important; }
        `}</style>
        <Frame width={256}>
          <MenuCombobox spacing="none" aria-label="Date picker">
            <div ref={hostRef} style={{ width: "100%" }}>
              <DatePicker open getPopupContainer={() => hostRef.current ?? document.body} />
            </div>
          </MenuCombobox>
        </Frame>
      </div>,
    );
  },
};

/** Direção: o menu pode abrir para baixo ou para cima conforme a posição do campo. */
export const Direction: Story = {
  parameters: { docs: { description: { story: "O menu abre para baixo ou para cima dependendo da posição do campo na tela." } } },
  render: () => {
    const [down, setDown] = React.useState<MenuComboboxValue>(null);
    const [up, setUp] = React.useState<MenuComboboxValue>(null);
    return decorate(
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={triggerFieldStyle}>
            <span>Abre para baixo</span>
            <ChevronDown size={16} />
          </div>
          <Frame>
            <MenuCombobox aria-label="Abre para baixo" value={down} onChange={setDown} options={BASIC_OPTIONS} />
          </Frame>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Frame>
            <MenuCombobox aria-label="Abre para cima" value={up} onChange={setUp} options={BASIC_OPTIONS} />
          </Frame>
          <div style={triggerFieldStyle}>
            <span>Abre para cima</span>
            <ChevronUp size={16} />
          </div>
        </div>
      </div>,
    );
  },
};

/** Playground com controles (modo data-driven). */
export const Playground: Story = {
  args: {
    spacing: "none",
    size: "m",
    searchable: true,
    multiple: false,
    "aria-label": "Playground",
  },
  argTypes: {
    spacing: { control: "select", options: ["none", "8", "16", "24"] },
    size: { control: "inline-radio", options: ["m", "l"] },
    searchable: { control: "boolean" },
    multiple: { control: "boolean" },
    maxHeight: { control: "number" },
  },
  render: (args) => {
    const [value, setValue] = React.useState<MenuComboboxValue>(null);
    return decorate(
      <Frame>
        <MenuCombobox {...args} value={value} onChange={setValue} options={ICON_OPTIONS} />
      </Frame>,
    );
  },
};
