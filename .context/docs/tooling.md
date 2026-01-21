---
type: doc
name: tooling
description: Scripts, IDE settings, automation, and developer productivity tips
category: tooling
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 🔧 Tooling do Design System JusCash

> Ferramentas, scripts e configurações para desenvolvimento.

---

## 🖼️ Figma MCP

O projeto usa o **Figma MCP Server** para integração direta com designs.

### Ferramentas Disponíveis

| Ferramenta | Uso | Quando usar |
|------------|-----|-------------|
| `get_design_context` | Obter código e contexto de um node | Ao criar componente com design |
| `get_screenshot` | Capturar screenshot de um node | Visualizar design |
| `get_metadata` | Estrutura do design em XML | Entender hierarquia |
| `get_variable_defs` | Variáveis/tokens do Figma | Mapear cores e espaçamentos |

### Como Extrair nodeId

Do link Figma:
```
https://figma.com/design/ABC123/Projeto?node-id=123-456
                                              ^^^^^^^^
                                              nodeId: 123:456
```

### Exemplo de Uso

```typescript
// 1. Extrair nodeId do link
const nodeId = "123:456";

// 2. Obter contexto do design
get_design_context({ nodeId });

// 3. Analisar cores e espaçamentos
// 4. Mapear para tokens do DS
// 5. Criar componente
```

---

## 📦 Build Tools

### tsup

Bundler usado para gerar o pacote:

```bash
# Build
npm run build

# Dev mode com watch
npm run dev
```

**Configuração** (`tsup.config.ts`):
```typescript
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
});
```

### Output

```
dist/
├── index.js      # ESM
├── index.cjs     # CommonJS
├── index.d.ts    # TypeScript definitions
└── ...
```

---

## 📁 Estrutura de Arquivos

```
packages/design-system/
├── src/
│   ├── components/    # Componentes React
│   ├── theme/         # Tokens e provider
│   └── index.ts       # Entry point
├── dist/              # Build output
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

---

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Com coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Estrutura de Testes

```
src/components/__tests__/
├── Button.test.tsx
├── Input.test.tsx
└── ...
```

---

## 📝 Scripts Úteis

### package.json

| Script | Comando | Descrição |
|--------|---------|-----------|
| `build` | `tsup` | Build para produção |
| `dev` | `tsup --watch` | Build com watch |
| `lint` | `eslint src` | Verificar código |
| `type-check` | `tsc --noEmit` | Verificar tipos |

---

## 🎨 Ícones

### Lucide React

O Design System usa **Lucide React** para ícones:

```typescript
import { LucideIcons } from "@juscash/design-system";

// Uso
<LucideIcons.Plus />
<LucideIcons.Check />
<LucideIcons.X />
```

### Ícones Comuns

| Ícone | Componente | Uso |
|-------|------------|-----|
| ➕ | `LucideIcons.Plus` | Adicionar |
| ✓ | `LucideIcons.Check` | Confirmar |
| ✕ | `LucideIcons.X` | Fechar/Cancelar |
| 🔍 | `LucideIcons.Search` | Buscar |
| ⚙️ | `LucideIcons.Settings` | Configurações |
| 👤 | `LucideIcons.User` | Usuário |

---

## 🔌 IDE Settings

### VS Code Extensions Recomendadas

| Extensão | Uso |
|----------|-----|
| `ESLint` | Linting |
| `Prettier` | Formatação |
| `TypeScript Importer` | Auto-import |
| `Figma for VS Code` | Preview designs |

### Settings Recomendadas

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

---

## 📚 Importação no Projeto

### Instalação

```bash
npm install @juscash/design-system
```

### Uso

```typescript
// Importar componentes
import { Button, Input, Select } from "@juscash/design-system";

// Importar tokens
import { designSystemColors, spacing, radius } from "@juscash/design-system";

// Importar ícones
import { LucideIcons } from "@juscash/design-system";

// Usar Provider
import { JuscashProvider } from "@juscash/design-system";
```

### Setup com Provider

```tsx
import { JuscashProvider } from "@juscash/design-system";

function App() {
  return (
    <JuscashProvider>
      {/* App content */}
    </JuscashProvider>
  );
}
```
