# Documentação

## 🚀 Como Instalar e Rodar

### 📦 Instalação

#### Opção 1: Usando pnpm (Recomendado)

```bash
# Instalar pnpm globalmente (se ainda não tiver)
npm install -g pnpm

# Instalar todas as dependências
pnpm install
```

#### Opção 2: Usando npm

```bash
# Instalar todas as dependências
npm install
```

### 🏃 Rodar a Documentação

#### Usando pnpm

```bash
pnpm dev
```

#### Usando npm

```bash
npm run dev
```

Isso vai:
1. Buildar a biblioteca de componentes (`@design-system/components`)
2. Iniciar o servidor de desenvolvimento da documentação na porta 3000
3. Abrir automaticamente no navegador

### 🎯 Acessar

Após rodar, acesse:
- URL: http://localhost:3000
- Menu: Componentes > Button

---

## ✅ Tokens do Figma Aplicados

Os tokens fundamentais do design system foram extraídos do Figma e aplicados ao sistema de tema.

### 🎨 Cores

#### Brand Primary
- 500 (Principal): `#009c46` — aplicado como `colorPrimary`

#### Brand Secondary
- 500 (Principal): `#136ce2`

#### Neutral
- Escala completa: 0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

#### Feedback
- Success (Green): `#1e7e34` — `colorSuccess`
- Warning (Yellow): `#867400` — `colorWarning`
- Error (Red): `#d2190b` — `colorError`
- Info (Blue): `#207ac3` — `colorInfo`

### 📝 Tipografia
- Fonte: Inter
- Base: 16px (Body 01)
- Line height: 1.2

### 📐 Border Radius
- md: 4px (padrão), xl: 8px, 2xl: 12px, 3xl: 16px, full: 9999px

### 📏 Espaçamentos
- Base: 4px. Escala: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96

### Referências
- Seed Tokens: `packages/components/src/themes/seed.ts`
- Figma Tokens (referência): `packages/components/src/themes/figma-tokens.ts`

---

## Páginas

- Componentes → Button: exemplos de tipos, tamanhos, estados e com ícones.


