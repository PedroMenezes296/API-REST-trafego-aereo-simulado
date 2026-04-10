# 📐 Fase 4: Especificação de Requisitos

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Aprovado

---

## 1. Especificação Detalhada de Requisitos Funcionais

### RF-001: Gerenciamento de Aeronaves

**ID**: RF-001  
**Nome**: Gerenciamento de Aeronaves  
**Tipo**: Funcional  
**Prioridade**: ALTA  
**Status**: Especificado ✅

#### 1.1 Descrição Completa

O sistema deve permitir ao administrador gerenciar informações de aeronaves disponíveis na frota. Cada aeronave é uma entidade única identificada por matrícula (registration) e pode ser utilizada em múltiplos voos ao longo do tempo.

#### 1.2 Atores Envolvidos

- **Admin**: Pode criar, ler, atualizar e deletar
- **Operador**: Pode visualizar (leitura)
- **Visualizador**: Pode visualizar (leitura)

#### 1.3 Fluxo Principal

```
1. Admin em dashboard de gestão
2. Clica "Nova Aeronave"
3. Preenche formulário com dador:
   - Modelo (ex: Boeing 737-800)
   - Fabricante (ex: Boeing)
   - Matrícula/Registration (ex: PT-GUP) [ÚNICA]
   - Capacidade de passageiros (ex: 160)
   - Status inicial (ativo/inativo)
4. Sistema valida dados
5. Registra no BD
6. Exibe confirmação
```

#### 1.4 Campos de Dados Requeridos

| Campo                  | Tipo     | Validação                    | Requerido |
| ---------------------- | -------- | ---------------------------- | --------- |
| modelo                 | String   | Max 100 chars                | ✅ Sim    |
| fabricante             | String   | Max 100 chars                | ✅ Sim    |
| matricula              | String   | Formato XX-XXX (ICAO), única | ✅ Sim    |
| capacidade_passageiros | Integer  | > 0, ≤ 800                   | ✅ Sim    |
| status                 | Enum     | {ativo, inativo, manutenção} | ✅ Sim    |
| data_criacao           | DateTime | Auto-gerada                  | ✅ Sim    |
| data_atualizacao       | DateTime | Auto-gerada                  | ✅ Sim    |

#### 1.5 Critérios de Aceitação

- [ ] Criar nova aeronave com validação de campos
- [ ] Matrícula única validada em BD (constraint UNIQUE)
- [ ] Editar informações de aeronave existente
- [ ] Deletar aeronave (soft delete - marcar inativa)
- [ ] Listar aeronaves com filtros (status, modelo)
- [ ] Validação de entrada: nenhuma aeronave com valores nulos
- [ ] Auditoria: log de quem criou/modificou cada aeronave

#### 1.6 Casos de Teste

```
CT-RF001-01: Criar aeronave válida
Entrada: modelo="B737", fabricante="Boeing", matricula="PT-GUP", cap=160
Esperado: Aeronave criada, lista atualizada, mensagem sucesso

CT-RF001-02: Rejeitar matrícula duplicada
Entrada: matricula="PT-GUP" (já existe)
Esperado: Erro validação, aeronave não criada

CT-RF001-03: Validar campo requerido
Entrada: modelo="", fabricante="Boeing", matricula="PT-XYZ", cap=160
Esperado: Erro validação, campo obrigatório

CT-RF001-04: Deletar aeronave sem voos
Entrada: aeronave_id=5 (sem voos)
Esperado: Aeronave deletada, não aparece em listagens

CT-RF001-05: Rejeitar deletar aeronave com voos
Entrada: aeronave_id=1 (existe 2 voos)
Esperado: Err, você não pode deletar aeronave com voos ativos
```

#### 1.7 Endpoints API

