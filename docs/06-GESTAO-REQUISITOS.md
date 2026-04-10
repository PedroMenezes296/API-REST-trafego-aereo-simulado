# 🎛️ Fase 6: Gestão de Requisitos

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Plano Aprovado

---

## 1. Plano de Gestão de Requisitos

### 1.1 Objetivo

Manter requisitos rastreáveis, controlá evolução, gerenciar mudanças e garantir conformidade com escopo durante todo projeto.

### 1.2 Princípios

- ✅ **Rastreabilidade**: Todo requisito mapeado a componentes e testes
- ✅ **Controle de Versão**: Mudanças documentadas e aprovadas
- ✅ **Transparência**: Status do requisito sempre visível
- ✅ **Colaboração**: Stakeholders informados de mudanças
- ✅ **Adaptabilidade**: Processos para acomodar mudanças inevitáveis

### 1.3 Escopo de Gestão

- Requisitos novos (como adicionar)
- Requisitos modificados (como alterar)
- Requisitos descontinuados (como remover)
- Requisitos com dependências
- Requisitos com porte estimado

---

## 2. Política de Controle de Mudanças

### 2.1 Processo de Mudança

```
SOLICITAÇÃO DE MUDANÇA
        ↓
   ANÁLISE DE IMPACTO
        ↓
   PRIORIZAÇÃO + SCHEDULING
        ↓
   APROVAÇÃO (Orientador + Equipe)
        ↓
   IMPLEMENTAÇÃO
        ↓
   VALIDAÇÃO + TESTES
        ↓
   LIBERAÇÃO
```

### 2.2 Critérios para Aceitar Mudança

| Critério    | Descrição                        | Threshold                     |
| ----------- | -------------------------------- | ----------------------------- |
| **Impacto** | Complexidade da mudança          | Médio-Alto requer aprovação   |
| **Escopo**  | Afeta fora do escopo original?   | Sim → Renegociar              |
| **Tempo**   | Quantos dias de desenvolvimento? | > 3 dias → Agendar Sprint     |
| **Risco**   | Quebra requisitos existentes?    | Sim → Code review obrigatório |
| \*\*Resour  | Tem pessoas disponíveis?         | Sim → Viável                  |

### 2.3 Tipos de Mudanças

#### Tipo A - Correção (Sem Aprovação)

- Bugs identificados durante teste
- Clarificação de especificações
- Exemplos: Rejeitar voo inválido, validar campo obrigatório

#### Tipo B - Melhoria (Aprovação Orientador)

- Melhor UX identificada
- Otimização de performance
- Exemplos: Cache em frontend, índice em BD

#### Tipo C - Novo Requisito (Aprovação Full)

- Feature não planejada
- Mudança de escopo
- Exemplos: "dark mode", "export PDF"

#### Tipo D - Redução Escopo (Aprovação Orientador)

- Requisito descartado
- Priorização levou fora focoonto
- Exemplos: Removimento de RF-008, simplificação alertas

### 2.4 Formulário de Mudança (Change Request)

```
┌─ CHANGE REQUEST ─────────────────────────────────────┐
│                                                       │
│ ID: CR-2026-001                                       │
│ Data: 2026-04-15                                      │
│ Solicitante: Dev A                                    │
│ Tipo: B (Melhoria)                                    │
│ Prioridade: Médio                                     │
│                                                       │
│ Título: Cache em Listagem de Voos                    │
│                                                       │
│ Descrição:                                            │
│ Testes mostram latência alta ao listar voos.          │
│ Sugestão: Adicionar cache HTTP de 5 segundo.         │
│                                                       │
│ Impacto:                                              │
│ - Afeta: RF-008 (Dashboard),FrontEnd                     │
│ - Requisitos mudados: Nenhum (compat. completa)      │
│ - Comunidades de testes: +2 testes cache             │
│ - Tempo estimado: 2 horas                             │
│ - Risco: Baixo (isolado, cache é transparente)       │
│                                                       │
│ Benefício:                                            │
│ - Reduz latência 40-50%                              │
│ - Melhora responsividade                              │
│                                                       │
│ Decisão: ✅ APROVADO (08/04/2026 - Orientador)       │
│ Agendado: Sprint 5 (21/04/2026)                       │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 3. Versionamento de Requisitos

### 3.1 Schema de Versão

```
RF-001-v1.0 → RF-001-v2.0 → RF-001-v2.1
           ↓                ↓
      Mudança maior    Refinamento
```

**Exemplo**:

- RF-001-v1.0: "Gerenciar Aeronaves" (versão inicial)
- RF-001-v1.1: "Adicionar campo de observações" (CR-2026-002, 15/04)
- RF-001-v2.0: "Suportar importação CSV" (CR-2026-015, 01/05)

### 3.2 Changelog

```markdown
# Changelog - Requisitos

## RF-001: Gerenciamento de Aeronaves

### v1.1 - 2026-04-15

- Adicionado campo "observações" (max 500 chars)
- CR: CR-2026-002
- Impacto: +1 campo BD, +1 campo API

