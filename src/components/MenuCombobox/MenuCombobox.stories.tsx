import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Title, Subtitle, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Figma } from "@storybook/addon-designs/blocks";
import { FolderOpen, ChevronDown, ChevronUp } from "lucide-react";
import { MenuCombobox } from ".";
import { EmptyState } from "../EmptyState";
import { Loading } from "../Loading";
import { Checkbox } from "../Checkbox";
import { DatePicker } from "../DatePicker";
import { Tooltip } from "../Tooltip";

const triggerFieldStyle: React.CSSProperties = {
  width: 240,
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

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4115-13286&m=dev";

const meta: Meta<typeof MenuCombobox> = {
  title: "Components/MenuCombobox",
  component: MenuCombobox,
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
Conjunto de primitivos visuais para construir o **conteúdo** de popups de **menu**, **dropdown** ou **combobox** (largura 240px). Não inclui o trigger nem o positioning — combine com \`Popover\`, \`Dropdown\` ou um menu posicionado manualmente.

### Sub-componentes

- \`MenuCombobox\` — container (240px, padding configurável via \`spacing\`).
- \`MenuCombobox.Item\` — entrada (\`size\` m/l, \`type\` default/destructive, \`state\` default/selected/disabled/loading, \`icon\`/\`rightIcon\`, \`label\`, \`description\`).
- \`MenuCombobox.GroupLabel\` — rótulo de seção (\`size\` controla fonte/cor; \`indented\` recua 40px).
- \`MenuCombobox.Search\` — input de busca embarcado.
- \`MenuCombobox.Overflow\` — chevron indicador de scroll (up/down).

> **Empty state** e **loading de menu** são compostos com os componentes \`EmptyState\` e \`Loading\` do próprio design system (ver stories abaixo).

### Como usar

\`\`\`tsx
import { MenuCombobox } from "@juscash/design-system";

<MenuCombobox spacing="none" aria-label="Ações">
  <MenuCombobox.Search placeholder="Procurar..." />
  <MenuCombobox.GroupLabel>Conta</MenuCombobox.GroupLabel>
  <MenuCombobox.Item icon="User" label="Meu perfil" />
  <MenuCombobox.Item icon="Settings" label="Configurações" state="selected" rightIcon="Check" />
  <MenuCombobox.Item icon="LogOut" type="destructive" label="Sair" />
</MenuCombobox>
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

const decorate = (children: React.ReactNode): React.ReactElement => (
  <div style={{ padding: 24, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>{children}</div>
);

type MenuOption = { label: string; icon?: string; type?: "default" | "destructive"; selected?: boolean };

type SearchableMenuProps = {
  options: MenuOption[];
  ariaLabel: string;
  placeholder?: string;
  groupLabel?: string;
  size?: "m" | "l";
  spacing?: "none" | "8" | "16" | "24";
  initialQuery?: string;
};

/**
 * Helper de story: MenuCombobox com busca FUNCIONAL. O texto digitado filtra os
 * itens em tempo real; clicar seleciona (check à direita); sem resultados, exibe
 * o empty state (mesma superfície do Figma). Usado pelas stories que demonstram
 * o "Procurar..." operando de verdade.
 */
function SearchableMenu(props: SearchableMenuProps): React.ReactElement {
  const { options, ariaLabel, placeholder = "Procurar...", groupLabel, size = "m", spacing = "none", initialQuery = "" } = props;
  const [query, setQuery] = React.useState(initialQuery);
  const [selected, setSelected] = React.useState<string | null>(options.find((o) => o.selected)?.label ?? null);
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <MenuCombobox spacing={spacing} aria-label={ariaLabel}>
      <MenuCombobox.Search size={size} placeholder={placeholder} value={query} onChange={setQuery} />
      {filtered.length === 0 ? (
        <EmptyState
          title="Nenhum resultado encontrado."
          icon={<FolderOpen size={24} strokeWidth={1.75} />}
          style={{ width: "100%", padding: 16, boxSizing: "border-box" }}
        />
      ) : (
        <>
          {groupLabel ? <MenuCombobox.GroupLabel size={size}>{groupLabel}</MenuCombobox.GroupLabel> : null}
          {filtered.map((option) => {
            const isSelected = selected === option.label;
            return (
              <MenuCombobox.Item
                key={option.label}
                size={size}
                label={option.label}
                icon={option.icon}
                type={option.type}
                state={isSelected ? "selected" : "default"}
                rightIcon={isSelected ? "Check" : undefined}
                onClick={() => setSelected(option.label)}
              />
            );
          })}
        </>
      )}
    </MenuCombobox>
  );
}

/**
 * Hook de story: seleção única dentro do menu. Retorna uma função que gera as
 * props de seleção de um item (estado `selected` = fundo neutral/200 + check à
 * direita, conforme Figma, mais o `onClick`), para os exemplos onde clicar uma
 * opção deve selecioná-la de verdade.
 */
function useSingleSelect(initial: string | null = null) {
  const [selected, setSelected] = React.useState<string | null>(initial);
  return (label: string) => ({
    label,
    state: selected === label ? ("selected" as const) : ("default" as const),
    rightIcon: selected === label ? "Check" : undefined,
    onClick: () => setSelected(label),
  });
}

/** Composição padrão (search FUNCIONAL + group label + itens), como na spec do Figma. */
export const Default: Story = {
  parameters: { docs: { description: { story: "Busca funcional: digitar filtra as opções; clicar seleciona; sem resultados, mostra o empty state." } } },
  render: () =>
    decorate(
      <SearchableMenu
        ariaLabel="Menu padrão"
        groupLabel="Group label"
        options={[{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }, { label: "Option 4" }]}
      />,
    ),
};

/** Variantes de `spacing` do container: none, 8, 16, 24. */
export const Spacing: Story = {
  parameters: { docs: { description: { story: "Padding interno do container: `none` (0), `8`, `16`, `24`." } } },
  render: () =>
    decorate(
      <>
        {(["none", "8", "16", "24"] as const).map((spacing) => (
          <MenuCombobox key={spacing} spacing={spacing} aria-label={`Spacing ${spacing}`}>
            <MenuCombobox.Item label={`spacing="${spacing}"`} />
          </MenuCombobox>
        ))}
      </>,
    ),
};

/** Item `size="m"` (min 32px) vs `size="l"` (min 36px). */
export const ItemSizes: Story = {
  parameters: { docs: { description: { story: "Tamanhos m (32px) e l (36px) do item." } } },
  render: () =>
    decorate(
      <>
        <MenuCombobox spacing="none" aria-label="Itens m">
          <MenuCombobox.GroupLabel size="m">Regular</MenuCombobox.GroupLabel>
          <MenuCombobox.Item size="m" label="Item m" />
          <MenuCombobox.Item size="m" icon="Star" label="Com ícone" />
        </MenuCombobox>
        <MenuCombobox spacing="none" aria-label="Itens l">
          <MenuCombobox.GroupLabel size="l">Large</MenuCombobox.GroupLabel>
          <MenuCombobox.Item size="l" label="Item l" />
          <MenuCombobox.Item size="l" icon="Star" label="Com ícone" />
        </MenuCombobox>
      </>,
    ),
};

/** Item `type="destructive"` (texto vermelho `feedback/red/900`, hover `red/50`). */
export const ItemDestructive: Story = {
  parameters: { docs: { description: { story: "Item destructive — ações como excluir/sair." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="none" aria-label="Destructive">
        <MenuCombobox.Item icon="Trash2" type="destructive" label="Excluir" />
        <MenuCombobox.Item icon="LogOut" type="destructive" label="Sair" />
      </MenuCombobox>,
    ),
};

/** Estados declarativos do item: default, selected (com check), disabled e loading. */
export const ItemStates: Story = {
  parameters: { docs: { description: { story: "Estados declarativos. Hover/active/focus são reais (CSS)." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="none" aria-label="Estados">
        <MenuCombobox.Item label="Default" />
        <MenuCombobox.Item label="Selecionado" state="selected" rightIcon="Check" />
        <MenuCombobox.Item label="Desabilitado" state="disabled" />
        <MenuCombobox.Item label="Carregando" state="loading" />
      </MenuCombobox>,
    ),
};

/** Group label: tamanho m (caption 10px soft) vs l (body 13px dark), e `indented`. Itens selecionáveis. */
export const GroupLabels: Story = {
  parameters: { docs: { description: { story: "Rótulo de seção (fonte/cor dependem do size; `indented` recua 40px). Clique numa opção para selecioná-la." } } },
  render: () => {
    const itemProps = useSingleSelect();
    return decorate(
      <MenuCombobox spacing="none" aria-label="Com grupos">
        <MenuCombobox.GroupLabel size="m">Group label (m)</MenuCombobox.GroupLabel>
        <MenuCombobox.Item {...itemProps("Option 1")} />
        <MenuCombobox.GroupLabel size="l">Group label (l)</MenuCombobox.GroupLabel>
        <MenuCombobox.Item {...itemProps("Option 2")} />
        <MenuCombobox.GroupLabel indented>Indented</MenuCombobox.GroupLabel>
        <MenuCombobox.Item {...itemProps("Option 3")} />
      </MenuCombobox>,
    );
  },
};

/** Item com 2ª linha (`description`, caption 10px) — composição "more option". Itens selecionáveis. */
export const WithDescription: Story = {
  parameters: { docs: { description: { story: "Itens com texto secundário (2ª linha). Clique para selecionar; o item desabilitado não responde." } } },
  render: () => {
    const itemProps = useSingleSelect("Mais opções");
    return decorate(
      <MenuCombobox spacing="none" aria-label="Com descrição">
        <MenuCombobox.GroupLabel>Group label</MenuCombobox.GroupLabel>
        <MenuCombobox.Item {...itemProps("Option 1")} description="Line 2" />
        <MenuCombobox.Item {...itemProps("Option 2")} description="Line 2" />
        <MenuCombobox.Item label="Option 3" description="Line 2" state="disabled" />
        <MenuCombobox.Item {...itemProps("Mais opções")} />
      </MenuCombobox>,
    );
  },
};

/** Search nos dois tamanhos: m (32px / input 13px) e l (36px / input 16px). Busca funcional. */
export const SearchSizes: Story = {
  parameters: { docs: { description: { story: "Tamanhos do search embarcado (busca funcional). m é o padrão usado em dropdowns." } } },
  render: () =>
    decorate(
      <>
        <SearchableMenu ariaLabel="Search m" size="m" placeholder="Procurar (m)..." options={[{ label: "Option 1" }, { label: "Option 2" }]} />
        <SearchableMenu ariaLabel="Search l" size="l" placeholder="Procurar (l)..." options={[{ label: "Option 1" }, { label: "Option 2" }]} />
      </>,
    ),
};

/** Indicadores de overflow (chevron up/down, 16px). Itens selecionáveis. */
export const Overflow: Story = {
  parameters: { docs: { description: { story: "Chevrons indicando scroll up/down. Clique numa opção para selecioná-la." } } },
  render: () => {
    const itemProps = useSingleSelect();
    return decorate(
      <MenuCombobox spacing="none" aria-label="Com overflow">
        <MenuCombobox.Overflow direction="up" />
        <MenuCombobox.Item {...itemProps("Option 5")} />
        <MenuCombobox.Item {...itemProps("Option 6")} />
        <MenuCombobox.Item {...itemProps("Option 7")} />
        <MenuCombobox.Overflow direction="down" />
      </MenuCombobox>,
    );
  },
};

/** Empty state ("Nenhum resultado encontrado.") composto com `EmptyState`. Busca funcional. */
export const EmptyResults: Story = {
  parameters: { docs: { description: { story: "Começa com uma busca sem resultados (reusa `EmptyState`). Limpe o campo para ver as opções." } } },
  render: () =>
    decorate(
      <SearchableMenu ariaLabel="Resultados" initialQuery="Option 12" options={[{ label: "Maçã" }, { label: "Banana" }, { label: "Laranja" }]} />,
    ),
};

/** Loading de menu (Figma 5065:12521): spinner de gradiente verde, 16px, reusando `Loading`. */
export const MenuLoading: Story = {
  parameters: { docs: { description: { story: "Carregamento do menu — anel de gradiente verde (16px) reusando o componente `Loading`." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="none" aria-label="Carregando">
        <Loading variant="spinner" size={16} style={{ width: "100%", justifyContent: "center", paddingBottom: 8 }} />
      </MenuCombobox>,
    ),
};

/** Multiselect: checkbox no slot de ícone (item `selected` = fundo neutral/200). */
export const CheckboxItems: Story = {
  parameters: { docs: { description: { story: "Padrão multiselect — clique alterna a seleção." } } },
  render: () => {
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    const [checked, setChecked] = React.useState<Record<string, boolean>>({ "Option 1": true });
    const toggle = (key: string): void => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
    return decorate(
      <MenuCombobox spacing="none" aria-label="Multiselect">
        <MenuCombobox.GroupLabel>Group label</MenuCombobox.GroupLabel>
        {options.map((option) => (
          <MenuCombobox.Item
            key={option}
            label={option}
            state={checked[option] ? "selected" : "default"}
            onClick={() => toggle(option)}
            icon={<Checkbox checked={Boolean(checked[option])} aria-label={option} style={{ pointerEvents: "none" }} />}
          />
        ))}
      </MenuCombobox>,
    );
  },
};

/** Busca interativa real: filtra os itens e mostra o empty state quando vazio. */
export const SearchableInteractive: Story = {
  parameters: { docs: { description: { story: "Comportamento real: o texto filtra os itens; sem resultados, mostra o empty state." } } },
  render: () => {
    const options = ["Maçã", "Banana", "Laranja", "Manga", "Abacaxi", "Uva"];
    const [query, setQuery] = React.useState("");
    const [selected, setSelected] = React.useState<string | null>(null);
    const filtered = options.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase()));
    return decorate(
      <MenuCombobox spacing="none" aria-label="Frutas">
        <MenuCombobox.Search placeholder="Procurar fruta..." value={query} onChange={setQuery} />
        {filtered.length === 0 ? (
          <EmptyState
            title="Nenhum resultado encontrado."
            icon={<FolderOpen size={24} strokeWidth={1.75} />}
            style={{ width: "100%", padding: 16, boxSizing: "border-box" }}
          />
        ) : (
          filtered.map((option) => (
            <MenuCombobox.Item
              key={option}
              label={option}
              state={selected === option ? "selected" : "default"}
              rightIcon={selected === option ? "Check" : undefined}
              onClick={() => setSelected(option)}
            />
          ))
        )}
      </MenuCombobox>,
    );
  },
};

/** Composição completa: search FUNCIONAL + groups + items + destructive + overflow. */
export const FullComposition: Story = {
  parameters: { docs: { description: { story: "Combina todos os sub-componentes; o search filtra os itens por seção e mostra o empty state quando vazio." } } },
  render: () => {
    const SECTIONS: { label: string; indented: boolean; items: MenuOption[] }[] = [
      {
        label: "Conta",
        indented: false,
        items: [
          { icon: "User", label: "Meu perfil" },
          { icon: "Settings", label: "Configurações", selected: true },
          { icon: "HelpCircle", label: "Ajuda" },
        ],
      },
      { label: "Sessão", indented: true, items: [{ icon: "LogOut", label: "Sair", type: "destructive" }] },
    ];
    const [query, setQuery] = React.useState("");
    const [selected, setSelected] = React.useState<string | null>(
      () => SECTIONS.flatMap((s) => s.items).find((i) => i.selected)?.label ?? null,
    );
    const q = query.trim().toLowerCase();
    const sections = SECTIONS.map((s) => ({ ...s, items: s.items.filter((i) => i.label.toLowerCase().includes(q)) })).filter(
      (s) => s.items.length > 0,
    );
    return decorate(
      <MenuCombobox spacing="none" aria-label="Composição completa">
        <MenuCombobox.Search placeholder="Procurar opção..." value={query} onChange={setQuery} />
        {sections.length === 0 ? (
          <EmptyState
            title="Nenhum resultado encontrado."
            icon={<FolderOpen size={24} strokeWidth={1.75} />}
            style={{ width: "100%", padding: 16, boxSizing: "border-box" }}
          />
        ) : (
          <>
            {sections.map((s) => (
              <React.Fragment key={s.label}>
                <MenuCombobox.GroupLabel indented={s.indented}>{s.label}</MenuCombobox.GroupLabel>
                {s.items.map((i) => (
                  <MenuCombobox.Item
                    key={i.label}
                    icon={i.icon}
                    label={i.label}
                    type={i.type}
                    state={selected === i.label ? "selected" : "default"}
                    rightIcon={selected === i.label ? "Check" : undefined}
                    onClick={() => setSelected(i.label)}
                  />
                ))}
              </React.Fragment>
            ))}
            <MenuCombobox.Overflow direction="down" />
          </>
        )}
      </MenuCombobox>,
    );
  },
};

/** Date picker hospedado no container do menu/combobox (seção "Date picker" do Figma). */
export const DatePickerInMenu: Story = {
  name: "DatePicker",
  parameters: {
    docs: {
      description: {
        story:
          "A página Menu/combobox documenta que o popup do DatePicker reutiliza a superfície do menu/combobox. Aqui o componente DatePicker (já existente) é exibido aberto dentro do container.",
      },
    },
  },
  render: () => {
    const hostRef = React.useRef<HTMLDivElement>(null);
    return decorate(
      <div className="ds-mc-datepicker-demo">
        <style>{`
          .ds-mc-datepicker-demo .ds-menu-combobox { width: 256px; }
          .ds-mc-datepicker-demo .ds-datepicker.ant-picker { display: none !important; }
          .ds-mc-datepicker-demo .ant-picker-dropdown {
            position: static !important;
            transform: none !important;
            inset: auto !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
            pointer-events: auto !important;
          }
          .ds-mc-datepicker-demo .ant-picker-panel-container {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: transparent !important;
          }
          .ds-mc-datepicker-demo .ant-picker-footer {
            border-top: none !important;
            padding: 0 16px 16px !important;
            min-width: auto !important;
          }
          .ds-mc-datepicker-demo .ant-picker-now-btn {
            display: block !important;
            width: 100% !important;
            box-sizing: border-box !important;
            text-align: center !important;
            min-height: 24px !important;
            padding: 4px 8px !important;
            border: 1px solid var(--color-border-regular) !important;
            border-radius: 4px !important;
            font-size: 10px !important;
            color: var(--color-text-dark) !important;
          }
        `}</style>
        <MenuCombobox spacing="none" aria-label="Date picker">
          <div ref={hostRef} style={{ width: "100%" }}>
            <DatePicker open getPopupContainer={() => hostRef.current ?? document.body} />
          </div>
        </MenuCombobox>
      </div>,
    );
  },
};

/** Direção: o menu pode abrir para baixo ou para cima conforme a posição do campo. */
export const Direction: Story = {
  parameters: { docs: { description: { story: "O menu abre para baixo ou para cima dependendo da posição do campo na tela." } } },
  render: () => {
    const itemPropsDown = useSingleSelect();
    const itemPropsUp = useSingleSelect();
    return decorate(
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={triggerFieldStyle}>
            <span>Abre para baixo</span>
            <ChevronDown size={16} />
          </div>
          <MenuCombobox spacing="none" aria-label="Abre para baixo">
            <MenuCombobox.Item {...itemPropsDown("Option 1")} />
            <MenuCombobox.Item {...itemPropsDown("Option 2")} />
            <MenuCombobox.Item {...itemPropsDown("Option 3")} />
          </MenuCombobox>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <MenuCombobox spacing="none" aria-label="Abre para cima">
            <MenuCombobox.Item {...itemPropsUp("Option 1")} />
            <MenuCombobox.Item {...itemPropsUp("Option 2")} />
            <MenuCombobox.Item {...itemPropsUp("Option 3")} />
          </MenuCombobox>
          <div style={triggerFieldStyle}>
            <span>Abre para cima</span>
            <ChevronUp size={16} />
          </div>
        </div>
      </div>,
    );
  },
};

/** Scroll: o menu se ajusta à altura disponível e rola quando há muitos itens. */
export const Scroll: Story = {
  parameters: { docs: { description: { story: "Com altura limitada, o menu rola internamente. Use Overflow para indicar mais itens." } } },
  render: () => {
    const itemProps = useSingleSelect();
    return decorate(
      <div className="ds-mc-scroll-demo">
        <style>{`.ds-mc-scroll-demo .ds-menu-combobox { max-height: 280px; overflow-y: auto; }`}</style>
        <MenuCombobox spacing="none" aria-label="Scroll" tabIndex={0}>
          {Array.from({ length: 16 }, (_, index) => (
            <MenuCombobox.Item key={index} {...itemProps(`Option ${index + 1}`)} />
          ))}
        </MenuCombobox>
      </div>,
    );
  },
};

/** Tooltip: um item pode exibir tooltip opcionalmente (passe o mouse sobre "Option 2"). */
export const WithTooltip: Story = {
  parameters: { docs: { description: { story: "Itens suportam tooltip opcional, reusando o componente Tooltip do design system." } } },
  render: () =>
    decorate(
      <MenuCombobox spacing="none" aria-label="Com tooltip">
        <MenuCombobox.Item label="Option 1" />
        <Tooltip title="Informação adicional sobre esta opção">
          <MenuCombobox.Item label="Option 2" rightIcon="Info" />
        </Tooltip>
        <MenuCombobox.Item label="Option 3" />
      </MenuCombobox>,
    ),
};

/** Playground com controles. */
export const Playground: Story = {
  args: {
    spacing: "none",
    "aria-label": "Playground",
  },
  argTypes: {
    spacing: {
      control: "select",
      options: ["none", "8", "16", "24"],
    },
  },
  render: (args) =>
    decorate(
      <SearchableMenu
        ariaLabel={(args["aria-label"] as string) ?? "Playground"}
        spacing={(args.spacing as SearchableMenuProps["spacing"]) ?? "none"}
        groupLabel="Group label"
        options={[
          { icon: "Star", label: "Option 1" },
          { icon: "Heart", label: "Option 2", selected: true },
          { icon: "Trash2", type: "destructive", label: "Excluir" },
        ]}
      />,
    ),
};