```
POST /api/aeronaves
  Body: { modelo, fabricante, matricula, capacidade_passageiros, status }
  Resposta: 201 { id, ... dados ... }

GET /api/aeronaves
  Query: ?status=ativo&modelo=B737
  Resposta: 200 [ { id, modelo, ... } ]

GET /api/aeronaves/{id}
  Resposta: 200 { id, modelo, ... }

PUT /api/aeronaves/{id}
  Body: { modelo, fabricante, ... }
  Resposta: 200 { id, ... dados atualizados ... }

DELETE /api/aeronaves/{id}
  Resposta: 204 NoContent
```

---

### RF-003: Cadastro de Voos

**ID**: RF-003  
**Nome**: Cadastro e Gerenciamento de Voos  
**Tipo**: Funcional  
**Prioridade**: CRÍTICA  
**Status**: Especificado ✅

#### 3.1 Descrição Completa

O sistema deve permitir criar, gerenciar e rastrear voos. Um voo representa uma operação de pouso ou decolagem e evolui através de múltiplos estados ao longo do tempo.

#### 3.2 Estados de Voo

```
Sequência de Estados:
  PROGRAMADO (inicial)
       ↓
  TAXIANDO (movimento no solo)
       ↓
  DECOLANDO (saindo do solo) OU APROXIMACAO (chegando)
       ↓
  CRUZEIRO (em voo)
       ↓
  APROXIMACAO (descendo) OU POUSO (chegando)
       ↓
  FINALIZADO (completo)

Estados Alternativos:
  CANCELADO (em qualquer ponto)
  ADIADO (em PROGRAMADO)
  EMERGENCIA (transição forçada)
```

#### 3.3 Estrutura de Dados

| Campo            | Tipo     | Validação            | Descrição                |
| ---------------- | -------- | -------------------- | ------------------------ |
| codigo_voo       | String   | Formato "VM-XX-YYYY" | Identificador único      |
| aeronave_id      | Integer  | FK válida            | Qual aeronave            |
| tipo_operacao    | Enum     | {chegada, saida}     | Pouso ou decolagem       |
| status           | Enum     | [ver Tabela Estados] | Estado atual             |
| horario_previsto | DateTime | >= agora             | Hora programada          |
| horario_real     | DateTime | NULL até realizado   | Hora atual               |
| altitude_atual   | Integer  | 0-45000 ft           | Altitude em tempo real   |
| latitude_atual   | Float    | -90 a +90            | Posição em tempo real    |
| longitude_atual  | Float    | -180 a +180          | Posição em tempo real    |
| velocidade_atual | Float    | >= 0 km/h            | Velocidade em tempo real |
| prioridade       | Integer  | 0-10                 | Nível de prioridade      |
| emergencia       | Boolean  | false por default    | É emergência?            |
| observacoes      | Text     | Max 500 chars        | Notas livres             |
| data_criacao     | DateTime | Auto                 | Quando foi criado        |

#### 3.4 Critérios de Aceitação

- [ ] Criar voo com dados válidos
- [ ] Estados transitam corretamente (PROGRAMADO→TAXIANDO→...)
- [ ] Horário real só pode ser preenchido após decolagem/pouso
- [ ] Rejeitar voo com aeronave inexistente
- [ ] Impossível criar 2 voos mesma aeronave mesma hora (overlap)
- [ ] Prioridade pode ser ajustada por operador
- [ ] Emergência marca voo como crítico (alertas diferenciados)
- [ ] Histórico completo de mudanças de estado

#### 3.5 Endpoints API

