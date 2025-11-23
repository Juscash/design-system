# Exemplo de Uso - Next.js 15+ App Router

Este é um exemplo de como usar `@design-system/components` em um projeto Next.js 15+ com App Router.

## Estrutura

```
app/
├── layout.tsx          # Provider do Design System
├── page.tsx            # Página de exemplo
└── ...
next.config.js          # Configuração do Next.js
```

## Configuração Necessária

1. **next.config.js**: Adicione `@design-system/components` em `transpilePackages`
2. **app/layout.tsx**: Envolva a aplicação com `DesignSystemProvider`
3. **app/page.tsx**: Use os componentes normalmente

## Executando

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build
```

## Notas

- Todos os componentes são compatíveis com Server Components por padrão
- Use `'use client'` apenas quando necessário (hooks, eventos, etc)
- O Ant Design injeta estilos automaticamente

