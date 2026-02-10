# 04. FUNDAMENTOS (DESIGN TOKENS)

Esta seção documenta as bases visuais do Design System. Estes tokens garantem a consistência visual em todos os produtos da Juscash.

## 4.1 Figma (Fonte da Verdade Visual)

O Figma é a referência absoluta de design. Se houver divergência entre o código e o Figma, o código deve ser atualizado para refletir o design.

- **Link da Biblioteca**: [Design System Juscash (Figma)](https://www.figma.com/design/T99YkskqvWdGJbiYI3f7VZ/Design-System-Juscash)

---

## 4.2 Design Tokens

No código, os tokens estão centralizados em `src/theme/foundations`. Eles são mapeados automaticamente para o `ConfigProvider` do Ant Design.

### Cores (`colors.ts`)

Definimos uma paleta semântica para garantir acessibilidade e harmonia.

| Categoria   | Descrição       | Uso Principal                                    |
| :---------- | :-------------- | :----------------------------------------------- |
| **Primary** | Cor da Marca    | Botões primários, links ativos, estados de foco. |
| **Neutral** | Tons de cinza   | Textos, bordas, fundos de superfície.            |
| **Success** | Verde           | Mensagens de sucesso, confirmação.               |
| **Warning** | Laranja/Amarelo | Alertas, atenção.                                |
| **Error**   | Vermelho        | Mensagens de erro, ações destrutivas.            |

### Espaçamento (`spacing.ts`)

Utilizamos uma escala baseada em múltiplos de 4px para margens e paddings.

| Token | Valor | Exemplo de Uso                          |
| :---- | :---- | :-------------------------------------- |
| `xs`  | 4px   | Pequenos ajustes, gap de ícones.        |
| `sm`  | 8px   | Gap entre elementos relacionados.       |
| `md`  | 16px  | Padding padrão de cards, gap de seções. |
| `lg`  | 24px  | Margens externas moderadas.             |
| `xl`  | 32px  | Separação de grandes blocos.            |
| `xxl` | 48px  | Espaçamento de layout macro.            |

### Breakpoints (Responsividade)

Pontos de quebra padrão para grid e media queries (`breakpoints.ts`).

- **xs**: < 576px (Mobile Portrait)
- **sm**: ≥ 576px (Mobile Landscape)
- **md**: ≥ 768px (Tablet Portrait)
- **lg**: ≥ 992px (Tablet Desktop/Netbook)
- **xl**: ≥ 1200px (Desktop padrão)
- **xxl**: ≥ 1600px (Monitores ultrawide)

### Outros Tokens

- **Radius (`radius.ts`)**: Arredondamento de bordas (ex: botões, cards, inputs).
- **Shadow (`shadow.ts`)**: Níveis de elevação (profundidade) para modais, dropdowns e cards.

---

## 4.3 Ícones

Utilizamos a biblioteca **Lucide React** como padrão único de ícones. Ela é re-exportada pelo pacote para garantir que todos usem a mesma versão.

**Link Oficial**: [Lucide Icons Library](https://lucide.dev/icons/) (Consulte aqui os nomes dos ícones).

### Como Usar

Importe `LucideIcons` do design-system e acesse o ícone desejado:

```tsx
import { LucideIcons, Button } from "@juscash/design-system";

export const MeuComponente = () => <Button icon={<LucideIcons.Search size={16} />}>Buscar</Button>;
```

---

## 4.4 Tema e ConfigProvider

Todos os tokens acima não precisam ser importados manualmente arquivo por arquivo.
O componente `JuscashProvider` (visto na seção de Setup) já injeta esses valores no `ConfigProvider` do Ant Design.

Isso significa que ao usar um `<Button type="primary">`, ele automaticamente pegará a **Cor Primária** definida em `colors.ts` e o **Radius** definido em `radius.ts`.

---

[Anterior: Getting Started](./03-GETTING-STARTED.md) | [Índice](./README.md) | [Próximo: Componentes](./05-COMPONENTES.md)