```
POST /api/voos
  Body: { aeronave_id, tipo_operacao, horario_previsto, prioridade }
  Resposta: 201 { id, codigo_voo, status: "PROGRAMADO", ... }

GET /api/voos
  Query: ?status=ATIVO&tipo=chegada&data=2026-04-09
  Resposta: 200 [ { id, codigo_voo, status, ... } ]

GET /api/voos/{id}
  Resposta: 200 { id, codigo_voo, telemetria_atual: {lat, lon, alt}, ... }

PUT /api/voos/{id}/estado
  Body: { novo_estado: "DECOLANDO" }
  Resposta: 200 { id, status: "DECOLANDO", horario_real: ... }

PUT /api/voos/{id}/prioridade
  Body: { prioridade: 8 }
  Resposta: 200 { id, prioridade: 8 }

PUT /api/voos/{id}/emergencia
  Body: { emergencia: true, motivo: "Falha motor" }
  Resposta: 200 { id, emergencia: true, ... }

GET /api/voos/{id}/historico
  Resposta: 200 [ { timestamp, estado_anterior, estado_novo, usuario } ]
```

---

### RF-004: Simulação de Voos em Tempo Real

**ID**: RF-004  
**Nome**: Motor de Simulação em Tempo Real  
**Tipo**: Funcional  
**Prioridade**: CRÍTICA  
**Status**: Especificado ✅

#### 4.1 Descrição Completa

O sistema deve simular a evolução de voos usando um motor baseado em eventos discretos (SimPy). Cada voo progride através de fases, gerando telemetria realista.

#### 4.2 Componentes de Simulação

**4.2.1 Motor (SimPy)**

- Função: Orquestrar eventos e tempo simulado
- Inicialização: A cada novo dia ou reset
- Sincronização: 1:1 com tempo real (1 segundo simulado = 1 segundo real)
- Estados salvos: Permitir pause/resume
- Determinismo: Mesma seed = mesma simulação

**4.2.2 Processo de Voo (SimPy Process)**

```python
class ProcessoVoo:
  def __init__(self, voo_id, origem, destino, aeronave):
    self.voo_id = voo_id
    # ... inicializar

  def executar(self):
    # Fazefraser 1: PROGRAMADO
    yield self.sim.timeout(delay_aleatorio)

    # Fase 2: TAXIANDO (2-5 min)
    yield self.sim.timeout(taxa_taxa)
    self.atualizar_posicao(velocidade=10)

    # Fase 3: DECOLANDO (2-3 min)
    yield self.sim.timeout(tempo_decolagem)
    self.status = "DECOLANDO"
    self.atualizar_posicao(velocidade=250, altitude+=1000)

    # Fase 4: CRUZEIRO (varia conforme rota)
    yield self.sim.timeout(tempo_cruzeiro)
    self.status = "CRUZEIRO"
    self.atualizar_posicao(velocidade=500, rota_direta())

    # Fase 5: APROXIMACAO (5-10 min)
    yield self.sim.timeout(tempo_aprox)
    self.status = "APROXIMACAO"
    self.atualizar_posicao(velocidade=decrementando, altitude-=2000)

    # Fase 6: POUSO (3-5 min)
    yield self.sim.timeout(tempo_pouso)
    self.status = "FINALIZADO"
    self.horario_real = sim.agora()
```

#### 4.3 Geração de Telemetria

**Algoritmo de Posição**

```
1. Origem: lat_origem, lon_origem, alt=0
2. Destino: lat_destino, lon_destino, alt=35000 ft (cruzeiro)
3. Para cada tick de simulação:
   - Calcular ponto na rota (interpolação linear com ruído Gaussian)
   - Aplicar altitude conforme fase do voo
   - Aplicar velocidade conforme fase
   - Adicionar pequeno ruído random (realismo)
   - Armazenar: lat, lon, alt, vel, heading, timestamp
```

**Fórmula Grande-circle para rota real**

```
distance = acos(
  sin(lat1) * sin(lat2) +
  cos(lat1) * cos(lat2) * cos(lon2 - lon1)
) * R_TERRA

bearing = atan2(
  sin(lon2-lon1) * cos(lat2),
  cos(lat1) * sin(lat2) - sin(lat1) * cos(lat2) * cos(lon2-lon1)
)
```

#### 4.4 Critérios de Aceitação

