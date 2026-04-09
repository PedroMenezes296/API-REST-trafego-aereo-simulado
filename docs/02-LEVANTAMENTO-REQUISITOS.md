# 📝 Fase 2: Levantamento de Requisitos

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Aprovado

---

## 1. Técnicas de Levantamento Utilizadas

### 1.1 Técnicas Aplicadas

- ✅ **Entrevistas**: Com orientador e possíveis usuários
- ✅ **Análise de projetos similares**: Pesquisa de sistemas existentes
- ✅ **Brainstorming**: Sessões com equipe de desenvolvimento
- ✅ **Prototipagem**: Esboços de interfaces
- ✅ **Análise de documentos**: Regulamentações de tráfego aéreo
- ✅ **Estórias de usuário**: Definição de cenários de uso

### 1.2 Artefatos Gerados

- Matriz de rastreabilidade
- Diagrama de casos de uso
- Fluxogramas de processos
- Protótipos de interfaces
- Especificação de dados

---

## 2. Requisitos Funcionais

### RF-001: Gerenciamento de Aeronautas

**ID**: RF-001  
**Tipo**: Funcional  
**Prioridade**: ALTA  
**Descrição**: O sistema deve permitir cadastro, leitura, atualização e exclusão de informações de aeronaves  
**Critério de Aceitação**:

- Usuário autenticado pode criar nova aeronave
- Aeronave requer: modelo, fabricante, matrícula, capacidade passageiros
- Aeronave pode ser editada/deletada por admin
- Validação de matrícula única

**Estórias**:

- Como admin, quero cadastrar uma nova aeronave para disponibilizá-la no sistema

---

### RF-002: Gerenciamento de Aeroportos

**ID**: RF-002  
**Tipo**: Funcional  
**Prioridade**: ALTA  
**Descrição**: O sistema deve gerenciar informação de um aeroporto (único foco)  
**Critério de Aceitação**:

- Exibir dados do aeroporto: ICAO, IATA, nome, localização (lat/lon)
- Listar pistas disponíveis
- Mostrar status operacional (aberto/fechado/contingência)
- Histórico de operações

**Estórias**:

- Como operador, quero ver informações do aeroporto e suas pistas
- Como gerenciador, quero definir o status operacional do aeroporto

---

### RF-003: Cadastro de Voos

**ID**: RF-003  
**Tipo**: Funcional  
**Prioridade**: CRÍTICA  
**Descrição**: O sistema deve gerenciar voos (decolagens e pousos)  
**Critério de Aceitação**:

- Criar voo com: código, aeronave, horário, tipo operação (chegada/saída)
- Voo tem estados: programado, taxiando, decolando, cruzeiro, aproximação, pouso, finalizado
- Diferentes horários para mesma aeronave
- Histórico completo alterações

**Estórias**:

- Como despachador, quero criar um novo voo programado
- Como operador, quero visualizar todos os voos do dia
- Como analista, quero consultar histórico de um voo

---

### RF-004: Simulação de Voos em Tempo Real

**ID**: RF-004  
**Tipo**: Funcional  
**Prioridade**: CRÍTICA  
**Descrição**: O sistema deve simular evolução de voos em tempo real  
**Critério de Aceitação**:

- Cada voo passa por fases predefinidas
- Geração de telemetria (lat, lon, altitude, velocidade, direção)
- Simulação baseada em eventos discretos (SimPy)
- Atualização de posição a cada X segundos
- Algoritmo de rota entre origem/destino

**Estórias**:

- Como operador, quero ver aeronaves se movimentando no mapa em tempo real
- Como desenvolvedor, quero que o simulador processe 100+ voos sem lag

---

### RF-005: Monitoramento em Mapa Interativo

**ID**: RF-005  
**Tipo**: Funcional  
**Prioridade**: ALTA  
**Descrição**: Visualizar aeronaves em mapa com informações em tempo real  
**Critério de Aceitação**:

- Mapa integrado (Leaflet/Mapbox)
- Ícones diferentes para tipo de voo (chegada/saída)
- Cores por status (programado, pouso, decolagem, etc)
- Pop-up com detalhes ao clicar aeronave
- Zoom, pan, zoom automático
- Traço de rota percorrida

**Estórias**:

- Como operador, quero visualizar todas as aeronaves no mapa
- Como supervisor, quero clicar em aeronave para ver detalhes completos
- Como analista, quero ver a rota que a aeronave percorreu

---

### RF-006: Sistema de Alertas

**ID**: RF-006  
**Tipo**: Funcional  
**Prioridade**: ALTA  
**Descrição**: Gerar alertas para situações críticas  
**Critério de Aceitação**:

- Detectar proximidade entre aeronaves (< 1000 pés)
- Alerta de combustível baixo (se simulado)
- Alerta de fila longa espera pouso
- Alerta de condições climáticas (extensível)
- Registro persistente de alertas
- Níveis de severidade: INFO, AVISO, CRÍTICO

**Estórias**:

- Como operador, quero ser alertado sobre possíveis conflitos de tráfego
- Como supervisor, quero ver histórico de todos os alertas

