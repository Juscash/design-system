import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
  Square as IconButton,
  ChevronRight as IconBreadcrumb,
  ToggleLeft as IconSegmented,
  Tags as IconTabs,
  Type as IconTypography,
  IdCard as IconAvatar,
  Menu as IconAvatarMenu,
  Tag as IconTag,
  CircleAlert as IconBadge,
  Table as IconTable,
  Image as IconCarousel,
  Loader as IconSkeleton,
  Inbox as IconEmptyState,
  MessageSquare as IconTooltip,
  MessageCircle as IconPopover,
  Edit3 as IconInput,
  FileText as IconTextArea,
  ChevronDown as IconSelect,
  Calendar as IconDatePicker,
  CalendarRange as IconRangePicker,
  CheckSquare as IconCheckbox,
  Circle as IconRadio,
  ToggleRight as IconSwitch,
  UploadCloud as IconUpload,
  CreditCard as IconCard,
  ChevronsDownUp as IconCollapse,
  LayoutPanelTop as IconPageHeader,
  AlertTriangle as IconAlert,
  Layers as IconModal,
  ShieldCheck as IconConfirmModal,
  PanelRightOpen as IconDrawer,
  Bell as IconNotification,
  Hourglass as IconLoading,
} from "lucide-react";
import { designSystemColors, spacing } from "../theme";

const FIGMA_URL = "https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash?node-id=4035-1030&m=dev";

type Category = {
  title: string;
  description: string;
  items: Array<{ name: string; description: string; icon: React.ComponentType<{ size?: number }> }>;
};

const categories: Category[] = [
  {
    title: "Geral",
    description: "Primitivos de ação.",
    items: [
      {
        name: "Button",
        description: "Botão de ação com variantes primary, secondary, outline, ghost, destructive.",
        icon: IconButton,
      },
    ],
  },
  {
    title: "Layout",
    description: "Estrutura e contêineres de conteúdo.",
    items: [
      { name: "Card", description: "Contêiner elevado para agrupar conteúdo.", icon: IconCard },
      { name: "Collapse", description: "Sanfona expansível para conteúdo agrupado.", icon: IconCollapse },
      {
        name: "PageHeader",
        description: "Cabeçalho de página com título, descrição opcional e slot de ações responsivo.",
        icon: IconPageHeader,
      },
    ],
  },
  {
    title: "Navegação",
    description: "Componentes para mover o usuário entre seções.",
    items: [
      { name: "Breadcrumb", description: "Trilha de navegação hierárquica.", icon: IconBreadcrumb },
      { name: "Tabs", description: "Abas para alternar entre vistas relacionadas.", icon: IconTabs },
      { name: "Segmented", description: "Controle segmentado de toggle/seleção exclusiva.", icon: IconSegmented },
      { name: "AvatarMenu", description: "Menu suspenso disparado por um avatar (perfil).", icon: IconAvatarMenu },
    ],
  },
  {
    title: "Entrada de dados",
    description: "Inputs e controles de formulário.",
    items: [
      { name: "Input", description: "Campo de texto de uma linha.", icon: IconInput },
      { name: "TextArea", description: "Campo de texto multilinha.", icon: IconTextArea },
      { name: "Select", description: "Lista suspensa de seleção única ou múltipla.", icon: IconSelect },
      { name: "DatePicker", description: "Seletor de data única.", icon: IconDatePicker },
      { name: "RangePicker", description: "Seletor de intervalo de datas.", icon: IconRangePicker },
      { name: "Checkbox", description: "Caixa de seleção booleana.", icon: IconCheckbox },
      { name: "Radio", description: "Botão de opção mutuamente exclusivo.", icon: IconRadio },
      { name: "Switch", description: "Interruptor de estado (on/off).", icon: IconSwitch },
      { name: "Upload", description: "Campo de upload de arquivos com drag-and-drop.", icon: IconUpload },
    ],
  },
  {
    title: "Exibição de dados",
    description: "Componentes que apresentam informação.",
    items: [
      { name: "Typography", description: "Escala tipográfica (heading 1–6, body 1–2, caption).", icon: IconTypography },
      { name: "Avatar", description: "Imagem circular ou iniciais para representar um usuário.", icon: IconAvatar },
      { name: "Badge", description: "Indicador numérico ou de estado em um elemento.", icon: IconBadge },
      { name: "Tag", description: "Etiqueta para categorizar ou marcar.", icon: IconTag },
      { name: "Table", description: "Tabela de dados com ordenação e paginação.", icon: IconTable },
      { name: "Tooltip", description: "Dica flutuante ao passar o cursor.", icon: IconTooltip },
      { name: "Popover", description: "Conteúdo flutuante disparado por clique.", icon: IconPopover },
      { name: "Carousel", description: "Slides em carrossel para mídia/banners.", icon: IconCarousel },
      { name: "Skeleton", description: "Placeholder de carregamento em forma de bloco.", icon: IconSkeleton },
      { name: "EmptyState", description: "Estado vazio com ilustração e CTA.", icon: IconEmptyState },
    ],
  },
  {
    title: "Feedback",
    description: "Mensagens, modais e indicadores assíncronos.",
    items: [
      { name: "Alert", description: "Banner persistente de informação, sucesso, alerta ou erro.", icon: IconAlert },
      { name: "Modal", description: "Diálogo modal sobreposto à página.", icon: IconModal },
      { name: "ConfirmModal", description: "Modal pronto para confirmações destrutivas/críticas.", icon: IconConfirmModal },
      { name: "Drawer", description: "Painel lateral deslizante para detalhes/edição.", icon: IconDrawer },
      { name: "Notification", description: "Toast efêmero no canto da tela.", icon: IconNotification },
      { name: "Loading", description: "Indicador de progresso em tela cheia ou local.", icon: IconLoading },
    ],
  },
];

