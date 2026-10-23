import type { Key, ReactNode } from "react";
import type { TableProps as AntdTableProps } from "antd/es/table";

/**
 * Estratégia de responsividade do `Table`.
 *
 * - `scroll`: mantém o layout horizontal e habilita scroll horizontal interno
 *   quando a soma das colunas excede a largura do container. Consumidor define
 *   `scroll.x` para forçar a largura.
 * - `cards` (Figma Prospecção `5101:54788`): cada linha vira um cartão
 *   full-width com borda própria + radius `xl` + gap 8px entre cards.
 *   Cabeçalho some — cada célula expõe seu próprio rótulo (`data-label`)
 *   acima do valor. Coluna de seleção fica absoluta no canto superior
 *   direito do cartão; coluna de ações fica no rodapé. NÃO usa scroll
 *   horizontal.
 * - `auto` (default): usa `scroll` em viewports `≥ 768px` e automaticamente
 *   vira `cards` em viewports menores.
 * - `blocks`: alias deprecated de `cards` mantido para compatibilidade
 *   retrocedida. Use `cards` em código novo.
 */
export type TableResponsiveMode = "scroll" | "cards" | "auto" | "blocks";

/**
 * Configuração do estado vazio do `Table`. Quando `dataSource=[]`, o
 * componente exibe um placeholder centralizado.
 *
 * - Passar `ReactNode` rende o nó diretamente (controle total).
 * - Passar um objeto `{ title, description, icon }` renderiza o layout
 *   padrão do design system (ícone 24×24 num círculo 48×48, título Inter
 *   Bold 13px, descrição Inter Regular 13px).
 */
export type TableEmptyState =
  | ReactNode
  | {
      /** Título principal exibido em destaque. */
      title?: string;
      /** Descrição opcional abaixo do título. */
      description?: string;
      /**
       * Ícone customizado. Aceita `ReactNode` (ex.: `<MyIcon />`) ou o nome
       * de um ícone do `lucide-react` como string (ex.: `"Inbox"`). Quando
       * string, o componente é instanciado automaticamente com `size: 24`.
       * Default usa `Inbox` da `lucide-react`.
       */
      icon?: ReactNode | string;
    };

/**
 * Configuração da barra de bulk action exibida acima da tabela quando há
 * linhas selecionadas. Aparece apenas se `rowSelection.selectedRowKeys`
 * (controlled) tem comprimento > 0.
 */
export interface TableBulkActions {
  /**
   * Rótulo à esquerda — pode receber o `count` para customizar.
   * Default: `"{count} item(ns) selecionado(s)"`.
   */
  label?: (count: number) => ReactNode;
  /** Conteúdo do slot de ações (botões à direita). */
  actions: ReactNode;
}

/**
 * Configuração de skeleton (estado de carregamento). Quando definido,
 * substitui o spinner default do antd por N linhas placeholder.
 *
 * - `true` → 15 linhas com larguras alinhadas às colunas.
 * - `number` → N linhas.
 * - objeto → controle fino (quantidade e animação).
 */
export type TableSkeletonConfig =
  | boolean
  | number
  | {
      /** Quantidade de linhas placeholder. Default 15. */
      rows?: number;
      /** Se `true` (default), aplica pulse animation. */
      animated?: boolean;
    };

/**
 * Trio de ícones do estado de ordenação (column sorter). Permite ao
 * consumidor sobrescrever um ou todos. Cada estado recebe um nó completo
 * (ex.: `<ArrowUp size={16} />`).
 */
export interface TableSortIcons {
  /** Ícone exibido quando a coluna não está ordenada. Default `ChevronsUpDown`. */
  default?: ReactNode;
  /** Ícone exibido quando ordenada crescente. Default `ArrowUp`. */
  ascending?: ReactNode;
  /** Ícone exibido quando ordenada decrescente. Default `ArrowDown`. */
  descending?: ReactNode;
}

