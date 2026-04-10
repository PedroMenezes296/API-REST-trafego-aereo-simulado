# 📊 Matriz de Rastreabilidade

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Documentado

---

## 1. Matriz Requisitos × Componentes

### Legenda

- ✅ = Implementado e testado
- 🔵 = Em design/especificação
- ⏳ = Planejado
- ❌ = Não iniciado

| RF ID   | Descrição           | Backend        | Frontend       | Simulador    | BD           | Testes | Status       |
| ------- | ------------------- | -------------- | -------------- | ------------ | ------------ | ------ | ------------ |
| RF-001  | Gerenciar Aeronaves | 🔵 CRUD        | 🔵 Tabela/Form | -            | 🔵 Tabela    | ⏳     | 🔵 Design    |
| RF-002  | Gerenciar Aeroporto | ✅ Endpoint    | 🔵 Info        | -            | ✅ Data      | ✅     | ✅ Validado  |
| RF-003  | Cadastro Voos       | 🔵 CRUD+Estado | 🔵 Form+Lista  | 🔵 Prcess    | 🔵 Tabela    | ⏳     | 🔵 Design    |
| RF-004  | Simulação T.Real    | 🔵 Service     | -              | 🔵 Core      | 🔵 History   | ⏳     | ⏳ Planejado |
| RF-005  | Mapa Interativo     | 🔵 WebSocket   | 🔵 Leaflet     | -            | 🔵 Telemetry | ⏳     | ⏳ Planejado |
| RF-006  | Alertas             | 🔵 Service+API | 🔵 Painel      | 🔵 Detector  | 🔵 Tabela    | ⏳     | ⏳ Planejado |
| RF-007  | Autenticação        | ✅ JWT         | ✅ Login       | -            | ✅ Usuarios  | ✅     | ✅ Validado  |
| RF-008  | Dashboard           | 🔵 Agregações  | 🔵 KPIs+Chart  | -            | -            | ⏳     | ⏳ Planejado |
| RF-009  | Histórico           | 🔵 Query       | 🔵 Visualizer  | 🔵 Store     | ✅ Tabela    | ⏳     | ⏳ Planejado |
| RF-010  | Importação          | ✅ Script      | -              | -            | ✅ Import    | ✅     | ✅ Validado  |
| RNF-001 | Performance         | 🔵 Otim.       | 🔵 Cache       | 🔵 Benchmark | 🔵 Índices   | ⏳     | ⏳ Planejado |
| RNF-002 | Escalabilidade      | 🔵 Archive     | -              | -            | 🔵 Sharding  | ⏳     | ⏳ Planejado |

---

## 2. Matriz Requisitos × Testes

| RF     | Teste Unitário        | Teste Integração   | Teste E2E           | Cobertura |
| ------ | --------------------- | ------------------ | ------------------- | --------- |
| RF-001 | ⏳ Criar aeronave     | ⏳ CRUD DB         | ⏳ UI form          | 0%        |
| RF-002 | ✅ Get aeroporto      | ✅ API endpoint    | ✅ UI carrega       | 95%       |
| RF-003 | ⏳ Transições estado  | ⏳ BD + API        | ⏳ Criar voo        | 0%        |
| RF-004 | ⏳ Telemetria gen     | ⏳ Simulador + BD  | ⏳ Voo completo     | 0%        |
| RF-005 | ⏳ Posição calced     | ⏳ WebSocket real  | ⏳ Mapa atualiza    | 0%        |
| RF-006 | ⏳ Proximidade detect | ⏳ Alertas BD      | ⏳ Notificação      | 0%        |
| RF-007 | ✅ JWT criar/validar  | ✅ Login flow      | ✅ UI auth          | 90%       |
| RF-008 | ⏳ KPI calcs          | ⏳ Agregações BD   | ⏳ Dashboard mostra | 0%        |
| RF-009 | ⏳ Query histórico    | ⏳ Compression     | ⏳ Timeline play    | 0%        |
| RF-010 | ⏳ CSV parse          | ✅ Import completo | ✅ Dados no BD      | 85%       |

**Total Cobertura Esperada**: 80%+

---

## 3. Requisitos × Sprints

### Sprint 1 (09-20 Abril)

- ✅ RFC-007: Autenticação JWT
- ✅ RF-002: Aeroporto
- ✅ RF-010: Importação dados

### Sprint 2 (21 Abril - 04 Maio)

- 🔵 RF-001: Aeronaves (CRUD)
- 🔵 RF-003: Voos (parte 1 - BD e API)

### Sprint 3 (05-18 Maio)

- ⏳ RF-004: Simulador (SimPy)
- ⏳ RF-006: Alertas (básico)
- ⏳ RF-003: Voos (parte 2 - integração simulador)

### Sprint 4 (19 Maio - 01 Junho)

- ⏳ RF-005: Mapa (Leaflet)
- ⏳ RF-008: Dashboard (KPIs)
- ⏳ RF-009: Histórico (básico)

### Sprint 5 (02-15 Junho)

- ⏳ Testes Não-Funcionais (Performance, Seg)
- ⏳ Validação Integração
- ⏳ User Acceptance Testing

### Sprint 6 (16-30 Junho)

- ⏳ Otimizações finais
- ⏳ Documentação
- ⏳ Testes regressão e sign-off

---

## 4. Requisitos × Arquivos de Código