---

### RF-007: Autenticação e Autorização

**ID**: RF-007  
**Tipo**: Funcional  
**Prioridade**: ALTA  
**Descrição**: Sistema de login com controle de permissões  
**Critério de Aceitação**:

- Login com email/senha
- JWT tokens para autenticação API
- Papéis: Admin, Operador, Supervisor, Visualizador
- Permissões específicas por papel
- Session timeout após inatividade
- Log de acessos

**Estórias**:

- Como usuário, quero fazer login para acessar o sistema
- Como admin, quero controlar permissões por papel
- Como auditor, quero rastrear quem acessou o sistema

---

### RF-008: Dashboard e Relatórios

**ID**: RF-008  
**Tipo**: Funcional  
**Prioridade**: MÉDIA  
**Descrição**: Exibir dashboards com métricas e gráficos  
**Critério de Aceitação**:

- Dashboard home com KPIs: voos hoje, alertas, operações concluídas
- Gráficos de ocupação de pistas ao longo do tempo
- Relatório de voos por período
- Estatísticas de pontualidade
- Export para CSV/PDF

**Estórias**:

- Como gerenciador, quero ver métricas do dia em dashboard
- Como analista, quero gerar relatórios de desempenho

---

### RF-009: Histórico de Telemetria

**ID**: RF-009  
**Tipo**: Funcional  
**Prioridade**: MÉDIA  
**Descrição**: Armazenar e recuperar posições históricas  
**Critério de Aceitação**:

- Cada segundo, posição da aeronave é registrada
- Histórico retenção: mínimo 30 dias
- Recuperar traço completo de voo
- Playback de voo em velocidade controlável
- Exportar dados de telemetria para análise

**Estórias**:

- Como pesquisador, quero acessar dados históricos de voos
- Como investigador, quero reproduzir um voo passo a passo

---

### RF-010: Importação de Dados de Aeroportos

**ID**: RF-010  
**Tipo**: Funcional  
**Prioridade**: MÉDIA  
**Descrição**: Carregar dados reais de aeroportos  
**Critério de Aceitação**:

- Importar dados de OpenFlights API
- Converter dados para formato padrão
- Validação de dados importados
- Sincronização periódica
- Log da importação

**Estórias**:

- Como admin, quero atualizar dados de aeroportos automaticamente

---

## 3. Requisitos Não-Funcionais

### RNF-001: Performance

**ID**: RNF-001  
**Descrição**: Sistema deve responder rapidamente sob carga  
**Métricas**:

- Latência API: < 200ms (p95)
- Tempo carregamento frontend: < 3s
- Simulação de 100 voos: sem lag noticável
- Atualização mapa: < 1s
- Taxa refresh: ≥ 30 FPS mapa

---

### RNF-002: Escalabilidade

**ID**: RNF-002  
**Descrição**: Sistema deve suportar crescimento futuro  
**Métricas**:

- Fase atual: 10 usuários, 100 voos
- Fase 2: 50 usuários, 500 voos
- Arquitetura modular e extensível
- Banco de dados otimizado para queries frequentes
- Separação camadas (frontend, backend, BD)

---

### RNF-003: Confiabilidade

**ID**: RNF-003  
**Descrição**: Sistema deve ser estável e recuperável  
**Métricas**:

- Uptime ≥ 99% durante pré-produção
- MTTR (Mean Time To Recovery): < 5 min
- Backup automático do BD diário
- Tratamento robusto de erros
- Logs detalhados de eventos

---

### RNF-004: Usabilidade

**ID**: RNF-004  
**Descrição**: Interface intuitiva e acessível  
**Métricas**:

- SUS score (System Usability Scale) ≥ 70
- Tempo aprendizado < 30min para novo usuário
- Responsivo em desktop, tablet e mobile
- Contraste de cores WCAG AA
- Suporte a navegação por teclado

---

### RNF-005: Segurança

**ID**: RNF-005  
**Descrição**: Proteger dados e sistemas  
**Métricas**:

- Criptografia HTTPS para comunicação
- Senhas com PBKDF2/bcrypt
- CSRF protection
- Rate limiting em endpoints
- SQL injection protection (ORM)
- Validação rigorosa de entrada

---

### RNF-006: Mantibilidade

**ID**: RNF-006  
**Descrição**: Código limpo e bem documentado  
**Métricas**:

- Cobertura de testes ≥ 80%
- Code quality score (SonarQube) ≥ 90
- Documentação de todas funções públicas
- TODO comments < 5% do código
- Padrão de codificação bem definido

---

### RNF-007: Compatibilidade

**ID**: RNF-007  
**Descrição**: Funcionar em múltiplos ambientes  
**Requisitos**:

- Python 3.11+, Node.js 18.x+
- Funciona em Windows, Linux, macOS
- Navegadores: Chrome 90+, Firefox 87+, Safari 14+, Edge 90+
- BD: PostgreSQL 13+ ou SQLite 3.3+

---

### RNF-008: Performance da Simulação

