# 🗂️ Modelos de Dados

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Documentado

---

## 1. Diagrama ER (Entidade-Relacionamento)

```
┌─────────────────┐
│     Usuario     │◄────────────────┐
├─────────────────┤                 │
│ PK id           │                 │ (1 para muitos)
│ email (UNIQUE)  │                 │
│ password_hash   │                 │
│ papel           │                 │
│ ativo           │                 │
│ criado_em       │                 │
│ atualizado_em   │                 │
└─────────────────┘                 │
                                    │
┌──────────────────────┐             │
│     Aeroporto        │             │
├──────────────────────┤             │
│ PK id                │ (1 para muitos)
│ nome                 │             │
│ icao_code (UNIQUE)   │             │
│ iata_code (UNIQUE)   │             │
│ latitude             │             │
│ longitude            │             │
│ elevacao_ft          │             │
│ pais                 │             │
│ regiao               │             │
│ municipio            │             │
│ pistas (JSON)        │             │
│ status               │             │
│ criado_em            │             │
└─────────────────────────────┐      │
                ▲              │      │
                │              │      │
                │ 1:N          │      │
                │              │      │
┌──────────────────────────────┼──────┼──────────┐
│           Voo                │      │          │
├──────────────────────────────┤      │          │
│ PK id                        │      │          │
│ FK aeroporto_id ─────────────┼──────┘          │
│ FK aeronave_id ──────────────┼─────────────┐   │
│ codigo_voo (UNIQUE)          │             │   │
│ tipo_operacao                │             │   │
│ status                       │             │   │
│ horario_previsto             │             │   │
│ horario_real                 │             │   │
│ latitude_atual               │             │   │
│ longitude_atual              │             │   │
│ altitude_atual               │             │   │
│ velocidade_atual             │             │   │
│ prioridade                   │             │   │
│ emergencia                   │             │   │
│ criado_por (FK)──────────────┼─────────────┤   │
│ criado_em                    │             │   │
│ atualizado_em                │             │   │
└──────────────────────────────┤             │   │
                │              │             │   │
                │ 1:N          │ 1:N         │   │
                │              │             │   │
                ▼              ▼             │   │
┌──────────────────────┐  ┌──────────────────┼───┼──────────┐
│  Telemetria          │  │     Aeronave     │   │ Alerta   │
├──────────────────────┤  ├──────────────────┤   ├──────────┤
│ PK id                │  │ PK id            │   │ PK id    │
│ FK voo_id ──────────┬┼──┤ matricula (UNIQUE)   │ tipo     │
│ timestamp           │   │ modelo           │   │ voo_id(FK)
│ latitude            │   │ fabricante       │   │ mensagem │
│ longitude           │   │ capacidade       │   │ timestamp│
│ altitude            │   │ status           │   │ severida │
│ velocidade          │   │ criado_em        │   │ resolvid │
│ direcao             │   └──────────────────┘   │ observ. │
│ criado_em           │                          │ criado_em│
└─────────────────────┘                          └──────────┘
```

---

## 2. Descrição Detalhada de Tabelas

### 2.1 Tabela: usuario

**Propósito**: Armazenar dados de usuários do sistema

| Coluna        | Tipo         | Constraint       | Descrição                                 |
| ------------- | ------------ | ---------------- | ----------------------------------------- |
| id            | SERIAL       | PRIMARY KEY      | Identificador único                       |
| email         | VARCHAR(255) | UNIQUE, NOT NULL | Email do usuário                          |
| password_hash | VARCHAR(255) | NOT NULL         | Senha hash bcrypt                         |
| papel         | ENUM         | NOT NULL         | admin\|operador\|supervisor\|visualizador |
| ativo         | BOOLEAN      | DEFAULT true     | Usuario ativo?                            |
| criado_em     | TIMESTAMP    | DEFAULT now()    | Data criação                              |
| atualizado_em | TIMESTAMP    | DEFAULT now()    | Última atualização                        |

**Índices**:

- PRIMARY: id
- UNIQUE: email

**Sample Data**:

```sql
INSERT INTO usuario (email, password_hash, papel) VALUES
('admin@sistema.com', '$2b$12$...', 'admin'),
('operador@sistema.com', '$2b$12$...', 'operador');
```

---

### 2.2 Tabela: aeroporto

**Propósito**: Informações do aeroporto (foco em UM aeroporto)

