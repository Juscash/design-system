# 05. BIBLIOTECA DE COMPONENTES

O Design System oferece um conjunto robusto de componentes prontos para uso. Este documento apresenta uma visão geral do que está disponível nas principais categorias.

> **⚠️ Atenção**: Esta página é um catálogo de referência rápida.
> Para ver **exemplos de código, propriedades (props) e variantes visuais**, acesse sempre o **Storybook**.

[**👉 Acessar Storybook da Biblioteca**](https://Juscash.github.io/design-system/)

---

## 5.1 Categorias Principais

### Ações

Componentes para o usuário disparar eventos, navegar ou alternar estados.

- **Button**: Botões principais (Primary, Ghost, Danger, Link).
- **FloatButton**: Botão flutuante para ações globais.
- **Switch**: Alternador (toggle) liga/desliga.
- **Radio**: Seleção única em lista.
- **Dropdown**: Menu de ações contextual.

### Navegação

Elementos que orientam a localização e o fluxo do usuário.

- **Breadcrumb**: Caminho de pão (Home / Clientes / Detalhe).
- **PageHeader**: Cabeçalho padrão de páginas (Título + Ações + Breadcrumb).
- **Menu**: Menu lateral ou topo.
- **Tabs**: Abas de conteúdo.
- **Pagination**: Paginação de tabelas e listas.
- **Steps**: Indicador de progresso em etapas.

### Entrada de Dados (Data Entry)

Formulários e inputs controlados.

- **Input / TextArea**: Campos de texto.
- **NumberInput**: Campos numéricos com validação monetária/decimal.
- **Select / TreeSelect**: Seletores de opções.
- **DatePicker / RangePicker**: Seleção de datas e períodos.
- **Checkbox**: Múltipla escolha.
- **Upload**: Upload de arquivos.
- **Form**: Wrapper para controle de estado e validação (React Hook Form ou AntD Form).

### Exibição de Dados (Data Display)

Componentes para apresentar informações de forma estruturada.

- **Table**: Tabelas complexas com ordenação e filtro.
- **Card**: Container básico de conteúdo.
- **List**: Listas simples.
- **Avatar**: Imagens de perfil ou iniciais.
- **Tag / Badge**: Etiquetas e contadores.
- **Tooltip / Popover**: Informações flutuantes ao passar o mouse/clicar.
- **Carousel**: Slideshow de conteúdo.
- **Typography**: Títulos e textos padronizados.

### Feedback

Elementos de resposta ao usuário.

- **Alert**: Mensagens fixas de aviso/erro.
- **Modal / Drawer**: Diálogos sobrepostos e painéis laterais.
- **Notification**: Toasts temporários.
- **Popconfirm**: Confirmação rápida ("Tem certeza?").
- **Spin / Skeleton**: Indicadores de carregamento.

### Layout

Estrutura da página.

- **Grid (Row / Col)**: Sistema de colunas (12 ou 24).
- **Flex**: Container flexbox facilitado.
- **Space**: Espaçamento uniforme entre elementos.
- **Divider**: Linhas divisórias.

---

## 5.2 Componentes Proprietários (Destaque)

Além da base Ant Design, possuímos componentes exclusivos para regras de negócio Juscash:

- **JuscashProvider**: (Obrigatório) Contexto global de tema.
- **PageHeader**: Padronização visual para o topo de todas as páginas admin.
- **ConfirmModal**: Wrapper simplificado para modais de confirmação padrão.

---