### v2.0 - 2026-05-01

- Adicionado suporte importação CSV de aeronaves
- CR: CR-2026-015
- Impacto: +1 endpoint API, +1 validação
```

Arquivo: `CHANGELOG.md` na raiz documentação

---

## 4. Status de Cada Requisito

### 4.1 Estados Possíveis

```
NOVO → ANÁLISE → PLANEJADO → EM EXECUÇÃO → TESTE → VALIDADO → FINALIZADO
  ↓        ↓         ↓          ↓          ↓       ↓        ↓
  │        │         │          │          │       │        │
  │        └─────── ADIADO      │          │       │        │
  │                  ↑           │          │       │        │
  │                  └───────────┼──────────┼───────┼────────┘
  │                              │          │       │
  └──────── CANCELADO ───────────┼──────────┼───────┘
```

### 4.2 Status Atual (09/04/2026)

| RF ID  | Nome | Status    | Sprint | % Done | Notes             |
| ------ | ---- | --------- | ------ | ------ | ----------------- |
| RF-001 | Aero | PLANEJADO | 2      | 0%     | Aguardando Sprint |
| RF-002 | Aero | VALIDADO  | 1      | 100%   | ✅ Deploy prod    |
| RF-003 | Voos | PLANEJADO | 2      | 0%     | Aguardando Sprint |
| RF-004 | Simu | PLANEJADO | 3      | 0%     | Após RF-003       |
| RF-005 | Mapa | PLANEJADO | 4      | 0%     | Após Simu         |
| RF-006 | Aler | PLANEJADO | 3      | 0%     | Paralelo RF-004   |
| RF-007 | Auth | VALIDADO  | 1      | 100%   | ✅ Deploy prod    |
| RF-008 | Dash | PLANEJADO | 4      | 0%     | Opcional v1.0     |
| RF-009 | Hist | PLANEJADO | 4      | 0%     | Opcional v1.0     |
| RF-010 | Impo | VALIDADO  | 1      | 100%   | ✅ Deploy prod    |

---

## 5. Matriz de Dependências

### 5.1 Grafo de Dependências

```
RF-002 (Aeroporto)
  ↓
RF-001 (Aeronaves) ──────┐
  ↓                       │
RF-003 (Voos) ◄──────────┘
  ↓
RF-004 (Simulação)
  ├─→ RF-009 (Histórico)
  │
RF-005 (Mapa)
  ↓
RF-006 (Alertas) ◄─ RF-004
  ↓
RF-008 (Dashboard)
        ↑
      RF-006

RF-007 (Auth) - Independente
RF-010 (Importação) - Independente
RNFs - Todos
```

### 5.2 Criticalidade

| Requisito | Critical Path? | Razão |
|-----------||----|
| RF-007 | ✅ SIM | Necessário para primeiro deploy |
| RF-002 | ✅ SIM | Base de dados |
| RF-003 | ✅ SIM | Core funcionalidade |
| RF-004 | ✅ SIM | Valor principal projeto |
| RF-005 | ✅ SIM | Visualização necessária |
| RF-001 | ⚠️ Médio | Pode ser simplificado |
| RF-006 | ⚠️ Médio | Nice-to-have se tempo |
| RF-008 | ❌ NÃO | Dashboards não críticos |
| RF-009 | ❌ NÃO | Histórico não crítico |
| RF-010 | ⚠️ Médio | Realismo, mas importável manual |

---

## 6. Gestão de Riscos Associados a Requisitos

### 6.1 Tabela de Riscos

| ID   | Risco                             | Probabilidade | Impacto | Mitigation                      |
| ---- | --------------------------------- | ------------- | ------- | ------------------------------- |
| R-01 | RF-004 mais complexo que esperado | 30%           | Alto    | Prototipagem SimPy em Sprint 0  |
| R-02 | Mudança escopo mid-project        | 50%           | Médio   | Change control process          |
| R-03 | Performance RF-005 não atende     | 20%           | Médio   | Testes WebSocket cedo           |
| R-04 | Dados OpenFlights incompletos     | 15%           | Baixo   | Fallback dados manuais          |
| R-05 | Requerimentos clarificação late   | 40%           | Médio   | Reviews semanais com orientador |

### 6.2 Plano de Response

Caso R-01 (RF-004 complexa):

- **Detectar**: Após primeira semana implem Sprint 3
- **Response**: Simplificar 1 fase detecção conflitos, estender Sprint 6
- **Owner**: Dev Lead

---

## 7. Rastreamento de Mudanças

### 7.1 Histórico de Mudanças (Exemplos)

```
─────────────────────────────────────────────────────
 Data      │ ID     │ Tipo │ O Que               │ Quem
─────────────────────────────────────────────────────
 09/04/26  │ CR-020 │  A   │ Esclarecido RF-003  │ Eq Dev
 15/04/26  │ CR-021 │  B   │ Adicion cache       │ Eq Dev
 22/04/26  │ CR-022 │  D   │ Removido RF-008 v1  │ Orientador
 28/04/26  │ CR-023 │  A   │ Bug alertas detect  │ Dev A
 05/05/26  │ CR-024 │  B   │ Novo ícone mapa     │ Dev B