- [ ] Voo passa por todas fases na ordem correta
- [ ] Telemetria gerada realista (sem saltos brutos)
- [ ] Simulação de 100 voos roda em < 10 min (24h simulado)
- [ ] Mesma seed gera mesma sequência (determinismo)
- [ ] Pause/resume sem perda de estado
- [ ] Ruído gaussiano em telemetria (v ~ N(μ, σ²))
- [ ] Detecta e evita colisões (repensar trajeto)

#### 4.5 Configuração de Simulação

```yaml
# simulation_config.yaml
timeline:
  velocidade_real: 1.0 # 1x tempo real
  velocidade_rapida: 4.0 # 4x (fast-forward)
  timestamp_inicio: "2026-04-09 06:00:00"

voo:
  tempo_taxa: [2, 5] # min, random entre min-max
  tempo_decolagem: [3, 4] # min
  tempo_cruzeiro_base: 45 # minutos (varia por rota)
  tempo_aproximacao: [5, 8] # min
  tempo_pouso: [3, 5] # min

telemetria:
  altitude_cruzeiro: 35000 # feet
  velocidade_cruzeiro: 450 # knots
  ruído_sigma: 0.01 # desvio padrão
  taxa_atualizacao: 1 # segundos
```

---

### RF-005: Mapa Interativo

**ID**: RF-005  
**Nome**: Visualização em Mapa Interativo  
**Tipo**: Funcional  
**Prioridade**: ALTA  
**Status**: Especificado ✅

#### 5.1 Tecnologia

- **Biblioteca**: Leaflet.js + OpenStreetMap
- **Integrações**: OpenWeather (opcional)
- **Performance**: WebGL quando possível

#### 5.2 Camadas do Mapa

```
Camadas (toggleáveis):
├── Base
│   ├── OpenStreetMap (Padrão)
│   ├── Satellite (imagem)
│   └── Terrain (relevo)
├── Infraestrutura Aérea
│   ├── Aeroporto (marcador, radius 5km)
│   ├── Pistas (linhas)
│   ├── Zonas de aproximação (polígono)
│   └── Zonas restritas (se houver)
└── Voos (dinâmico)
    ├── Aeronaves (ícones animados)
    ├── Rotas (linhas com direção)
    └── Histórico (trail curva)
```

#### 5.3 Interações Requeridas

- **Zoom**: Min 5, Max 18
- **Pan**: Livre em qualquer direção
- **Click aeronave**: Popup com { código, status, altitude, velocidade }
- **Hover**: Dica com código voo
- **Rota automática**: Ao abrir, zoom até aeroporto
- **Toggle camadas**: Checkboxes para cada tipo

#### 5.4 Ícones e Cores

```
Ícones:
├── Aeronave (chevron ✈, cores por status)
├── Aeroporto (círculo azul)
├── Alerta (triângulo amarelo/vermelho)
└── Pista (linha azul)

Cores por Status:
├── PROGRAMADO: Cinza
├── TAXIANDO: Azul claro
├── DECOLANDO: Verde
├── CRUZEIRO: Azul
├── APROXIMACAO: Laranja
├── POUSO: Vermelho
└── FINALIZADO: Preto
```

#### 5.5 Atualização em Tempo Real

- **Frequência**: A cada 1 segundo
- **WebSocket**: Receber posições do servidor
- **Animação**: Interpolação suave entre posições
  -Suave Não travar interface ao receber dados

#### 5.6 Critérios de Aceitação

- [ ] Mapa carrega em < 2 segundos
- [ ] Zoom/pan responsivos (60+ FPS)
- [ ] Aeronaves atualizam em tempo real
- [ ] Rotas visíveis com direção clara
- [ ] Pop-up acessível (teclado e mouse)
- [ ] Responsivo em mobile (swipe para pan)

---

## 2. Especificação de Requisitos Não-Funcionais

### RNF-001: Performance

**Alvo**: Latência < 200ms (p95), FPS ≥ 30

#### Métricas

