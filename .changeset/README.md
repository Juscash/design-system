# Changesets

Esta pasta é gerenciada pelo [Changesets](https://github.com/changesets/changesets) — a ferramenta que versiona e publica o `@juscash/design-system`.

## O que é um "changeset"?

É um arquivinho `.md` que você adiciona ao seu Pull Request descrevendo **o que mudou** e **qual o tipo de mudança** (patch / minor / major). Ele é a base para o CI calcular a próxima versão e gerar o CHANGELOG.

## Como criar um (no seu PR)

```bash
npm run changeset
```

Responda às perguntas:

- **Tipo de mudança**:
  - `patch` → correção de bug, ajuste pequeno (1.0.0 → 1.0.1)
  - `minor` → nova funcionalidade sem quebrar nada (1.0.0 → 1.1.0)
  - `major` → mudança que quebra compatibilidade (1.0.0 → 2.0.0)
- **Resumo**: uma frase clara do que mudou (vai pro CHANGELOG).

O comando cria um arquivo dentro de `.changeset/`. **Commite esse arquivo junto com o seu código.**

> Toda mudança que afeta quem consome a lib precisa de um changeset. Mudanças que não afetam o pacote publicado (ex.: só docs/CI) não precisam.

A documentação completa está em: https://github.com/changesets/changesets/blob/main/docs/common-questions.md