| Coluna        | Tipo           | Constraint       | Descrição                     |
| ------------- | -------------- | ---------------- | ----------------------------- |
| id            | SERIAL         | PRIMARY KEY      | ID aeroporto                  |
| external_id   | INTEGER        | UNIQUE           | ID OpenFlights API            |
| identificador | VARCHAR(10)    | -                | Código aeroporto (ex: SBGR)   |
| tipo          | ENUM           | -                | small\|medium\|large          |
| nome          | VARCHAR(255)   | NOT NULL         | Nome completo                 |
| latitude      | DECIMAL(10, 8) | NOT NULL         | Latitude                      |
| longitude     | DECIMAL(11, 8) | NOT NULL         | Longitude                     |
| elevacao_ft   | INTEGER        | -                | Elevação em pés               |
| pais          | VARCHAR(2)     | -                | Código ISO país (ex: BR)      |
| regiao        | VARCHAR(100)   | -                | Região/Estado                 |
| municipio     | VARCHAR(100)   | -                | Cidade                        |
| icao_code     | VARCHAR(4)     | UNIQUE           | Código ICAO                   |
| iata_code     | VARCHAR(3)     | UNIQUE           | Código IATA                   |
| pistas        | JSON           | -                | Array com info pistas         |
| status        | ENUM           | DEFAULT 'aberto' | aberto\|fechado\|contingencia |
| criado_em     | TIMESTAMP      | DEFAULT now()    | Data import                   |

**Índices**:

- PRIMARY: id
- UNIQUE: external_id, icao_code, iata_code

**Sample Data**:

```sql
INSERT INTO aeroporto (...) VALUES
(..., 1988, 'SBGR', 'large', 'São Paulo/Guarulhos', -23.432945, -46.469428, ...);
```

---

### 2.3 Tabela: aeronave

**Propósito**: Registro de aeronaves na frota

| Coluna                 | Tipo         | Constraint       | Descrição                  |
| ---------------------- | ------------ | ---------------- | -------------------------- |
| id                     | SERIAL       | PRIMARY KEY      | ID aeronave                |
| matricula              | VARCHAR(10)  | UNIQUE, NOT NULL | Matrícula (ex: PT-GUP)     |
| modelo                 | VARCHAR(100) | NOT NULL         | Modelo aeronave            |
| fabricante             | VARCHAR(100) | NOT NULL         | Fabricante                 |
| capacidade_passageiros | INTEGER      | NOT NULL         | Capacidade em pax          |
| status                 | ENUM         | DEFAULT 'ativo'  | ativo\|inativo\|manutenção |
| criado_em              | TIMESTAMP    | DEFAULT now()    | Data cadastro              |
| atualizado_em          | TIMESTAMP    | DEFAULT now()    | Última atualização         |

**Índices**:

- PRIMARY: id
- UNIQUE: matricula
- INDEX: status

**Sample Data**:

```sql
INSERT INTO aeronave (matricula, modelo, fabricante, capacidade_passageiros) VALUES
('PT-GUP', 'Boeing 737-800', 'Boeing', 160),
('PT-GUA', 'Airbus A320', 'Airbus', 180);
```

---

### 2.4 Tabela: voo

**Propósito**: Registro de todos os voos programados/realizados

| Coluna           | Tipo           | Constraint       | Descrição                             |
| ---------------- | -------------- | ---------------- | ------------------------------------- |
| id               | SERIAL         | PRIMARY KEY      | ID voo                                |
| codigo_voo       | VARCHAR(20)    | UNIQUE, NOT NULL | Código único (VM-SA-xxxx)             |
| aeroporto_id     | INTEGER        | FK, NOT NULL     | Referência aeroporto                  |
| aeronave_id      | INTEGER        | FK, NOT NULL     | Referência aeronave                   |
| tipo_operacao    | ENUM           | NOT NULL         | chegada\|saida                        |
| status           | VARCHAR(20)    | NOT NULL         | PROGRAMADO, TAXIANDO, ..., FINALIZADO |
| horario_previsto | TIMESTAMP      | NOT NULL         | UTC                                   |
| horario_real     | TIMESTAMP      | -                | UTC realizado                         |
| latitude_atual   | DECIMAL(10, 8) | -                | Latitude em tempo real                |
| longitude_atual  | DECIMAL(11, 8) | -                | Longitude em tempo real               |
| altitude_atual   | INTEGER        | -                | Altitude em pés                       |
| velocidade_atual | DECIMAL(10, 2) | -                | Velocidade em km/h                    |
| prioridade       | INT            | DEFAULT 0        | 0-10                                  |
| emergencia       | BOOLEAN        | DEFAULT false    | É emergência?                         |
| criado_en        | TIMESTAMP      | DEFAULT now()    | Criação                               |
| atualizado_em    | TIMESTAMP      | -                | Última mudança                        |

**Índices**:

- PRIMARY: id
- UNIQUE: codigo_voo
- FORKEY: aeroporto_id, aeronave_id
- INDEX: status, horario_previsto, tipo_operacao

**Sample Data**:

