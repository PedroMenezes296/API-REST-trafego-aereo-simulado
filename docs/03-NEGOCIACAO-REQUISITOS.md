# 🤝 Fase 3: Negociação de Requisitos

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Aprovado

---

## 1. Conflitos Identificados

### Conflito #1: Realismo vs. Simplicidade

**Descrição**: Há tensão entre criar simulação realista e manter código acessível  
**Stakeholders Envolvidos**: Equipe Dev, Orientador  
**Impacto**: Design de arquitetura, escolha de tecnologias

**Opções Consideradas**:

1. Simulação extremamente realista (cenários complexos)
2. Simulação simplificada (fácil de entender)
3. **Solução Adotada**: Modelagem realista com abstração de complexidades

**Resolução**:

- Usar SimPy para simplicidade sem perder realismo
- Documentar premissas de simulação
- Permitir extensões futuras
- Exemplos de casos avançados opcionais

### Conflito #2: Performance vs. Precisão de Dados

**Descrição**: Armazenar telemetria completa é custoso; simplificar reduz análise  
**Stakeholders Envolvidos**: Equipe Dev, Orientador (pesquisa)  
**Impacto**: Requisitos de BD, armazenamento

**Opções Consideradas**:

1. Armazenar 100% posições (alta precisão, alto custo)
2. Armazenar amostra (10x/min) (bom balanço)
3. Não armazenar, apenas calcular em tempo real (pouca análise)

**Resolução**:

- **Adotado**: Armazenar posições a cada 30 segundos
- Manter resolução completa em memória durante voo
- Compressão ao arquivo histórico após 24h
- Análise de dados posterior possível

### Conflito #3: Escopo - Múltiplos vs. Um Aeroporto

**Descrição**: Múltiplos aeroportos mais realista, mas 1 mais viável  
**Stakeholders Envolvidos**: Equipe Dev, Orientador, Orientação cronograma  
**Impacto**: Requisitos, arquitetura, timeline

**Opções Consideradas**:

1. Suportar múltiplos aeroportos desde início
2. Apenas um aeroporto (escopo reduzido)
3. Um aeroporto com preparação para futura expansão

**Resolução**:

- **Adotado**: Um aeroporto no escopo atual (RF-002 modificado)
- Arquitetura preparada para múltiplos (tabela airport_id, etc)
- Roadmap futuro: "Sprint 7: Suporte múltiplos aeroportos"
- Reduz complexidade, mantém extensibilidade

### Conflito #4: Linguagem/Framework - Python + Node vs. Java

**Descrição**: Equipe tem experts em multiple linguagens  
**Stakeholders Envolvidos**: Equipe Dev, Orientador  
**Impacto**: Produtividade, learning curve, manutenção

**Opções Consideradas**:

1. Tudo em Java (coesão, mas menos moderno)
2. Python backend + React frontend (moderno, stack separadas)
3. Node.js full-stack (consistência, mas menos expertise)

**Resolução**:

- **Adotado**: Python (FastAPI) + React (Node.js)
- Ambos têm suporte forte na comunidade
- Frontend deve ser web (maior alcance)
- Python ideal para simulação (SimPy)

### Conflito #5: BD - PostgreSQL vs. SQLite

**Descrição**: PostgreSQL é mais robusto; SQLite é mais simples para dev  
**Stakeholders Envolvidos**: Equipe Dev, Orientador  
**Impacto**: Setup, production-readiness, custo

**Opções Consideradas**:

1. PostgreSQL (production-ready, setup complexo)
2. SQLite (simples, limitado concorrência)
3. Ambos suportados (flexibilidade)

**Resolução**:

- **Adotado**: SQLite para desenvolvimento, PostgreSQL opcionalmente
- ORM (SQLAlchemy) suporta ambos
- Scripts de migração agnósticos
- Documentação tem instruções para ambas

---

## 2. Priorização Final e Trade-offs

### Trade-off #1: Tempo de Mercado vs. Qualidade

