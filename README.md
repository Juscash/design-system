# Design System Components

Biblioteca de componentes React baseada em Ant Design, estendida para seguir o design system do projeto.

## 🚀 Início Rápido

### Instalação

```bash
# Instalar dependências
pnpm install

# Desenvolvimento da documentação
pnpm dev

# Build da biblioteca
pnpm build:components
```

## 📁 Estrutura do Projeto

```
design-system/
├── packages/
│   └── components/          # Biblioteca de componentes
├── apps/
│   └── docs/                # Aplicação de documentação
├── scripts/                 # Scripts automatizados
└── ...
```

## 🎨 Criando um Novo Componente

Use o script automatizado:

```bash
# Criar componente simples
pnpm add-component Button

# Criar componente com estilos
pnpm add-component Button --with-styles
```

Isso cria automaticamente:
- Estrutura de arquivos do componente
- Exports necessários
- Arquivos de tipos e estilos (se solicitado)

Depois:
1. Implemente a lógica do componente
2. Adicione exemplo na documentação (`apps/docs/src/pages/ComponentsPage.tsx`)
3. Teste localmente (`pnpm dev`)

## 📦 Publicação no NPM

### Primeira Publicação

```bash
# 1. Configurar package.json (veja WORKFLOW_PUBLICACAO.md)
# 2. Login no npm
npm login

# 3. Publicar
pnpm release
```

### Atualizações Futuras

```bash
# 1. Criar changeset (descrever mudanças)
pnpm changeset

# 2. Versionar e publicar
pnpm version
pnpm release
```

**📖 Guia completo:** [`WORKFLOW_PUBLICACAO.md`](./WORKFLOW_PUBLICACAO.md)

## 🚀 Uso no Next.js 15+

Esta biblioteca é totalmente compatível com Next.js 15 ou superior.

📖 **Veja o guia completo:** [`packages/components/NEXTJS_SETUP.md`](./packages/components/NEXTJS_SETUP.md)

### Instalação rápida:

```bash
npm install @design-system/components antd
```

### Configuração mínima:

```tsx
// app/layout.tsx
import { DesignSystemProvider } from '@design-system/components/provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DesignSystemProvider>
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}
```

```javascript
// next.config.js
module.exports = {
  transpilePackages: ['@design-system/components'],
};
```

## 🔧 Tecnologias

- React 18.3+ / React 19 (compatível com Next.js 15+)
- TypeScript
- Ant Design
- Vite
- pnpm workspaces

## 📝 Comandos Úteis

```bash
# Desenvolvimento
pnpm dev                    # Inicia docs
pnpm build:components       # Build da biblioteca
pnpm add-component Nome     # Criar componente

# Versionamento
pnpm changeset              # Criar changeset
pnpm version                # Atualizar versões
pnpm version:patch          # Patch (0.0.1 -> 0.0.2)
pnpm version:minor          # Minor (0.0.1 -> 0.1.0)
pnpm version:major          # Major (0.0.1 -> 1.0.0)

# Publicação
pnpm release                # Build + Publicar
pnpm release:dry-run        # Simular publicação
```

## 📚 Documentação

- **[Workflow de Publicação](./WORKFLOW_PUBLICACAO.md)** - Guia completo de publicação
- **[Guia NPM](./GUIA_PUBLICACAO_NPM.md)** - Detalhes técnicos
- **[Setup Next.js](./packages/components/NEXTJS_SETUP.md)** - Configuração Next.js
- **[Template Componente](./packages/components/COMPONENT_TEMPLATE.md)** - Como criar componentes

## 🤖 CI/CD

O projeto está configurado com GitHub Actions para:
- ✅ Build automático em PRs
- ✅ Publicação automática quando há changesets
- ✅ Versionamento automático

Configure `NPM_TOKEN` nas secrets do GitHub para habilitar publicação automática.

## 📝 Próximos Passos

- [ ] Integrar regras do Figma
- [ ] Criar primeiro componente de exemplo
- [ ] Configurar testes automatizados
- [ ] Publicar primeira versão no npm