─────────────────────────────────────────────────────
```

Arquivo: `/documentacao/MUDANCAS-REQUISITOS.xlsx` (ou CSV)

---

## 8. Comunicação e Raciocínio

### 8.1 Reuniões de Requisitos

**Frequência**: Semanal (toda terça 10h)  
**Duração**: 30 minutos  
**Participantes**: Orientador + Líderes Técnicos

**Agenda**:

1. Status de cada RF (2 min)
2. Issues ou bloqueadores (10 min)
3. CRs pendentes aprovação (5 min)
4. Planejamento próxima semana (10 min)
5. Q&A (3 min)

Ata: `/documentacao/atas-requisitos/`

### 8.2 Dashboards de Status

Atualizar toda sexta-feira:

```
Requisitos por Status:
- VALIDADO: 3 (RF-002, RF-007, RF-010)
- EM EXECUÇÃO: 0
- PLANEJADO: 6 (RF-001, RF-003, RF-004, RF-005, RF-006, RF-008)
- NOVO: 0

On-Time: 100% (tudo conforme cronograma)
Bloqueadores: 0
CRs Pendentes: 0
```

---

## 9. Checklist de Conclusão por Requisito

Quando um requisito é "finalizado", verificar:

- [ ] Especificação completa (doc 01-05)
- [ ] Implementação concluída (código)
- [ ] Testes ≥ 80% passing
- [ ] Code review aprovado
- [ ] Documentação atualizada
- [ ] Caso de uso em produção testado
- [ ] Rastreamento completo (requirements.md)
- [ ] Sign-off stakeholder (Orientador)
- [ ] Versão freezada (tag git)

---

## 10. Artefatos de Gestão

### 10.1 Arquivos Mantidos

```
documentacao/
├── 00-INDICE.md
├── 01-CONCEPCAO.md
├── 02-LEVANTAMENTO-REQUISITOS.md
├── 03-NEGOCIACAO-REQUISITOS.md
├── 04-ESPECIFICACAO-REQUISITOS.md
├── 05-VALIDACAO-REQUISITOS.md
├── 06-GESTAO-REQUISITOS.md
├── RASTREABILIDADE.md
├── CHANGELOG.md
├── MUDANCAS-REQUISITOS.csv
├── atas-requisitos/
│   ├── 2026-04-09.md
│   ├── 2026-04-16.md
│   └── ...
└── templates/
    ├── CHANGE-REQUEST.md
    └── STATUS-REPORT.md
```

### 10.2 Responsabilidades

| Role            | Responsabilidade                      |
| --------------- | ------------------------------------- |
| **Gerenciador** | Coordenar CRs, reuniões, comunicação  |
| **Dev Lead**    | Validar viabilidade, atualizar status |
| **QA Lead**     | Validação testes, rastreabilidade     |
| **Orientador**  | Aprovar CRs críticas, assinar-off     |

---

## 11. Comunicação e Escalonamento

### 11.1 Escalação de Issues

**Nível 1**: Equipe (pode resolver)  
**Nível 2**: Lead Técnico (1 dia)  
**Nível 3**: Orientador (2 dias)  
**Nível 4**: Gerência (5 dias)

### 11.2 Conflitos Não-Resolvidos

Exemplo: Dev quer adicionar feature, impacta cronograma

**Processo**:

1. Documentar issue (CR)
2. Listar opções (incluir feature, adiar, descartar)
3. Apresentar tópico orientador
4. Registrar decisão
5. Comunicar equipe

---

## 12. Lições Aprendidas e Melhoria Contínua

Após conclusão de cada sprint, reflectir:

- O que funcionou bem em gestão de requisitos?
- O que não funcionou ou foi difícil?
- Como melhorar no próximo sprint?

Documentar em `/documentacao/LICOES-APRENDIDAS.md`

2026-04-30 (Sprint 3):

```
+ Revisões semanais foram muito úteis
+ CRs nível B podem ser auto-aprovadas
- Precisamos de melhor rastreabilidade em testes
  → Action: Criar matriz RF x Testes no próximo sprint
```

---

## 13. Documentos Relacionados

- [05-VALIDACAO-REQUISITOS.md](05-VALIDACAO-REQUISITOS.md)
- [RASTREABILIDADE.md](RASTREABILIDADE.md)
- [CHANGELOG.md](CHANGELOG.md)

---

## 14. Assinaturas Finais

| Stakeholder | Aceita Plano? | Data       | Assinatura |
| ----------- | ------------- | ---------- | ---------- |
| Equipe Dev  | ✅ Sim        | 09/04/2026 | -          |
| Orientador  | ⏳ Pendente   | -          | -          |
| Gestor      | ⏳ Pendente   | -          | -          |

---

**Status**: Plano pronto para primeira reunião  
**Data Próxima Ata**: 16 de Abril de 2026

**Última Atualização**: 09 de Abril de 2026
