# 🏛️ Arquitetura do Sistema

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Aprovado

---

## 1. Visão Geral da Arquitetura

### 1.1 Diagrama Arquitetura em Camadas

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (UI/UX)                         │
│  React + Vite + Tailwind CSS + Leaflet.js + Zustand         │
│  • Dashboard                                                 │
│  • Mapa Interativo                                           │
│  • Gerenciamento Entidades                                   │
│  • Relatórios/Gráficos                                       │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ HTTP/WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    API REST + WebSocket                       │
│              FastAPI + SQLAlchemy + Pydantic                 │
│  • Rotas HTTP (GET, POST, PUT, DELETE)                      │
│  • WebSocket para atualizações tempo real                    │
│  • Validação de entrada                                      │
│  • Autenticação JWT                                          │
│  • Tratamento de erros                                       │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ ORM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                CAMADA DE NEGÓCIO (Services)                   │
│  • VooService (criar, atualizar, listar voos)               │
│  • AeroportoService (gerenciar aeroporto)                    │
│  • AeronaveService (gerenciar aeronaves)                     │
│  • AlertaService (detectar e registrar alertas)              │
│  • SimuladorService (orquestrar SimPy)                       │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ Eventos
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              MOTOR DE SIMULAÇÃO (SimPy)                       │
│  • Gerenciador de Eventos                                    │
│  • Processos de Voo (ProcessoVoo)                            │
│  • Gerador de Telemetria                                     │
│  • Detecção de Proximidade                                   │
│  • Histórico de Estados                                      │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ SQL
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   BANCO DE DADOS                              │
│  PostgreSQL/SQLite com SQLAlchemy ORM                        │
│  • Tabelas: Aeronaves, Voos, Aeroportos, Alertas, Telemetria│
│  • Índices para queries frequentes                           │
│  • Retenção: 30 dias telemetria, histórico completo voos    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Componentes Principais

### 2.1 Frontend (React)

**Responsabilidades**:

- Renderizar UI e páginas
- Capturar inputs do usuário
- Exibir dados em tempo real
- Gerenciar estado local

**Estrutura**:

```
src/
├── components/
│   ├── Layout.jsx
│   ├── Mapa.jsx
│   ├── Dashboard.jsx
│   ├── FormularioCadastro/
│   ├── Alertas.jsx
│   └── ...
├── pages/
│   ├── Home/
│   ├── Dashboard/
│   ├── Voos/
│   └── ...
├── hooks/
│   ├── useWebSocket.js
│   ├── useAPI.js
│   └── ...
├── context/
│   ├── AuthContext.js
│   ├── AplicationContext.js
│   └── ...
├── utils/
│   ├── api.js
│   ├── formatters.js
│   └── ...
└── App.jsx
```

**Padrões**:

- Component-based
- Hooks (useState, useEffect, custom)
- Context API + Zustand para estado global
- Controlled components para forms

---

### 2.2 Backend (FastAPI)

**Responsabilidades**:

- Processar requisições HTTP
- Executar lógica de negócio
- Persistir dados em BD
- Orquestrar simulador

**Estrutura**:

```
backend/app/
├── main.py (ponto entrada, configs)
├── api/
│   ├── routes/
│   │   ├── voos.py
│   │   ├── aeronaves.py
│   │   ├── aeroporto.py
│   │   ├── alertas.py
│   │   └── auth.py
│   └── WebSocket.py
├── models/
│   ├── voo.py
│   ├── aeronave.py
│   ├── aeroporto.py
│   ├── alerta.py
│   └── usuario.py
├── schemas/
│   ├── voo.py (Pydantic)
│   ├── aeronave.py
│   └── ...
├── services/
│   ├── voo_service.py
│   ├── aeronave_service.py
│   ├── simulador_service.py
│   └── alerta_service.py
├── database/
│   ├── connection.py
│   └── engine.py
└── utils/
    ├── jwt_utils.py
    ├── validators.py
    └── exceptions.py
```

**Padrões**:

- Repository Pattern (acesso dados)
- Service Pattern (lógica negócio)
- DTO (schemas Pydantic)
- Dependency Injection (FastAPI Depends)

---

### 2.3 Simulador (SimPy)

**Responsabilidades**:

- Orquestrar eventos temporais
- Executar processos de voo em paralelo
- Gerar telemetria realista
- Detectar conflitos de proximidade

**Estrutura**:

```
backend/app/simulator/
├── __init__.py
├── core.py (classe Simulador)
├── processes/
│   └── voo_process.py
├── telemetry/
│   ├── generator.py
│   └── trajectory.py
├── conflict_detection/
│   └── proximity_checker.py
└── config/
    └── simulation_config.py
```