**ID**: RNF-008  
**Descrição**: Simulador robusto e eficiente  
**Métricas**:

- Simulação corre a velocidade real (1x)
- Suporta fast-forward (2x, 4x, 8x)
- Determinístico (mesma entrada = mesma saída)
- Tempo simulação 24h < 10 minutos (normal)
- 0 vazamento de memória após 24h contínuos

---

## 4. Atores do Sistema

| Ator                | Descrição                    | Responsabilidades                                |
| ------------------- | ---------------------------- | ------------------------------------------------ |
| **Admin**           | Administrador do sistema     | Gerenciar usuários, configurações, BD            |
| **Operador**        | Controlador de tráfego aéreo | Monitorar voos, criar alertas, gerenciar repouso |
| **Despachador**     | Cria e programa voos         | Cadastro voos, sincronização                     |
| **Supervisor**      | Gerencia operações           | Analisar desempenho, resolver conflitos          |
| **Visualizador**    | Usuário somente leitura      | Ver dados, acessar dashboards                    |
| **Sistema Externo** | OpenFlights API              | Fornece dados aeroportos                         |

---

## 5. Casos de Uso - Diagrama

```
                         ┌──────────────────────────────┐
                         │   Sistema de Tráfego Aéreo   │
                         └──────────────────────────────┘
                                    ▲
                    ┌───────────────┤───────────────┐
                    │               │               │
              ┌─────────┐     ┌─────────┐     ┌─────────┐
              │  Admin  │     │Operador │     │  Super  │
              └─────────┘     └─────────┘     └─────────┘
                    │               │               │
        ┌───────────┼───────┬───────┼───────┬───────┼───────┐
        │           │       │       │       │       │       │
        ▼           ▼       ▼       ▼       ▼       ▼       ▼
    ┌───────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
    │Autent │ │Gerenciar │ │Monitorar │ │  Criar  │ │  Gerar  │
    │Usuário│ │ Entidades │ │  Voos    │ │ Alertas │ │Relatórios│
    └───────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
         │           │           │           │           │
         └───────────┴───────────┴───────────┴───────────┘
                         ▲
                         │
                    ┌────────────┐
                    │ Simulador  │
                    │  (SimPy)   │
                    └────────────┘
```

---

## 6. Matriz de Rastreabilidade (Inicial)

| ID      | Requisito             | Ator  | Sprint | Status       |
| ------- | --------------------- | ----- | ------ | ------------ |
| RF-001  | Gerenciar Aeronaves   | Admin | 2      | 🔵 Design    |
| RF-002  | Gerenciar Aeroporto   | Admin | 2      | 🔵 Design    |
| RF-003  | Cadastro Voos         | Desp  | 2      | 🔵 Design    |
| RF-004  | Simulação Tempo Real  | Oper  | 3      | 📋 Planejado |
| RF-005  | Mapa Interativo       | Oper  | 4      | 📋 Planejado |
| RF-006  | Sistema Alertas       | Oper  | 3      | 📋 Planejado |
| RF-007  | Autenticação          | Admin | 1      | ✅ Feito     |
| RF-008  | Dashboard             | Super | 4      | 📋 Planejado |
| RF-009  | Histórico Telemetria  | Admin | 3      | 📋 Planejado |
| RF-010  | Importação Aeroportos | Admin | 1      | ✅ Feito     |
| RNF-001 | Performance           | -     | 5      | 📋 Testes    |
| RNF-002 | Escalabilidade        | -     | 5      | 📋 Review    |

---

## 7. Priorização de Requisitos

### Matriz MoSCoW

**MUST (Essencial)**:

- RF-003, RF-004, RF-007, RF-010
- RNF-001, RNF-003, RNF-005

**SHOULD (Desejável)**:

- RF-001, RF-002, RF-005, RF-006
- RNF-002, RNF-006, RNF-008

**COULD (Interessante)**:

- RF-008, RF-009
- RNF-004, RNF-007

**WONT (Excluso desta versão)**:

- Múltiplos aeroportos
- IA para otimização
- Mobile app nativa

---

## 8. Requisitos de Negócio

| Aspecto                     | Descrição                                                    |
| --------------------------- | ------------------------------------------------------------ |
| **Alinhamento Estratégico** | Projeto acadêmico para consolidar conhecimentos ES           |
| **Diferencial**             | Simula regime real de tráfego com dados autênticos           |
| **Público-alvo**            | Estudantes, pesquisadores, entusiastas de aviação            |
| **ROI Esperado**            | Aprendizado, portfólio, possível continuação/comercialização |
| **Valor Entregue**          | Plataforma educacional robusta, documentação completa        |

---

## 9. Documentos Relacionados

- [01-CONCEPCAO.md](01-CONCEPCAO.md)
- [03-NEGOCIACAO-REQUISITOS.md](03-NEGOCIACAO-REQUISITOS.md)
- [ARQUITETURA.md](ARQUITETURA.md)

---

**Próxima Fase**: Negociação de Requisitos  
**Data Alvo**: 16 de Abril de 2026

---

_Última Atualização: 09 de Abril de 2026_
