# ✅ Fase 5: Validação de Requisitos

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ⏳ Planejado

---

## 1. Plano de Validação

### 1.1 Estratégia de Validação

**Objetivo**: Confirmar que requisitos especificados atendem necessidades reais

**Abordagens**:

- ✅ **Validação com Stakeholders**: Aprovar especificações
- ✅ **Prototipagem**: Validar UX/UI antes de build
- ⏳ **Testes Funcionais**: Validar implementação
- ⏳ **Testes Não-Funcionais**: Validar performance/segurança
- ⏳ **Testes de Aceitação**: Validar com usuário final
- ⏳ **Testes de Regressão**: Validar mudanças não quebram

### 1.2 Fases de Validação

| Fase                | Timing     | Responsável  | Artefato               |
| ------------------- | ---------- | ------------ | ---------------------- |
| **Especificação**   | Concluído  | Equipe Dev   | Docs 01-04             |
| **Prototipagem**    | Sprint 1-2 | Dev Frontend | Wireframes + Protótipo |
| **Implementação**   | Sprint 2-5 | Equipe Dev   | Código + Features      |
| **Execução**        | Sprint 5-6 | QA           | Relatórios Testes      |
| **Aprovação Final** | Sprint 6   | Orientador   | Sign-off               |

---

## 2. ChecklistBit de Requisitos

### Requisitos Funcionais

#### ✅ RF-001: Gerenciamento de Aeronaves

- [ ] Especificação clara (campos, validações)
- [ ] Mock API criado
- [ ] UI prototipada
- [ ] BD schema definido
- [ ] Casos de teste escritos
- [ ] Implementação concluída
- [ ] Testes passando ≥80%
- [ ] Aprovação stakeholder

**Data Alvo Conclusão**: Sprint 2 (23/04/2026)

#### ✅ RF-003: Cadastro de Voos

- [ ] Especificação clara (estados, transições)
- [ ] Diagrama de estados criado
- [ ] Mock API criado
- [ ] UI prototipada
- [ ] BD schema definido
- [ ] Casos de teste (estado transitions) escritos
- [ ] Implementação concluída
- [ ] Testes passando ≥80%
- [ ] Aprovação stakeholder

**Data Alvo Conclusão**: Sprint 2 (23/04/2026)

#### ⏳ RF-004: Simulação Tempo Real

- [ ] Especificação clara (fases, telemetria)
- [ ] Algoritmo prototipado em Jupyter
- [ ] Casos de teste parametrizados
- [ ] Integração BD-Simulador testada
- [ ] Implementação concluída
- [ ] Performance validada (100 voos < 10min)
- [ ] Testes passando ≥80%
- [ ] Aprovação stakeholder

**Data Alvo Conclusão**: Sprint 3 (30/04/2026)

#### ⏳ RF-005: Mapa Interativo

- [ ] Mockup Leaflet + Dados fake
- [ ] WebSocket integration testada
- [ ] Animações suaves (60 FPS test)
- [ ] Respons responsivo validado
- [ ] Casos de teste (interações) definidos
- [ ] Implementação concluída
- [ ] Testes passando ≥80%
- [ ] Aprovação stakeholder

**Data Alvo Conclusão**: Sprint 4 (07/05/2026)

#### ⏳ RF-006: Sistema de Alertas

- [ ] Especificação clara (tipos, severidade)
- [ ] Casos de teste (detecção proximidade) escritos
- [ ] Mock engine criado
- [ ] UI para alertas prototipada
- [ ] Lógica implementada
- [ ] Testes passando ≥80%
- [ ] Aprovação stakeholder

**Data Alvo Conclusão**: Sprint 3 (30/04/2026)

#### ✅ RF-007: Autenticação

- [ ] JWT flow documentado
- [ ] Casos de teste de segurança
- [ ] Implementação concluída
- [ ] Teste penetração (OWASP Top 10)
- [ ] Aprovação segurança

**Status**: Já implementado ✅

#### ⏳ RF-008: Dashboard

- [ ] Wireframe criado
- [ ] KPIs definidos
- [ ] Mockup com dados fake
- [ ] Queries de dados otimizadas
- [ ] Implementação concluída
- [ ] Testes passando ≥80%
- [ ] Aprovação stakeholder

