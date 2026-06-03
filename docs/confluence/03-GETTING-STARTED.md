# 03. GETTING STARTED (COMEÇANDO)

Este guia cobre a instalação, configuração obrigatória e o primeiro uso do **@juscash/design-system**.

## 3.1 Pré-requisitos

Antes de instalar, certifique-se que seu ambiente atende aos requisitos:

- **Node.js**: Versão 18 ou superior.
- **Gerenciador de Pacotes**: NPM (recomendado) ou Yarn.

### Configuração de Autenticação (`.npmrc`)

Como nosso pacote é **privado** e hospedado no **GitHub Packages**, você precisa autenticar seu cliente NPM. Crie um arquivo `.npmrc` na raiz do seu projeto com o seguinte conteúdo:

```ini
@juscash:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> **Atenção**: Nunca commite seu token real. Use variáveis de ambiente (`GITHUB_TOKEN`) no CI/CD e localmente. Seu token pessoal (PAT) deve ter permissão de leitura de pacotes (`read:packages`).

---

## 3.2 Instalação

Com o `.npmrc` configurado, instale a biblioteca:

```bash
# Via NPM
npm install @juscash/design-system

# Via Yarn
yarn add @juscash/design-system
```

Verifique se a instalação foi bem sucedida conferindo seu `package.json`.

---

## 3.3 Configuração Obrigatória (Setup)

Para que os componentes funcionem corretamente (estilos e contexto), você precisa realizar dois passos:

1.  Importar o **CSS Global**.
2.  Envolver a aplicação no **`JuscashProvider`**.

### Cenário A: Aplicações Next.js (App Router)

No Next.js 13+, a configuração deve ser feita no **Root Layout** (`src/app/layout.tsx`).

```tsx
// src/app/layout.tsx
import React from "react";
// 1. IMPORTAÇÃO OBRIGATÓRIA DOS ESTILOS
import "@juscash/design-system/dist/index.css";
// 2. IMPORTAÇÃO DO PROVIDER
import { JuscashProvider } from "@juscash/design-system";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* O Provider deve envolver todo o conteúdo */}
        <JuscashProvider>{children}</JuscashProvider>
      </body>
    </html>
  );
}
```

> **Nota**: Se o `JuscashProvider` usar recursos de cliente (como Context API), ele já é exportado como um Client Component ou o Next.js avisará para adicionar `'use client'` em um wrapper intermediário se necessário.

### Cenário B: React Puro (Vite / CRA)

Em projetos Vite, faça a configuração no arquivo de entrada principal, geralmente `src/main.tsx`.

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 1. ESTILOS
import "@juscash/design-system/dist/index.css";
// 2. PROVIDER
import { JuscashProvider } from "@juscash/design-system";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <JuscashProvider>
      <App />
    </JuscashProvider>
  </React.StrictMode>,
);
```

---

## 3.4 Seu Primeiro Componente

Agora que tudo está configurado, você pode usar os componentes em qualquer página.

**Regra de Ouro**: Sempre importe de `@juscash/design-system`. **NUNCA** importe de `antd`.

```tsx
import { Button, Flex } from "@juscash/design-system";

export default function MinhaPagina() {
  return (
    <Flex gap="middle" vertical>
      <h1>Olá, Juscash!</h1>

      {/* Botão com estilização proprietária automática */}
      <Button type="primary">Clique Aqui</Button>

      <Button type="default" danger>
        Ação Perigosa
      </Button>
    </Flex>
  );
}
```

---

## 3.5 Troubleshooting (Problemas Comuns)

| Sintoma                                        | Causa Provável                         | Solução                                                                                                                         |
| :--------------------------------------------- | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Erro 401 / 403** ao instalar                 | Token inválido ou ausente no `.npmrc`. | Verifique se gerou um PAT (Personal Access Token) no GitHub com escopo `read:packages` e se a variável de ambiente está setada. |
| **Componentes sem estilo** (brancos/quebrados) | CSS não importado.                     | Verifique se `@juscash/design-system/dist/index.css` foi importado no layout raiz.                                              |
| **Erro de Contexto** (useContext)              | Falta do Provider.                     | Verifique se o `JuscashProvider` está envolvendo a aplicação na raiz.                                                           |

---

[Anterior: Arquitetura](./02-ARQUITETURA.md) | [Índice](./README.md) | [Próximo: Fundamentos](./04-FUNDAMENTOS.md)
