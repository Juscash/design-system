Use este arquivo como instrucao principal.
Siga exatamente o fluxo do agente `component-creator` e as skills custom.
Faça as perguntas em lista de escolhas antes do plano.

Quero criar um novo componente no Design System.

Regras obrigatorias:
1) Use apenas o agente custom `component-creator` e as skills custom do repo (ver `.context/docs/ai-context-rules.md`).
2) Antes do plano, faca as perguntas necessarias com lista de escolhas (sem resposta livre).
3) Gere o plano apos as respostas, com fases claras (Fase 1, Fase 2, Fase 3...).
4) Execute por etapas somente quando eu confirmar cada fase.
5) Evite ler arquivos fora do necessario.

Dados iniciais:
- Pergunte os dados abaixo usando lista de escolhas:
  - Nome do componente
  - Componente base do Antd
  - Link do Figma (node)
  - Link da doc do Antd
  - Classificacao (entrada, acao, layout, feedback, tipografia)

Fluxo esperado:
- Pergunte tudo antes do plano (lista de escolhas).
- Gere o plano com checklist de tarefas.
- Aguarde minha confirmacao para executar a Fase 1.
- Ao final de cada fase, peca validacao com lista de escolhas.