| Requisito | Arquivos Backend                                                                | Arquivos Frontend                                  |
| --------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| RF-001    | `api/routes/aeronaves.py`, `services/aeronave_service.py`, `models/aeronave.py` | `pages/Aeronaves/*`, `hooks/useAeronaves.js`       |
| RF-003    | `api/routes/voos.py`, `services/voo_service.py`, `models/voo.py`                | `pages/Voos/*`, `components/FormularioCadastro/`   |
| RF-004    | `simulator/core.py`, `simulator/processes/`, `simulator/telemetry/`             | -                                                  |
| RF-005    | `api/websocket.py`                                                              | `components/Mapa.jsx`, `hooks/useMapa.js`          |
| RF-006    | `services/alerta_service.py`, `simulator/conflict_detection/`                   | `components/Alertas.jsx`, `store/alertaStore.js`   |
| RF-007    | `api/routes/auth.py`, `utils/jwt_utils.py`                                      | `pages/Auth/`, `context/AuthContext.js`            |
| RF-008    | `api/routes/dashboard.py` (agregações)                                          | `pages/Dashboard/`, `components/Cards/CardKPI.jsx` |
| RF-009    | `models/telemetria.py`                                                          | `pages/Voos/DetalheVoo.jsx`                        |

---

## 5. Rastreabilidade: Requisito → User Story → Teste

### Exemplo: RF-003 (Cadastro Voos)

```
REQUISITO: RF-003
│
├─→ USER STORY 1
│   └─ "Como despachador, quero criar novo voo"
│       ├─ Tela: CadastroVoo.jsx
│       ├─ API: POST /api/voos
│       ├─ Backend: VooService.criar_voo()
│       ├─ Teste Unitário: test_criar_voo_valido()
│       ├─ Teste Integração: test_criar_voo_db()
│       └─ Teste E2E: "User preenche form e voo é criado"
│
├─→ USER STORY 2
│   └─ "Como operador, quero ver status do voo"
│       ├─ Tela: ListaVoos.jsx / DetalheVoo.jsx
│       ├─ API: GET /api/voos, GET /api/voos/{id}
│       ├─ Backend: VooService.listar_voos(), VooService.get_voo()
│       ├─ Teste: test_listar_voos(), test_get_voo_detalle()
│       └─ Teste E2E: "User clica em voo e vê detalhes"
│
└─→ USER STORY 3
    └─ "Como operador, quero mudar estado do voo"
        ├─ Tela: DetalheVoo.jsx (botão "Avançar Estado")
        ├─ API: PUT /api/voos/{id}/estado
        ├─ Backend: VooService.atualizar_estado()
        ├─ Teste: test_transicao_estado_valida(), test_transicao_invalida()
        └─ Teste E2E: "Voo muda de PROGRAMADO para TAXIANDO"
```

---

## 6. Cobertura de Testes por Módulo

### Backend

| Módulo    | Arquivos       | Testes UNit. | Cobertura Alvo |
| --------- | -------------- | ------------ | -------------- |
| Auth      | `auth.py`      | 8            | 95%            |
| Aeronaves | `aeronaves.py` | 12           | 85%            |
| Voos      | `voos.py`      | 15           | 80%            |
| Simulador | `simulator/`   | 20           | 75%            |
| Alertas   | `alertas.py`   | 10           | 80%            |
| **Total** | -              | **65**       | **80%**        |

### Frontend

| Componente                | Testes | Cobertura |
| ------------------------- | ------ | --------- |
| Auth (Login)              | 5      | 90%       |
| Tabelas (Voos, Aeronaves) | 8      | 85%       |
| Formulários               | 10     | 80%       |
| Mapa                      | 6      | 70%       |
| Dashboard                 | 7      | 75%       |
| **Total**                 | **36** | **80%**   |

---

## 7. Validação de Requisitos Não-Funcionais

| RNF                      | Alvo             | Método Validação  | Status      |
| ------------------------ | ---------------- | ----------------- | ----------- |
| RNF-001 (Perf)           | Latência < 200ms | Apache Bench      | ⏳ Sprint 5 |
| RNF-002 (Escalabilidade) | 500 voos         | Load test SimPy   | ⏳ Sprint 5 |
| RNF-003 (Confiab)        | 99% uptime       | Monitor 24h       | ⏳ Sprint 6 |
| RNF-004 (Usabilidade)    | SUS ≥ 70         | Feedback usuários | ⏳ Sprint 5 |
| RNF-005 (Segurança)      | 0 vuln críticas  | OWASP scan        | ⏳ Sprint 5 |
| RNF-006 (Mantibilidade)  | Cobertura 80%    | Jest/Pytest       | ⏳ Sprint 5 |

---

## 8. Status Geral do Rastreamento

### Resumo por Categoria

```
Requisitos Funcionais (10):
  ✅ Concluídos e testados: 3 (RF-002, RF-007, RF-010)
  🔵 Em implementação: 0
  ⏳ Planejados: 7

Requisitos Não-Funcionais (8):
  ✅ Validados: 2
  ⏳ Pendentes validação: 6

Testes Totais:
  ✅ Passando: 23/65 (35%)
  ⏳ Planejados: 42/65
  Taxa de cobertura: 35% (alvo: 80%)

Sprints:
  ✅ Sprint 1: Concluído
  🔵 Sprint 2: Em andamento
  ⏳ Sprint 3-6: Planejadas
```

---

## 9. Documentos Relacionados

- [05-VALIDACAO-REQUISITOS.md](05-VALIDACAO-REQUISITOS.md)
- [06-GESTAO-REQUISITOS.md](06-GESTAO-REQUISITOS.md)
- [04-ESPECIFICACAO-REQUISITOS.md](04-ESPECIFICACAO-REQUISITOS.md)

---

**Última Atualização**: 09 de Abril de 2026