| Aspecto        | Chosen              | Descartado               |
| -------------- | ------------------- | ------------------------ |
| Extra testes   | Sim (80% cobertura) | 100% cobertura (tempo)   |
| Code review    | Sim (obrigatório)   | Rápido merge (qualidade) |
| Documentação   | Sim (completa)      | Mínima (compreensão)     |
| Refinamento UI | Bom                 | Perfeito (tempo)         |

**Decisão**: Qualidade vence; projeto acadêmico prioriza excelência

### Trade-off #2: Features vs. Estabilidade

| Requisito          | Decisão           | Sem Risco                          |
| ------------------ | ----------------- | ---------------------------------- |
| RF-009 (Histórico) | SHOULD → agora    | Beta: coleta, persiste no Sprint 4 |
| RF-008 (Dashboard) | SHOULD → Sprint 4 | KPIs simples no dia 1              |
| Alertas avançados  | COULD → Sprint 5  | Alertas básicos (proximidade)      |
| Relatórios PDF     | COULD → excluído  | CSV suportado                      |

**Decisão**: Liberar features MVPs, expandir depois; confiabilidade primeiro

### Trade-off #3: Complexidade vs. Extensibilidade

| Aspecto                  | Chosen               | Benefício                |
| ------------------------ | -------------------- | ------------------------ |
| Arquitetura modular      | Sim                  | Fácil adicionar features |
| Design patterns          | Sim (DI, Repository) | Testável e mantenível    |
| Config centralizada      | Sim                  | Fácil mudar parâmetros   |
| BD migrações versionadas | Sim                  | Histórico de mudanças    |

**Decisão**: Investir em boas práticas; paga no longo prazo

---

## 3. Requisitos Negociados - Versão Final

### Requisitos CONFIRMADOS ✅

#### Tier 1 - Critical Path (não podem ser alterados)

- ✅ RF-003: Cadastro de Voos - **SIM, sem mudanças**
- ✅ RF-004: Simulação Tempo Real - **SIM, sem mudanças**
- ✅ RF-007: Autenticação - **SIM, simplificado (sem 2FA nesta versão)**
- ✅ RNF-001: Performance - **SIM, com métricas revisadas**

#### Tier 2 - Importante (reduzido escopo aceito)

- ✅ RF-001: Gerenciar Aeronaves - **SIM, com validações reduzidas**
- ✅ RF-002: Gerenciar Aeroporto - **SIM, apenas 1 aeroporto fixo**
- ✅ RF-005: Mapa Interativo - **SIM, sem clustering nesta versão**
- ✅ RF-006: Alertas - **SIM, apenas proximidade + fila**

#### Tier 3 - Desejável (escopo expandido futuramente)

- 📋 RF-008: Dashboard - **Adiado para Sprint 4**
- 📋 RF-009: Histórico - **Parcial (básico), completo Sprint 4**
- 📋 RNF-008: Performance Simulação - **Otimizações no Sprint 6**

### Requisitos REMOVIDOS ❌

| Requisito              | Motivo                                       |
| ---------------------- | -------------------------------------------- |
| Integração ICAO real   | Fora do escopo acadêmico, requer credenciais |
| Sistema de faturamento | Não é necessário para simulação              |
| IA/ML para otimização  | Muito complexo, melhor em projeto futuro     |
| Mobile app nativa      | Web responsivo é suficiente                  |
| Previsão de clima      | Complexo, telemetria extensível permite isso |

### Requisitos ADICIONADOS 🆕

| Requisito                      | Motivo                        | Sprint |
| ------------------------------ | ----------------------------- | ------ |
| RF-010 (rev): Importação Dados | Aumenta realismo, dados reais | 2      |
| RNF-006: Mantibilidade         | Crítico para código limpo     | Todos  |
| RNF-007: Compatibilidade       | Múltiplos ambientes dev       | 1      |
| Documentação Completa          | Projeto acadêmico requer      | Todos  |

---

## 4. Escopo Revisado - "Escopo Final"

### In-Scope ✅ (Versão 1.0 - MVP)