```sql
INSERT INTO voo (...) VALUES
(NULL, 'VM-SA-0001', 1, 1, 'saida', 'PROGRAMADO',
 '2026-04-09 14:30:00', NULL, NULL, NULL, NULL, NULL, 5, false, NOW());
```

---

### 2.5 Tabela: telemetria

**Propósito**: Histórico de posições das aeronaves

| Coluna     | Tipo           | Constraint    | Descrição          |
| ---------- | -------------- | ------------- | ------------------ |
| id         | BIGSERIAL      | PRIMARY KEY   | ID registro        |
| voo_id     | INTEGER        | FK, NOT NULL  | Referência voo     |
| timestamp  | TIMESTAMP      | NOT NULL      | Quando             |
| latitude   | DECIMAL(10, 8) | NOT NULL      | Lat em UTC         |
| longitude  | DECIMAL(11, 8) | NOT NULL      | Lon em UTC         |
| altitude   | INTEGER        | NOT NULL      | Pés                |
| velocidade | DECIMAL(10, 2) | -             | km/h               |
| direcao    | INTEGER        | -             | Ângulo 0-359 graus |
| criado_em  | TIMESTAMP      | DEFAULT now() | Registro           |

**Índices**:

- PRIMARY: id
- UNIQUE: (voo_id, timestamp) - Evita duplicatas
- INDEX: voo_id, timestamp (para queries eficientes)

**Particionamento** (opcional para escala):

- Particionar por data: telemetria_2026_04, telemetria_2026_05, ...
- Retention: 30 dias mínimo

**Sample Data**:

```sql
INSERT INTO telemetria (...) VALUES
(...voo_id=1, timestamp='2026-04-09 14:30:05'..., lat=-23.43, lon=-46.47, alt=0);
```

---

### 2.6 Tabela: alerta

**Propósito**: Registro de alertas gerados

| Coluna      | Tipo         | Constraint    | Descrição                    |
| ----------- | ------------ | ------------- | ---------------------------- |
| id          | SERIAL       | PRIMARY KEY   | ID alerta                    |
| tipo        | VARCHAR(50)  | NOT NULL      | proximidade, fila_pouso, etc |
| voo_id      | INTEGER      | FK            | Voo relacionado (opcional)   |
| mensagem    | VARCHAR(500) | NOT NULL      | Descrição                    |
| severidade  | ENUM         | NOT NULL      | INFO\|AVISO\|CRITICO         |
| resolvido   | BOOLEAN      | DEFAULT false | Resolvido?                   |
| observacoes | TEXT         | -             | Notas de resolução           |
| timestamp   | TIMESTAMP    | DEFAULT now() | Quando gerado                |

**Índices**:

- PRIMARY: id
- FK: voo_id
- INDEX: (severidade, resolvido, timestamp)

**Sample Data**:

```sql
INSERT INTO alerta (...) VALUES
(NULL, 'proximidade', 1, 'Distância crítica deteccioou entre voos', 'CRITICO', false, NULL, NOW());
```

---

## 3. Scripts de Inicialização

### 3.1 DDL Completo (PostgreSQL)

