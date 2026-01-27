---
type: skill
name: run-tests
description: Executar testes do Design System com Vitest no workspace correto
skillSlug: run-tests
phases: [V]
mode: false
generated: 2026-01-26
status: filled
scaffoldVersion: "2.0.0"
---

# 🧪 Skill: run-tests

> Rodar testes do Design System e interpretar falhas.

## ✅ Quando usar

- Antes de finalizar uma alteracao de componente.
- Antes de abrir PR.

## ▶️ Comandos

```bash
# Testes do design-system
npm run test -w @Juscash/design-system

# Rodar uma vez (CI local)
npm run test:run -w @Juscash/design-system
```

## ✅ Checklist

- [ ] Tests executam no workspace correto.
- [ ] Falhas corrigidas antes de finalizar.