const totalCount = categories.reduce((acc, c) => acc + c.items.length, 0);

const toStoryPath = (title: string): string => {
  const slug = title.toLowerCase().replace(/[/\s]+/g, "-");
  return `/?path=/docs/${encodeURIComponent(slug)}--docs`;
};

const meta: Meta = {
  title: "Components/Visão Geral",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: FIGMA_URL },
    docs: {
      description: {
        component: `Mapa dos **${totalCount} componentes** do **@juscash/design-system**, agrupados por finalidade. Cada componente é um wrapper sobre o equivalente do Ant Design 6 com identidade visual JusCash aplicada via \`ConfigProvider\` local e tokens das foundations.`,
      },
    },
  },
};

export default meta;

export const VisaoGeral: StoryObj = {
  name: "Visão geral",
  render: () => (
    <div
      className="ds-overview-components"
      style={{
        fontFamily: "Inter, sans-serif",
        padding: spacing[8],
        background: designSystemColors.background.grey,
        minHeight: "100vh",
      }}
    >
      <style>{`.ds-overview-components a, .ds-overview-components a:hover, .ds-overview-components a:visited { text-decoration: none !important; color: inherit !important; }`}</style>
      <header style={{ maxWidth: 1280, margin: "0 auto", marginBottom: spacing[10] }}>
        <h1
          style={{
            fontSize: 49,
            lineHeight: 1.2,
            fontWeight: 400,
            margin: 0,
            color: designSystemColors.text.dark,
          }}
        >
          Componentes
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.2,
            color: designSystemColors.text.soft,
            marginTop: spacing[4],
            maxWidth: 720,
          }}
        >
          {totalCount} componentes prontos, agrupados por finalidade. Use a barra lateral para abrir cada um e explorar variantes,
          props e exemplos.
        </p>
      </header>

      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: spacing[10] }}>
        {categories.map((category) => (
          <section key={category.title}>
            <header style={{ marginBottom: spacing[4] }}>
              <h2
                style={{
                  fontSize: 25,
                  fontWeight: 400,
                  lineHeight: 1.2,
                  margin: 0,
                  color: designSystemColors.text.dark,
                }}
              >
                {category.title}
              </h2>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.2,
                  color: designSystemColors.text.soft,
                  marginTop: spacing[2],
                  margin: 0,
                }}
              >
                {category.description}
              </p>
            </header>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: spacing[3],
              }}
            >
              {category.items.map(({ name, description, icon: Icon }) => (
                <a
                  key={name}
                  href={toStoryPath(`Components/${name}`)}
                  target="_top"
                  style={{
                    background: designSystemColors.background.white,
                    border: `1px solid ${designSystemColors.border.regular}`,
                    borderRadius: 12,
                    padding: spacing[5],
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing[3],
                    cursor: "pointer",
                    transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
                    height: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = designSystemColors.brand.secondary[400];
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = designSystemColors.border.regular;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: designSystemColors.brand.secondary[50],
                      color: designSystemColors.brand.secondary[700],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      lineHeight: 1.2,
                      margin: 0,
                      color: designSystemColors.text.dark,
                    }}
                  >
                    {name}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.2,
                      color: designSystemColors.text.soft,
                      margin: 0,
                    }}
                  >
                    {description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  ),
};