**Padrões**:

- Event-driven
- Process-based (SimPy generator functions)
- State machine (para fase de voo)

---

### 2.4 Banco de Dados

**Modelo Entidade-Relacionamento**:

```
┌─────────────────┐
│    Usuario      │
├─────────────────┤
│ id (PK)         │
│ email (UNIQUE)  │
│ password_hash   │
│ papel           │
│ criado_em       │
└─────────────────┘

┌──────────────────┐
│    Aeroporto     │
├──────────────────┤
│ id (PK)          │
│ nome             │
│ icao_code        │ (UNIQUE)
│ iata_code        │ (UNIQUE)
│ latitude         │
│ longitude        │
│ pistas           │ (JSON array)
│ status           │ (enum)
└──────────────────┘

┌──────────────────┐         ┌────────────────┐
│    Aeronave      │─────┬──→│       Voo      │
├──────────────────┤     │   ├────────────────┤
│ id (PK)          │     │   │ id (PK)        │
│ matricula (UK)   │     │   │ codigo_voo (UK)│
│ modelo           │     │   │ aeroporto_id (FK)
│ fabricante       │     │   │ aeronave_id(FK)│
│ capacidade       │     │   │ tipo_operacao  │
│ status           │     │   │ status (FK)    │
└──────────────────┘     │   │ horario_prev   │
                         │   │ horario_real   │
                         │   │ prioridade     │
                         │   │ emergencia     │
                         │   │ criado_em      │
                         │   └────────────────┘
                         │
                         └─┐
                           ▼
                    ┌──────────────────┐
                    │   Telemetry      │
                    ├──────────────────┤
                    │ id (PK)          │
                    │ voo_id (FK)      │
                    │ timestamp        │
                    │ latitude         │
                    │ longitude        │
                    │ altitude         │
                    │ velocidade       │
                    │ direcao          │
                    └──────────────────┘

┌──────────────────┐     ┌──────────────────┐
│     Alerta       │────►│   TipoAlerta     │
├──────────────────┤     ├──────────────────┤
│ id (PK)          │     │ id (PK)          │
│ tipo (FK)        │     │ nome (UNIQUE)    │
│ voo_id (FK-opt)  │     │ severidade       │
│ mensagem         │     │ descricao        │
│ timestamp        │     └──────────────────┘
│ resolvido        │
└──────────────────┘
```

---

## 3. Fluxos Principais

### 3.1 Fluxo: Criar e Simular Voo

```
1. FRONTEND (Usuário)
   └─► Preenche formulário (aeronave, horário, tipo)
       └─► POST /api/voos/

2. BACKEND (FastAPI)
   └─► Valida entrada (Pydantic)
   └─► Chama VooService.criar_voo()
       └─► Persiste voo em BD (status=PROGRAMADO)
       └─► Retorna JSON { id, codigo_voo, ... }
       └─► WebSocket broadcast: "novo voo criado"

3. SIMULADOR (SimPy)
   └─► Registra novo processo para voo
   └─► Agenda evento para horário_previsto
   └─► Clock avança...
   └─► Dispara evento: Voo pronto pra sair
       └─► ProcessoVoo.executar() começa
       └─► Estado: PROGRAMADO → TAXIANDO
       └─► Gera telemetria
       └─► Atualiza BD
       └─► WebSocket: "voo taxiando, lat=..., lon=..."

4. FRONTEND (Dashboard/Mapa)
   └─► Recebe WebSocket mensagem
   └─► Atualiza estado local
   └─► Re-renderiza ícone no mapa
   └─► Usuário vê movimento em tempo real
```

### 3.2 Fluxo: Detectar Proximidade

```
1. TELEMETRY GENERATOR (a cada segundo)
   └─► Calcula posição de cada voo
   └─► Armazena em "voos_em_ar" dict

2. CONFLICT_DETECTION
   └─► Itera todos pares de voos (O(n²) otimizável)
   └─► Calcula distância entre (lat1, lon1) e (lat2, lon2)
   └─► Se distância < THRESHOLD (1000 ft):
       └─► Cria Alerta
       └─► Persiste em BD
       └─► Enqueue para WebSocket broadcast

3. BACKEND -> FRONTEND
   └─► WebSocket: {"tipo": "proximidade", "voos": [id1, id2], ...}

4. FRONTEND
   └─► Muda cores ícones para VERMELHO
   └─► Exibe notificação toast "Alerta: Proximidade!"
   └─► Usuário toma ação
```

---

## 4. Padrões de Comunicação