/**
 * Layout custom dos cartões em modo `responsive='cards'` (ou `'auto'` em
 * viewports `< 768 px`). Permite ao consumidor distribuir explicitamente as
 * colunas em três níveis: **header** (topo do card), **body** (corpo
 * empilhado de label/value) e **footer** (rodapé, geralmente ações).
 *
 * Conforme o Figma Prospecção (`5101:54788`): cada nível tem padding `4 8`,
 * separados por uma linha `1px` `color/border/regular` que toca as bordas
 * laterais do cartão. Body fields ficam stacked sem separadores internos.
 *
 * Exemplo:
 * ```tsx
 * <Table
 *   responsive="cards"
 *   cardLayout={{ header: "posicao", footer: "actions" }}
 *   ...
 * />
 * ```
 *
 * Defaults inteligentes (quando o objeto inteiro ou cada chave é omitida):
 * - `header`: vazio (só o checkbox de seleção, quando há `rowSelection`).
 * - `footer`: vazio (sem rodapé separado — todas as cells viram body).
 *
 * Quando uma key não bate com nenhuma `column.key`, ela é ignorada
 * silenciosamente (defensivo).
 */
export interface TableCardLayout {
  /**
   * Chave(s) de coluna a renderizar no nível header. Aceita uma única
   * `Key` ou um array de `Key`. As colunas são exibidas na ordem em que
   * aparecem em `columns` (não em `header`).
   */
  header?: Key | Key[];
  /**
   * Chave(s) de coluna a renderizar no nível footer. Aceita uma única
   * `Key` ou um array de `Key`. As colunas são exibidas na ordem em que
   * aparecem em `columns`.
   */
  footer?: Key | Key[];
}

export type TableProps<T> = AntdTableProps<T> & {
  /** Estratégia de responsividade. Default `'auto'` (cards em < 768 px, scroll em ≥ 768 px). */
  responsive?: TableResponsiveMode;
  /**
   * Breakpoint (em px) usado pelo modo `'auto'` para alternar entre `'scroll'`
   * e `'cards'`. Default `768` (breakpoint `s` do design system).
   */
  responsiveBreakpoint?: number;
  /**
   * Render customizado de cada cartão no modo `'cards'`/`'auto'`. Recebe o
   * `record` e o `index`. Quando ausente, monta um card padrão a partir das
   * `columns` (label da coluna acima do valor).
   */
  cardRender?: (record: T, index: number) => ReactNode;
  /**
   * Conteúdo customizado do estado vazio. Aceita um `ReactNode` ou um objeto
   * `{ title, description, icon }`. Quando ausente, usa `locale.emptyText`
   * default (texto simples).
   */
  emptyState?: TableEmptyState;
  /**
   * Barra de ações em lote exibida acima da tabela quando há linhas
   * selecionadas. Visível apenas se `rowSelection.selectedRowKeys` (modo
   * controlado) tem mais de 0 itens.
   */
  bulkActions?: TableBulkActions;
  /**
   * Skeleton substitui o spinner default. Aceita `true` (15 linhas) ou um
   * número (N linhas) ou objeto fino. Tem precedência sobre `loading` quando
   * truthy. Quando a paginação integrada está configurada (objeto
   * `pagination`), o footer de paginação permanece visível e navegável
   * durante o skeleton — apenas a tabela é substituída pelas barras.
   */
  skeleton?: TableSkeletonConfig;
  /**
   * Trio de ícones de ordenação customizado. Quando ausente, usa
   * `ChevronsUpDown` (default), `ArrowUp` (ascending), `ArrowDown`
   * (descending) da `lucide-react`.
   */
  sortIcons?: TableSortIcons;
  /**
   * Distribuição das colunas entre os níveis do card (header/body/footer)
   * quando o componente renderiza em modo `responsive='cards'` (ou
   * `responsive='auto'` em mobile). Veja `TableCardLayout` para detalhes
   * e defaults.
   */
  cardLayout?: TableCardLayout;
};
