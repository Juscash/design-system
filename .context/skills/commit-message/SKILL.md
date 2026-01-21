---
type: skill
name: Commit Message
description: Generate commit messages following Gitmoji standard for JusCash projects
skillSlug: commit-message
phases: [E, C]
generated: 2026-01-21
status: filled
scaffoldVersion: "2.0.0"
---

# ✨ Skill: Commit Message

> Gerar mensagens de commit seguindo o padrão **Gitmoji** configurado para o projeto JusCash.

## 📋 Padrão de Commit

### Formato

```
<emoji> <type>: <description>
```

**Regras:**
1. **Sem scopes** - Não usar parênteses como `feat(ui)`
2. **Português** - Descrição sempre em português
3. **Imperativo** - Usar modo imperativo ("cria", não "criado")
4. **Lowercase** - Descrição em minúsculas
5. **Sem ponto final** - Não terminar com `.`

---

## 🎨 Emojis e Types

| Emoji | Type | Quando usar |
|-------|------|-------------|
| ✨ | `feat` | Novas features ou mudanças maiores |
| 🐛 | `fix` | Correções de bugs |
| ♻️ | `refactor` | Reestruturação de código (sem mudança de comportamento) |
| 🔧 | `chore` | Configuração, K8s, Docker, dependências, tooling |
| 📚 | `docs` | Atualizações de documentação |
| 🚀 | `perf` | Melhorias de performance |
| 💄 | `style` | Apenas formatação ou mudanças visuais |

---

## ✅ Exemplos Corretos

```bash
✨ feat: cria integração com a api de pagamentos
🐛 fix: corrige erro de timeout no pod do k8s
🔧 chore: atualiza variaveis de ambiente do nextjs
♻️ refactor: extrai lógica de validação para utils
📚 docs: documenta fluxo de autenticação
🚀 perf: otimiza consulta de processos
💄 style: ajusta espaçamento do header
```

---

## ❌ Exemplos Incorretos

```bash
# ❌ Com scope
feat(ui): adiciona botão

# ❌ Em inglês
✨ feat: add new button component

# ❌ Com ponto final
✨ feat: cria componente de botão.

# ❌ Passado ao invés de imperativo
✨ feat: criado novo componente
```

---

## 🔧 Uso para Componentes do Design System

Quando criar componentes do Design System:

```bash
# Novo componente
✨ feat: cria componente Avatar no design system

# Ajuste em componente existente
🐛 fix: corrige estilos do Button quando disabled

# Refatoração
♻️ refactor: simplifica lógica de tokens do Input

# Documentação
📚 docs: documenta props do componente Select
```

---

## 📝 Template de Uso

Ao gerar um commit message, pergunte:

1. **O que foi feito?** → Define o type (feat, fix, refactor...)
2. **É uma mudança visual?** → Considere `style`
3. **É configuração/ferramenta?** → Use `chore`
4. **É documentação?** → Use `docs`
5. **Existe algum ticket JIRA?** → Se houver, informe o número (ex: `JS-1322`). O número será inserido entre colchetes antes da mensagem: `[JS-1322]`

Então gere:
```
<emoji correspondente> <type>: [JIRA-ID] <descrição em português no imperativo>
```
