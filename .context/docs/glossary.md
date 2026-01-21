---
type: doc
name: glossary
description: Project terminology, type definitions, domain entities, and business rules
category: glossary
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# 📖 Glossário do Design System JusCash

> Terminologia, tokens e definições de tipos do Design System.

---

## 🎨 Tokens de Cores

### Brand Colors

#### Primary (Verde JusCash)
| Token | Valor | Uso |
|-------|-------|-----|
| `brand.primary[50]` | `#AAFFBE` | Background muito claro |
| `brand.primary[100]` | `#8AF3A3` | Background claro |
| `brand.primary[200]` | `#6ADD89` | Hover leve |
| `brand.primary[300]` | `#4AC771` | Borda ativa |
| `brand.primary[400]` | `#2CBD62` | Estado intermediário |
| `brand.primary[500]` | `#009C46` | Texto sobre fundo claro |
| `brand.primary[600]` | `#008633` | **Cor principal** ⭐ |
| `brand.primary[700]` | `#007122` | Hover |
| `brand.primary[800]` | `#005C12` | Pressed/Active |
| `brand.primary[900]` | `#004706` | Mais escuro |

#### Secondary (Azul)
| Token | Valor | Uso |
|-------|-------|-----|
| `brand.secondary[50]` | `#C7DDFA` | Background muito claro |
| `brand.secondary[100]` | `#A1C6F7` | Background claro |
| `brand.secondary[200]` | `#7BAFF4` | Hover leve |
| `brand.secondary[300]` | `#5698F1` | Borda ativa |
| `brand.secondary[400]` | `#3081EE` | Estado intermediário |
| `brand.secondary[500]` | `#136CE2` | Texto sobre fundo claro |
| `brand.secondary[600]` | `#105ABC` | **Cor principal** ⭐ |
| `brand.secondary[700]` | `#0D4897` | Hover |
| `brand.secondary[800]` | `#093671` | Pressed/Active |
| `brand.secondary[900]` | `#072854` | Mais escuro |

### Neutral Colors (Cinzas)

| Token | Valor | Uso |
|-------|-------|-----|
| `neutral[50]` | `#fafafa` | Background page |
| `neutral[100]` | `#f5f5f5` | Background card |
| `neutral[200]` | `#e5e5e5` | Bordas claras |
| `neutral[300]` | `#d4d4d4` | Bordas, disabled bg |
| `neutral[400]` | `#a3a3a3` | Texto disabled |
| `neutral[500]` | `#737373` | Texto placeholder |
| `neutral[600]` | `#525252` | Texto secundário |
| `neutral[700]` | `#404040` | Texto |
| `neutral[800]` | `#262626` | **Texto principal** ⭐ |
| `neutral[900]` | `#171717` | Texto heading |

### Feedback Colors

| Tipo | Token | Valor | Uso |
|------|-------|-------|-----|
| ✅ Green | `feedback.green[50]` | `#C9FFD6` | Success background |
| ✅ Green | `feedback.green[500]` | `#1E7E34` | Success text |
| ✅ Green | `feedback.green[900]` | `#065F1B` | Success dark |
| ❌ Red | `feedback.red[50]` | `#FEF2EC` | Error background |
| ❌ Red | `feedback.red[500]` | `#D2190B` | Error text |
| ❌ Red | `feedback.red[900]` | `#9D231C` | Error dark |
| ⚠️ Yellow | `feedback.yellow[50]` | `#FFFBE0` | Warning background |
| ⚠️ Yellow | `feedback.yellow[500]` | `#867400` | Warning text |
| ⚠️ Yellow | `feedback.yellow[900]` | `#675413` | Warning dark |
| ℹ️ Blue | `feedback.blue[50]` | `#ECF5FE` | Info background |
| ℹ️ Blue | `feedback.blue[500]` | `#207AC3` | Info text |
| ℹ️ Blue | `feedback.blue[900]` | `#1D4F79` | Info dark |
| 🔶 Orange | `feedback.orange[50]` | `#FFE9D2` | Orange background |
| 🔶 Orange | `feedback.orange[500]` | `#B15600` | Orange text |
| 🔶 Orange | `feedback.orange[900]` | `#8B4400` | Orange dark |