**Data Alvo Conclusão**: Sprint 4 (07/05/2026)

#### ⏳ RF-009: Histórico Telemetria

- [ ] Especificação armazenamento
- [ ] BD schema para histórico
- [ ] Rotina backup definida
- [ ] Implementação concluída
- [ ] Testes de retenção de dados
- [ ] Aprovação

**Data Alvo Conclusão**: Sprint 4 (07/05/2026)

#### ✅ RF-010: Importação Aeroportos

- [ ] Especificação API OpenFlights
- [ ] Casos de teste (validação dados)
- [ ] Implementação concluída
- [ ] Sincronização testada
- [ ] Aprovação

**Status**: Já implementado ✅

---

## 3. Matriz de Rastreabilidade - Validação

| RF ID  | Implementado | Testado     | Validado    | Status Sprint |
| ------ | ------------ | ----------- | ----------- | ------------- |
| RF-001 | ⏳ Sprint 2  | ⏳ Sprint 2 | ⏳ Sprint 2 | In Design     |
| RF-002 | ✅ Sprint 1  | ✅ Sprint 1 | ✅ Sprint 1 | Validado      |
| RF-003 | ⏳ Sprint 2  | ⏳ Sprint 2 | ⏳ Sprint 2 | In Design     |
| RF-004 | ⏳ Sprint 3  | ⏳ Sprint 3 | ⏳ Sprint 5 | Planning      |
| RF-005 | ⏳ Sprint 4  | ⏳ Sprint 4 | ⏳ Sprint 5 | Planning      |
| RF-006 | ⏳ Sprint 3  | ⏳ Sprint 3 | ⏳ Sprint 5 | Planning      |
| RF-007 | ✅ Sprint 1  | ✅ Sprint 1 | ✅ Sprint 1 | Validado      |
| RF-008 | ⏳ Sprint 4  | ⏳ Sprint 4 | ⏳ Sprint 5 | Planning      |
| RF-009 | ⏳ Sprint 4  | ⏳ Sprint 4 | ⏳ Sprint 5 | Planning      |
| RF-010 | ✅ Sprint 1  | ✅ Sprint 1 | ✅ Sprint 1 | Validado      |

---

## 4. Critérios de Validação por Requisito

### RF-004: Simulação (Exemplo Detalhado)

**Requisito**: A simulação deve processar 100 voos em < 10 minutos

**Validação**:

```
Teste de Carga
├── Dados entrada: 100 voos, 24h simulado
├── Máquina teste: 8GB RAM, i5 2.4GHz
├── Métrica: Tempo elapsed
├── Critério aceito: < 10 minutos
└── Resultado esperado: ~8 min (80% utilização CPU)

Teste de Determinismo
├── Mesma entrada (seed #123)
├── Rodada 1: Output A
├── Rodada 2: Output A
└── Resultado: Idêntico (determinismo validado)

Teste de Precisão
├── Rota calculada vs Google Earth Distance
├── Erro aceitável: < 5%
└── Resultado: ±2% (aceito)
```

---

## 5. Testes de Aceitação - User Stories

### User Story 1: Operador monitora voos

**Como**: Operador  
**Quero**: Ver todos os voos do dia em tempo real no mapa  
**Para que**: Gerenciar tráfego aéreo

**Critério de Aceitação**:

```
Dado que estou logado como operador
E existem 5 voos programados para hoje
Quando acesso a página Dashboard
Então vejo:
  - Mapa carregado e centrado no aeroporto
  - 5 ícones de aeronaves (cores por status)
  - Cada ícone atualiza a cada segundo
  - Clico em uma aeronave, vejo popup { código, alt, vel }
E não:
  - Delay perceptível (> 1s entre clicks)
  - Erro ou congelamento da página
```

**Validação**:

- [ ] Ex um teste com dados reais
- [ ] Executar em 3 browsers diferentes
- [ ] Validar latência latência < 1s
- [ ] Obter sign-off do Operador (ator real/representante)

### User Story 2: Admin cria nova aeronave

**Como**: Admin  
**Quero**: Adicionar nova aeronave ao sistema  
**Para que**: Ela fique disponível para programar voos