### 4.1 HTTP Request/Response

```json
// POST /api/voos/
// Request
{
  "aeronave_id": 1,
  "tipo_operacao": "saida",
  "horario_previsto": "2026-04-09T14:30:00Z",
  "prioridade": 5
}

// Response 201 Created
{
  "id": 42,
  "codigo_voo": "VM-SA-0001",
  "status": "PROGRAMADO",
  "aeronave": {...},
  "horario_previsto": "2026-04-09T14:30:00Z",
  "criado_em": "2026-04-09T09:15:00Z"
}
```

### 4.2 WebSocket (Real-time)

```javascript
// Client connects
ws = new WebSocket("ws://localhost:8000/ws/voos");

// Receive telemetry update
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // {
  //   "tipo": "telemetria_atualizada",
  //   "voo_id": 42,
  //   "posicao": { lat: -23.5505, lon: -46.6333, alt: 5000 },
  //   "status": "CRUZEIRO"
  // }
};

// Receive alert
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // {
  //   "tipo": "alerta_proximidade",
  //   "voo_id_1": 42,
  //   "voo_id_2": 43,
  //   "distancia": 850,
  //   "severidade": "CRITICO"
  // }
};
```

---

## 5. Decisões de Arquitetura

### ADR-001: Usar SimPy para Simulação

**Status**: ✅ Aprovado  
**Contexto**: Precisamos simular múltiplos voos simultâneos  
**Opções**:

1. Threads (complexo, GIL)
2. Async/Await (menos elegante)
3. **SimPy** (pronto para eventos discretos) ✅

**Consequências**:

- ✅ Código limpo e descritivo
- ✅ Sem problemas de concorrência
- ⚠️ Requer aprender SimPy

---

### ADR-002: Separar Frontend/Backend

**Status**: ✅ Aprovado  
**Contexto**: Melhor escalabilidade e manutenção  
**Opções**:

1. Monolito (Django template rendering)
2. **Separado** (API + SPA) ✅

**Consequências**:

- ✅ Fácil escalar cada parte
- ✅ Deploy independente
- ⚠️ Overhead CORS/auth JWT

---

### ADR-003: Usar WebSocket para Tempo Real

**Status**: ✅ Aprovado  
**Contexto**: Necessário atualizar posições continuamente  
**Opções**:

1. Polling (ineficiente)
2. **WebSocket** (bidirecional) ✅

**Consequências**:

- ✅ Latência baixa
- ✅ Consumo de banda reduzido
- ⚠️ Conexão stateful (precisa de Redis publisher em escala)

---

## 6. Segurança

### 6.1 Camadas de Segurança

```
┌─────────────────────────┐
│  Frontend               │
│  • Validação inputs     │
│  • Sanitização HTML     │
│  • SPA (XSS mitigado)   │
└─────────────────────────┘
         ▼
┌─────────────────────────┐
│  Transporte             │
│  • HTTPS (TLS 1.2+)     │
│  • Header security      │
└─────────────────────────┘
         ▼
┌─────────────────────────┐
│  API Gateway            │
│  • Rate limiting        │
│  • CORS policy          │
│  • JWT validation       │
└─────────────────────────┘
         ▼
┌─────────────────────────────────┐
│  Backend                        │
│  • Pydantic validation          │
│  • SQL injection protection (ORM)
│  • Authorization checks         │
│  • Audit logging                │
└─────────────────────────────────┘
         ▼
┌─────────────────────────╗
│  Banco de Dados         ║
│  • Permissões RLS       ║
│  • Backups criptografados
│  • Retenção confor LGPD ║
└─────────────────────────╝
```

---

## 7. Performance e Escalabilidade

### 7.1 Otimizações Implementadas

- ✅ Índices em BD (voos.status, voos.aeroporto_id)
- ✅ Caching HTTP headers (5s para listagens)
- ✅ Compressão Gzip respostas API
- ✅ Lazy loading componentes React
- ⏳ Redis cache (V2): dados frequentes

### 7.2 Limites Atuais

| Aspecto            | Limite     | Depois  |
| ------------------ | ---------- | ------- |
| Voos simultâneos   | 100        | 500+    |
| Usuários           | 10         | 50+     |
| Telemetria/segundo | 100 pontos | 1000+   |
| Storage histórico  | 30 dias    | 90 dias |

---

## 8. Documentos Relacionados

- [BACKEND-API.md](BACKEND-API.md)
- [FRONTEND.md](FRONTEND.md)
- [MODELOS-DADOS.md](MODELOS-DADOS.md)
- [SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)

---

**Última Atualização**: 09 de Abril de 2026