```sql
-- Criar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar enums
CREATE TYPE user_role AS ENUM ('admin', 'operador', 'supervisor', 'visualizador');
CREATE TYPE airport_type AS ENUM ('small_airport', 'medium_airport', 'large_airport');
CREATE TYPE airport_status AS ENUM ('aberto', 'fechado', 'contingencia');
CREATE TYPE operation_type AS ENUM ('chegada', 'saida');
CREATE TYPE flight_status AS ENUM (
  'PROGRAMADO', 'TAXIANDO', 'DECOLANDO', 'CRUZEIRO',
  'APROXIMACAO', 'POUSO', 'FINALIZADO', 'CANCELADO'
);
CREATE TYPE alert_type AS ENUM ('proximidade', 'fila_pouso', 'emergencia', 'combustivel');
CREATE TYPE alert_severity AS ENUM ('INFO', 'AVISO', 'CRITICO');

-- Criar tabelas
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  papel user_role NOT NULL,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aeroporto (
  id SERIAL PRIMARY KEY,
  external_id INTEGER UNIQUE,
  identificador VARCHAR(10),
  tipo airport_type,
  nome VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  elevacao_ft INTEGER,
  pais VARCHAR(2),
  regiao VARCHAR(100),
  municipio VARCHAR(100),
  icao_code VARCHAR(4) UNIQUE,
  iata_code VARCHAR(3) UNIQUE,
  pistas JSONB,
  status airport_status DEFAULT 'aberto',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aeronave (
  id SERIAL PRIMARY KEY,
  matricula VARCHAR(10) UNIQUE NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  fabricante VARCHAR(100) NOT NULL,
  capacidade_passageiros INTEGER NOT NULL CHECK (capacidade_passageiros > 0),
  status VARCHAR(50) DEFAULT 'ativo',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE voo (
  id SERIAL PRIMARY KEY,
  codigo_voo VARCHAR(20) UNIQUE NOT NULL,
  aeroporto_id INTEGER NOT NULL REFERENCES aeroporto(id),
  aeronave_id INTEGER NOT NULL REFERENCES aeronave(id),
  tipo_operacao operation_type NOT NULL,
  status flight_status DEFAULT 'PROGRAMADO',
  horario_previsto TIMESTAMP NOT NULL,
  horario_real TIMESTAMP,
  latitude_atual DECIMAL(10, 8),
  longitude_atual DECIMAL(11, 8),
  altitude_atual INTEGER,
  velocidade_atual DECIMAL(10, 2),
  prioridade INTEGER DEFAULT 0 CHECK (prioridade >= 0 AND prioridade <= 10),
  emergencia BOOLEAN DEFAULT false,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE telemetria (
  id BIGSERIAL PRIMARY KEY,
  voo_id INTEGER NOT NULL REFERENCES voo(id) ON DELETE CASCADE,
  timestamp TIMESTAMP NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  altitude INTEGER NOT NULL,
  velocidade DECIMAL(10, 2),
  direcao INTEGER CHECK (direcao >= 0 AND direcao < 360),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(voo_id, timestamp)
);

CREATE TABLE alerta (
  id SERIAL PRIMARY KEY,
  tipo alert_type NOT NULL,
  voo_id INTEGER REFERENCES voo(id) ON DELETE SET NULL,
  mensagem VARCHAR(500) NOT NULL,
  severidade alert_severity NOT NULL,
  resolvido BOOLEAN DEFAULT false,
  observacoes TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices
CREATE INDEX idx_voo_status ON voo(status);
CREATE INDEX idx_voo_horario_previsto ON voo(horario_previsto);
CREATE INDEX idx_voo_tipo_operacao ON voo(tipo_operacao);
CREATE INDEX idx_telemetria_voo_timestamp ON telemetria(voo_id, timestamp DESC);
CREATE INDEX idx_alerta_severidade_resolvido ON alerta(severidade, resolvido, timestamp DESC);
CREATE INDEX idx_usuario_email ON usuario(email);
CREATE INDEX idx_aeronave_status ON aeronave(status);
```

---

## 4. Relacionamentos

### 4.1 Relacionamentos Definidos

| De         | Para      | Tipo | Descrição                           |
| ---------- | --------- | ---- | ----------------------------------- |
| voo        | aeroporto | N:1  | Muitos voos por aeroporto           |
| voo        | aeronave  | N:1  | Muitos voos por aeronave            |
| telemetria | voo       | N:1  | Muitos registros telemetria por voo |
| alerta     | voo       | N:1  | Muitos alertas por voo              |
| usuario    | -         | -    | Sem FK (contexto global)            |

### 4.2 Cascata e Constraints

- `voo.aeronave_id`: DELETE RESTRICT (não deletar aeronave com voos)
- `telemetria.voo_id`: DELETE CASCADE (deletar telemetria quando voo deletado)
- `alerta.voo_id`: DELETE SET NULL (alertas órfãos se voo deletado)

---

## 5. Views (Consultas Frequentes)

### 5.1 View: voos_ativos

```sql
CREATE VIEW voos_ativos AS
SELECT
  v.id,
  v.codigo_voo,
  v.status,
  a.matricula AS aeronave_matricula,
  v.tipo_operacao,
  v.horario_previsto,
  v.latitude_atual,
  v.longitude_atual,
  v.altitude_atual
FROM voo v
JOIN aeronave a ON v.aeronave_id = a.id
WHERE v.status IN ('PROGRAMADO', 'TAXIANDO', 'DECOLANDO', 'CRUZEIRO', 'APROXIMACAO', 'POUSO');
```

### 5.2 View: alertas_pendentes

```sql
CREATE VIEW alertas_pendentes AS
SELECT
  a.id,
  a.tipo,
  a.mensagem,
  a.severidade,
  v.codigo_voo,
  a.timestamp
FROM alerta a
LEFT JOIN voo v ON a.voo_id = v.id
WHERE a.resolvido = false
ORDER BY a.severidade DESC, a.timestamp DESC;
```

---

## 6. Migrações (Versionamento com Alembic)

```
migrations/
├── versions/
│   ├── 001_create_initial_schema.py
│   ├── 002_add_telemetria_indices.py
│   └── 003_create_views.py
└── env.py
```

---

## 7. Documentos Relacionados

- [BACKEND-API.md](BACKEND-API.md)
- [ARQUITETURA.md](ARQUITETURA.md)
- [SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)

---

**Última Atualização**: 09 de Abril de 2026
