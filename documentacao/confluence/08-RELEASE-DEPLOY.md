# 08. RELEASE E DEPLOY

Este documento descreve o processo de versionamento e publicação do pacote `@Juscash/design-system` e sua documentação.

---

## 8.1 Versionamento Semântico (SemVer)

Seguimos estritamente o [Semantic Versioning 2.0.0](https://semver.org/). O número de versão é composto por **MAJOR.MINOR.PATCH** (ex: `1.2.3`).

| Tipo      | Quando usar                                    | Exemplo de Mudança                          | Comando                 |
| :-------- | :--------------------------------------------- | :------------------------------------------ | :---------------------- |
| **PATCH** | Correções de bugs retrocompatíveis.            | Ajuste de cor, correção de gap.             | `npm run version:patch` |
| **MINOR** | Novas funcionalidades retrocompatíveis.        | Novo componente, nova variante.             | `npm run version:minor` |
| **MAJOR** | Mudanças que quebram a API (Breaking Changes). | Remover uma prop, mudar nome de componente. | `npm run version:major` |

---

## 8.2 Fluxo de Publicação (Pacote NPM)

A publicação do pacote `@Juscash/design-system` no **GitHub Packages** é automatizada, mas o disparo é manual via scripts na raiz do projeto.

### Passo a Passo

1.  **Validação Local**:
    Certifique-se que você está na branch `main` e que seu código está testado e commited.

2.  **Atualizar Versão**:
    Execute o script correspondente ao tipo de mudança. O script irá automaticamente:
    - Atualizar o `package.json`.
    - Criar um commit de release.
    - Gerar a Tag Git.

    ```bash
    # Exemplo para pequenas correções
    npm run version:patch
    ```

3.  **Publicar (Push & Deploy)**:
    Após gerar a versão, envie para o repositório remoto e dispare o CI.

    ```bash
    npm run version:publish
    ```

    Este comando envia os commits e tags para o GitHub. Uma **GitHub Action** detectará a nova tag e realizará o publish no registro NPM.

---

## 8.3 Deploy da Documentação (Storybook)

O site de documentação (Storybook) é hospedado no **GitHub Pages**.

- **Deploy Automático**: Sempre que um código é mergeado na branch `main`, um workflow do GitHub Actions faz o build e deploy do Storybook atualizado.
- **Acesso**: [https://Juscash.github.io/design-system/](https://Juscash.github.io/design-system/)

> **Nota**: Não é necessário rodar `npm run build:docs` localmente para deploy, isso é responsabilidade do CI/CD.

---

## 8.4 Ambiente de CI/CD

Toda a orquestração é feita via **GitHub Actions**.

- **Workflows**: Arquivos definidos em `.github/workflows/`.
- **Permissões**: Para que o publish funcione, o repositório precisa estar configurado com permissões de leitura/escrita para o `GITHUB_TOKEN`.
- **Segurança**: Nenhum token pessoal hardcoded deve ser usado; o pipeline utiliza segredos injetados dinamicamente.

---

[Anterior: Contribuição](./07-CONTRIBUICAO.md) | [Índice](./README.md)
