# 06. STORYBOOK

O Storybook é o ambiente de desenvolvimento e documentação viva dos componentes.
Enquanto o Confluence foca em **Arquitetura e Processos**, o Storybook foca na **API do Componente e Testes Visuais**.

[**🔗 Acessar Storybook Online**](https://Juscash.github.io/design-system/)

---

## 6.1 Rodando Localmente

Para desenvolver ou testar componentes, você deve rodar o Storybook localmente.

Na raiz do projeto (`/`), execute:

```bash
npm run dev
```

Isso iniciará o servidor de desenvolvimento em `http://localhost:6006`.

---

## 6.2 Recursos da Interface

O Storybook oferece ferramentas poderosas para inspecionar os componentes sem olhar o código.

### 1. Controls (ArgsTable)

Localizado no painel inferior ou lateral, permite que você altere as propriedades (`props`) do componente em tempo real.

- **Teste fluxos**: Mude `isLoading` para `true` e veja o spinner aparecer.
- **Teste variantes**: Troque `type` de `primary` para `danger`.
- **Teste conteúdo**: Digite um texto longo para testar quebra de linha.

### 2. Acessibilidade (A11y)

Utilizamos o addon `storybook-addon-a11y`.
Na aba **Accessibility**, você verá auditorias automáticas de contraste de cor, labels de ARIA faltantes e outras violações da WCAG.

- ✅ **Pass**: O componente está acessível segundo as regras automáticas.
- ❌ **Violation**: Precisa de correção antes do merge.

### 3. Design (Figma)

Na aba **Designs**, você pode visualizar o frame original do Figma lado a lado com a implementação. Isso facilita o "Pixel Perfect".

### 4. Actions

Na aba **Actions**, você vê logs de eventos disparados, como `onClick`, `onChange`, etc., confirmando que os callbacks estão funcionando.

---

## 6.3 Documentação Automática (Docs)

Cada componente possui uma aba **Docs**.
Esta documentação é gerada automaticamente a partir dos comentários JSDoc no código TypeScript (`src/components/**`).

Ela contém:

- Exemplos de uso (Stories).
- Tabela de Props (Nome, Descrição, Default, Tipo).
- Code Snippets (Copiar e Colar).

---

[Anterior: Componentes](./05-COMPONENTES.md) | [Índice](./README.md) | [Próximo: Contribuição](./07-CONTRIBUICAO.md)
