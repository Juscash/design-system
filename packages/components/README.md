# @design-system/components

Biblioteca de componentes React baseada em Ant Design, estendida para seguir o design system do projeto.

## ✨ Características

- ✅ Compatível com **Next.js 15+**
- ✅ Compatível com **React 18.3+** e **React 19**
- ✅ TypeScript completo
- ✅ SSR (Server Side Rendering) suportado
- ✅ Tree-shaking otimizado
- ✅ Baseado em Ant Design 5+

## 📦 Instalação

```bash
npm install @design-system/components antd
# ou
pnpm add @design-system/components antd
# ou
yarn add @design-system/components antd
```

## 🚀 Uso Rápido

### Next.js 15+ (App Router)

1. Configure o `next.config.js`:

```javascript
module.exports = {
  transpilePackages: ['@design-system/components'],
};
```

2. Configure o Provider no `app/layout.tsx`:

```tsx
import { DesignSystemProvider } from '@design-system/components/provider';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <DesignSystemProvider>
          {children}
        </DesignSystemProvider>
      </body>
    </html>
  );
}
```

3. Use os componentes:

```tsx
import { Button } from '@design-system/components';

export default function Page() {
  return <Button type="primary">Clique aqui</Button>;
}
```

## 📚 Documentação Completa

- **[Guia de Setup para Next.js](./NEXTJS_SETUP.md)** - Configuração detalhada
- **[Template de Componente](./COMPONENT_TEMPLATE.md)** - Como criar novos componentes
- **[Guia de Publicação NPM](../../GUIA_PUBLICACAO_NPM.md)** - Como publicar no npm

## 🎨 Componentes Disponíveis

Os componentes serão listados aqui conforme forem criados.

## 🔧 Desenvolvimento

```bash
# Build da biblioteca
pnpm build

# Modo watch
pnpm dev

# Testes
pnpm test
```

## 📝 Licença

MIT