**Critério de Aceitação**:

```
Dado que estou em "Gestão de Aeronaves"
Quando preencho:
  - Modelo: "Boeing 737-800"
  - Fabricante: "Boeing"
  - Matrícula: "PT-GXX"
  - Capacidade: 160 passageiros
E clico "Salvar"
Então:
  - Vejo mensagem "Aeronave criada com sucesso"
  - Aeronave aparece na listagem
  - Posso usar "PT-GXX" ao criar novo voo
```

**Validação**:

- [ ] Executar teste manual
- [ ] Verificar BD (registro persist)
- [ ] Tentar criar duplicata (deve rejeitar)
- [ ] Obter sign-off do Admin

---

## 6. Testes Não-Funcionais

### Performance

**Teste**: Latência API

```bash
# Ferramentas: Apache Bench
ab -n 100 -c 10 http://localhost:8000/api/voos

Rezultado esperado:
  Requests per second: > 50
  Latência média: < 200ms
  p95 latência: < 300ms
```

**Teste**: Carregamento Frontend

```bash
# Lighthouse
lighthouse http://localhost:5173 --view

Alvo:
  Performance: > 80
  Accessibility: > 90
  Best Practices: > 90
```

### Segurança

**Teste**: SQL Injection

```sql
-- Entrada maliciosa
input = "'; DROP TABLE voos; --"

Esperado:
  ✗ Query falhará com erro
  ✓ Tabela voos não será deletada
  ✓ Entrada será escapada/parametrizada
```

**Teste**: CSRF

```html
<!-- Form em domínio attacker.com -->
<form method="POST" action="http://nossa-app.com/delete-voo">
  <input type="hidden" name="voo_id" value="1" />
</form>

Esperado: ✗ Requisição rejeitada (CSRF token inválido)
```

---

## 7. Plano de Testes por Sprint

### Sprint 1: Validação Básica ✅

- [ ] Configuração base testada
- [ ] Autenticação funcionando
- [ ] Conexão BD OK
- [ ] Deploy local sem erros

### Sprint 2: Validação Entidades

- [ ] CRUD Aeronaves passando
- [ ] CRUD Voos passando
- [ ] Validações de entrada OK
- [ ] Coverage ≥ 75%

### Sprint 3: Validação Simulador

- [ ] Simulação roda sem erros
- [ ] 100 voos < 10 min validado
- [ ] Telemetria realista
- [ ] Detecta proximidade OK

### Sprint 4: Validação Frontend + Dashboard

- [ ] Mapa carrega e atualiza
- [ ] Alertas exibem corretamente
- [ ] Dashboard mostra KPIs
- [ ] Responsivo em mobile

### Sprint 5: Validação Integração

- [ ] Fim a fim (usuário completo voo)
- [ ] WebSocket latência < 50ms validada
- [ ] Load teste com 100 voos
- [ ] SUS Score ≥ 70 (usuários reais)

### Sprint 6: Validação Regressão + Aceita

- [ ] Todos testes anteriores passam
- [ ] Zero requisitos broken
- [ ] Demo com stakeholders
- [ ] Obter aprovação final

---

## 8. Assinatura de Aprovação

| Item                | Responsável | Data       | Status      |
| ------------------- | ----------- | ---------- | ----------- |
| **Plano Validação** | QA Lead     | 16/04/2026 | ⏳ Pendente |
| **Testes Não-Func** | Dev Lead    | 16/04/2026 | ⏳ Pendente |
| **User Stories**    | Orientador  | 16/04/2026 | ⏳ Pendente |
| **Validação Final** | Orientador  | 28/05/2026 | ⏳ Pendente |

---

## 9. Documentos Relacionados

- [04-ESPECIFICACAO-REQUISITOS.md](04-ESPECIFICACAO-REQUISITOS.md)
- [06-GESTAO-REQUISITOS.md](06-GESTAO-REQUISITOS.md)
- [RASTREABILIDADE.md](RASTREABILIDADE.md)

---

**Próxima Fase**: Gestão de Requisitos  
**Data Alvo**: 23 de Abril de 2026

**Última Atualização**: 09 de Abril de 2026