| Métrica                   | Alvo         | Método Medição           |
| ------------------------- | ------------ | ------------------------ |
| Latência API              | < 200ms      | Ferramentas curl/Postman |
| Tempo carregamento página | < 3s         | Lighthouse               |
| Simul. 100 voos           | < 1% CPU     | Monitor sistema          |
| Atualiz. mapa             | < 16ms/frame | DevTools                 |
| Query BD                  | < 100ms      | Slowlog PostgreSQL       |
| WebSocket latência        | < 50ms       | DevTools Network         |

#### Plano

- [x] Usar índices em BD (voos.status, voos.aeroporto_id)
- [ ] Cache em Frontend (voos cache 5s before update)
- [ ] Compressão Gzip respostas API
- [ ] Lazy load componentes React
- [ ] Virtualização lista voos (se > 100 itens)

---

### RNF-002: Escalabilidade

**Alvo**: Suportar até 500 voos (V2), 50 usuários

#### Projeto Escalável

- BD: Connection pool (10-20 conexões)
- API: Load balancer pronto (gunicorn workers)
- Frontend: CDN para assets estáticos
- WebSocket: Redis pub/sub (V2 ready)

---

### RNF-003: Confiabilidade

**Alvo**: Uptime 99%+ durante testes

#### Mecanismos

- Retry automático (3x antes falhar)
- Backup BD (diário, criptografado)
- Logs estruturados (ELK stack ou similar)
- Health checks a cada 30s
- Circuit breaker para services externos

---

### RNF-004: Usabilidade

**Alvo**: SUS Score ≥ 70, Time-to-competency < 30min

#### Padrões

- Design responsivo (mobile first)
- Cores WCAG AA mínimo
- Navegação consistente
- Atalhos teclado (Ctrl+S, etc)
- Tooltips para features complexas

---

### RNF-005: Segurança

**Alvo**: 0 vulnerabilidades críticas

#### Medidas

- HTTPS obrigatório (TLS 1.2+)
- CORS restrito a domínio
- SQL injection protection (ORM)
- Rate limiting (10 req/min por IP)
- CSRF tokens em formulários
- Senhas com bcrypt (min 12 rounds)

---

### RNF-006: Mantibilidade

**Alvo**: Code quality ≥ 90 (SonarQube), 80% testes

#### Padrões

- PEP8 Python, ESLint JS
- Unit tests com pytest, jest
- Integration tests
- Docstrings em todas funções públicas
- Changelog mantido
- ADR (Architecture Decision Records)

---

## 3. Matriz de Rastreabilidade Detalhada

| ID      | Requis.   | Componente      | Testes      | Status       |
| ------- | --------- | --------------- | ----------- | ------------ |
| RF-001  | Aeronaves | DB + API        | CT-RF001-\* | Especificado |
| RF-003  | Voos      | DB + API + Sim  | CT-RF003-\* | Especificado |
| RF-004  | Simulação | SimPy + DB      | CT-RF004-\* | Especificado |
| RF-005  | frontend  | React + Leaflet | CT-RF005-\* | Especificado |
| RF-006  | Alertas   | API + frontend  | CT-RF006-\* | Próximo doc  |
| RF-007  | Auth      | FastAPI + JWT   | CT-RF007-\* | Próximo doc  |
| RNF-001 | Performa  | Todos           | Benchmark   | Próximo doc  |

---

## 4. Documentos Relacionados

- [03-NEGOCIACAO-REQUISITOS.md](03-NEGOCIACAO-REQUISITOS.md)
- [05-VALIDACAO-REQUISITOS.md](05-VALIDACAO-REQUISITOS.md)
- [MODELOS-DADOS.md](MODELOS-DADOS.md)
- [ARQUITETURA.md](ARQUITETURA.md)

---

**Próxima Fase**: Validação de Requisitos  
**Data Alvo**: 23 de Abril de 2026

**Última Atualização**: 09 de Abril de 2026
