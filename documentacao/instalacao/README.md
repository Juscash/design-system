# Guia de Instalação e Uso - @Juscash/design-system

Este guia fornece instruções detalhadas sobre como instalar, configurar e utilizar a biblioteca de componentes do Design System da Juscash em uma aplicação Next.js.

---

## Sumário

1. [Pré-requisitos](#1-pré-requisitos)
2. [Configuração do Registro (GitHub Packages)](#2-configuração-do-registro-github-packages)
3. [Instalação](#3-instalação)
4. [Configuração no Next.js (App Router)](#4-configuração-no-nextjs-app-router)
5. [Uso de Componentes](#5-uso-de-componentes)
6. [Uso de Ícones](#6-uso-de-ícones)
7. [Atualização da Biblioteca](#7-atualização-da-biblioteca)
8. [Solução de Problemas](#8-solução-de-problemas)

---

## 1. Pré-requisitos

Para utilizar esta biblioteca, você precisará de:

- **Node.js**: Versão 18 ou superior (recomendado v20.x).
- **GitHub PAT (Personal Access Token)**: Um token com permissão `read:packages` para autenticar no registro do GitHub.
- **React**: Versão 18 ou 19.

---

## 2. Configuração do Registro (GitHub Packages)

Como nossa biblioteca está hospedada no GitHub Packages, você precisa configurar o seu ambiente para que o `npm` saiba onde buscá-la.

### Criando o arquivo .npmrc

Na raiz do seu projeto consumidor, crie (ou edite) um arquivo chamado `.npmrc` com o seguinte conteúdo:

```text
@Juscash:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> **Dica de Segurança**: Não coloque o token diretamente no arquivo se for versionar o código. Em vez disso, defina uma variável de ambiente `GITHUB_TOKEN` no seu terminal ou no seu serviço de CI/CD.

---

## 3. Instalação

Com o `.npmrc` configurado, execute o comando abaixo no terminal:

```bash
# Via npm
npm install @Juscash/design-system

# Via yarn
yarn add @Juscash/design-system
```

---

## 4. Configuração no Next.js (App Router)

Para garantir que os estilos e o tema funcionem corretamente, você deve envolver sua aplicação com o `JuscashProvider`.

### Configurando o Layout Principal

No arquivo `app/layout.tsx`:

```tsx
import { JuscashProvider } from "@Juscash/design-system";
import { Inter } from "next/font/google";

// Configuração da fonte Inter (recomendada)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <JuscashProvider>{children}</JuscashProvider>
      </body>
    </html>
  );
}
```

O `JuscashProvider` já inclui internamente o `AntdRegistry` necessário para o funcionamento correto do Ant Design no Next.js App Router.

---

## 5. Uso de Componentes

Você pode importar os componentes diretamente do pacote `@Juscash/design-system`.

```tsx
import { Button, Card, Heading4, Body1 } from "@Juscash/design-system";

export default function MyPage() {
  return (
    <Card title="Exemplo de Uso">
      <Heading4>Bem-vindo ao Design System</Heading4>
      <Body1>Este é um exemplo simples de como usar nossos componentes.</Body1>
      <div style={{ marginTop: 16 }}>
        <Button type="primary">Clique Aqui</Button>
      </div>
    </Card>
  );
}
```

---

## 6. Uso de Ícones

Utilizamos exclusivamente a biblioteca `lucide-react`. Para facilitar o uso e manter a consistência, exportamos todos os ícones através do objeto `LucideIcons`.

```tsx
import { Button, LucideIcons } from "@Juscash/design-system";

export default function PageWithIcon() {
  return (
    <Button type="primary" icon={<LucideIcons.Plus size={16} />}>
      Adicionar Item
    </Button>
  );
}
```

---

## 7. Atualização da Biblioteca

Sempre que uma nova versão for publicada, você pode atualizar o consumidor usando:

```bash
# Atualiza para a última versão estável respeitando o range do package.json
npm update @Juscash/design-system

# Ou força a instalação da última versão específica
npm install @Juscash/design-system@latest
```

---

## 8. Solução de Problemas

### Erro 401 ou 404 na instalação

Verifique se o seu `GITHUB_TOKEN` está correto e se ele possui a permissão `read:packages`. Certifique-se também de que o arquivo `.npmrc` está na raiz do projeto.

### Estilos não carregados (Flash de conteúdo sem estilo)

O `JuscashProvider` deve estar o mais alto possível na árvore de componentes (geralmente no `layout.tsx`) para que o `AntdRegistry` possa injetar os estilos durante a renderização no servidor (SSR).

### Conflito de Fontes

Certifique-se de que a variável CSS `--font-primary` está definida no `html` ou `body`, conforme mostrado no exemplo de configuração do Next.js.
