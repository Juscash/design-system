// Declarações ambient para imports usados em arquivos de configuração do
// Storybook (`.storybook/`) que ficam fora do `include` deste tsconfig.
// Mantemos uma cópia aqui dentro de `src/` para garantir que tsserver/IDE
// resolvam os módulos mesmo quando o tsconfig do storybook não é detectado.

declare module "@juscash/design-system/dist/index.css";