- 1 aeroporto funcional
- Gerenciamento básico de entidades
- Simulação em tempo real (SimPy)
- Mapa interativo Vue 100% funcional
- Alertas básicos de proximidade
- Autenticação simples
- API REST documentada
- 80% cobertura de testes
- Documentação completa

### Out-of-Scope ❌ (Versão 1.0)

- Múltiplos aeroportos
- AI/ML para conflitos
- 2FA/MFA
- Offline mode
- Cache distribuído
- Clustering de aeronaves no mapa
- Relatórios PDF
- WebGL 3D visualization

### Roadmap para V2 📋

- Sprint 7+: Múltiplos aeroportos
- Sprint 8+: Dashboard avançado
- Sprint 9+: Otimizações performance
- Sprint 10+: Mobile app
- Sprint 11+: Integration externa

---

## 5. Matriz de Stakeholders - Aprovação

| Stakeholder            | Interesse         | Nível Aceitação | Assinatura      |
| ---------------------- | ----------------- | --------------- | --------------- |
| **Orientador**         | Qualidade técnica | Alto            | ⏳ Pendente     |
| **Equipe Dev**         | Viabilidade       | Alto            | ✅ Aprovado     |
| **Possíveis Usuários** | Usabilidade       | Médio           | ✅ Feedback +ve |
| **Instituição**        | Cronograma        | Médio           | ✅ Aprovado     |

---

## 6. Restrições Confirmadas

### Restrições Técnicas

- ✅ Python 3.11+, Node.js 18.x, PostgreSQL/SQLite ✅
- ✅ 1 dependência criticamente à versão (SimPy >= 4.1)

### Restrições Cronograma

- ✅ Prazo fixo: 16 semanas (1 semestre)
- ✅ Sprints 2 semanas (sujeitas a ajuste)

### Restrições Pessoas

- ✅ Equipe: 1 dev backend + 1 dev frontend + 1 full-stack
- ✅ Orientador: 1h/semana reviews

### Restrições Funcionalidade

- ✅ Apenas 1 aeroporto focado
- ✅ Max 100 voos simultâneos (V1)
- ✅ Max 10 usuários concorrentes

---

## 7. Critérios de Aceitação Ajustados

### Para Requisitos RF

| RF     | Critério (Versão Final)                              |
| ------ | ---------------------------------------------------- |
| RF-001 | ≥5 tipos aeronave cadastráveis, validação básica     |
| RF-002 | 1 aeroporto fixo, 100% dados realistas               |
| RF-003 | Criar/ler/atualizar/deletar voos, sem limite teórico |
| RF-004 | Simular em tempo real, fases corretas, rota gerada   |
| RF-005 | Mapa com ≥3 interações (zoom, pan, popup)            |
| RF-006 | Detectar proximidade <1000ft, persistir alertas      |
| RF-007 | JWT simples, 3 papéis (Admin, Operador, View)        |
| RF-008 | KPIs home page: voos hoje, alertas, taxa sucesso     |
| RF-009 | Histórico 24h mínimo, traço de rota visível          |
| RF-010 | Importar ≥1000 aeroportos, validar dados             |

---

## 8. Documentos Relacionados

- [02-LEVANTAMENTO-REQUISITOS.md](02-LEVANTAMENTO-REQUISITOS.md)
- [04-ESPECIFICACAO-REQUISITOS.md](04-ESPECIFICACAO-REQUISITOS.md)
- [ARQUITETURA.md](ARQUITETURA.md)

---

## 9. Aprovações Finais

| Item                  | Aprovador  | Data       | Status        |
| --------------------- | ---------- | ---------- | ------------- |
| **Escopo Negociado**  | Equipe Dev | 09/04/2026 | ✅ OK         |
| **Priorização**       | Equipe Dev | 09/04/2026 | ✅ OK         |
| **Trade-offs**        | Equipe Dev | 09/04/2026 | ✅ OK         |
| **Requisitos Finais** | Orientador | -          | ⏳ Aguardando |

---

**Próxima Fase**: Especificação de Requisitos  
**Data Alvo**: 16 de Abril de 2026

**Última Atualização**: 09 de Abril de 2026