---

## 📏 Tokens de Spacing

| Token | Valor | Uso |
|-------|-------|-----|
| `spacing[1]` | 4px | Espaçamento mínimo |
| `spacing[2]` | 8px | Padding pequeno |
| `spacing[3]` | 12px | Padding médio |
| `spacing[4]` | 16px | **Padding padrão** ⭐ |
| `spacing[5]` | 20px | Gap entre items |
| `spacing[6]` | 24px | Margin entre seções |
| `spacing[7]` | 28px | - |
| `spacing[8]` | 32px | Margin grande |
| `spacing[10]` | 40px | Seção padding |
| `spacing[12]` | 48px | Header height |
| `spacing[14]` | 56px | - |
| `spacing[16]` | 64px | Page padding |
| `spacing[20]` | 80px | - |
| `spacing[24]` | 96px | Hero sections |

---

## ⭕ Tokens de Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `radius.md` | 4px | Inputs, campos |
| `radius.xl` | 8px | **Botões, cards** ⭐ |
| `radius["2xl"]` | 12px | Modais |
| `radius["3xl"]` | 16px | Cards grandes |
| `radius.full` | 9999px | Avatares, badges circulares |

---

## 🌑 Tokens de Shadow

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow.xs` | `0px 1px 2px rgba(0,0,0,0.05)` | Sombra sutil |
| `shadow.s` | `0px 1px 3px rgba(0,0,0,0.1)` | Cards |
| `shadow.m` | `0px 4px 6px rgba(0,0,0,0.1)` | Dropdowns |
| `shadow.l` | `0px 10px 15px rgba(0,0,0,0.1)` | Modais |
| `shadow.xl` | `0px 20px 25px rgba(0,0,0,0.1)` | Popovers |
| `shadow.focus` | `0px 0px 0px 3px #d4d4d4` | Focus ring |
| `shadow.focusError` | `0px 0px 0px 3px rgba(210,25,11,0.4)` | Focus error |

---

## 📝 Terminologia

### Props Customizadas

| Termo | Tipo | Descrição |
|-------|------|-----------|
| `dsSize` | `"xs" \| "s" \| "m" \| "l"` | Tamanho do Design System |
| `variant` | `"primary" \| "secondary" \| ...` | Variante visual |

### Tamanhos (dsSize)

| Valor | Height | Font | Uso |
|-------|--------|------|-----|
| `xs` | 24px | 10px | Ações compactas |
| `s` | 32px | 13px | Secundário |
| `m` | 36px | 13px | **Padrão** ⭐ |
| `l` | 44px | 14px | CTAs principais |

### Padrões de Código

| Termo | Descrição |
|-------|-----------|
| `CleanAntdProps` | Type que remove props do Antd que serão substituídas |
| `Token Functions` | Funções como `getPrimaryTokens()` que retornam tokens |
| `ConfigProvider` | Componente Antd que aplica tema local |
| `displayName` | Propriedade que define nome do componente para DevTools |

---

## 🏷️ Componentes

| Componente | Base Antd | Descrição |
|------------|-----------|-----------|
| `Button` | `antd/Button` | Botão com variantes |
| `Input` | `antd/Input` | Campo de texto |
| `Select` | `antd/Select` | Seletor dropdown |
| `Checkbox` | `antd/Checkbox` | Caixa de seleção |
| `Radio` | `antd/Radio` | Botão de opção |
| `Switch` | `antd/Switch` | Toggle on/off |
| `Table` | `antd/Table` | Tabela de dados |
| `Tag` | `antd/Tag` | Etiqueta/badge |
| `Card` | `antd/Card` | Container card |
| `Typography` | `antd/Typography` | Textos |
| `Upload` | `antd/Upload` | Upload de arquivos |
| `Segmented` | `antd/Segmented` | Botões segmentados |
| `PageHeader` | custom | Cabeçalho de página |
| `FormItem` | `antd/Form.Item` | Item de formulário |
