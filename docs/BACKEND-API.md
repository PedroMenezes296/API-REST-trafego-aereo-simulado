# 🔧 Backend - API REST

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Documentado

---

## 1. Stack Tecnológico

| Componente   | Tecnologia        | Versão   |
| ------------ | ----------------- | -------- |
| Framework    | FastAPI           | 0.104+   |
| ORM          | SQLAlchemy        | 2.0+     |
| Validação    | Pydantic          | 2.0+     |
| Banco        | PostgreSQL/SQLite | 13+/3.3+ |
| Simulação    | SimPy             | 4.1+     |
| Autenticação | PyJWT             | 2.8+     |
| Hash Senha   | bcrypt            | 4.1+     |
| Server       | Uvicorn           | 0.24+    |

---

## 2. Estrutura de Diretórios

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # Ponto de entrada FastAPI
│   ├── config.py                  # Variáveis de ambiente
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── voos.py           # GET /voos, POST /voos, etc
│   │   │   ├── aeronaves.py      # Gerenciamento aeronaves
│   │   │   ├── aeroporto.py      # Info aeroporto
│   │   │   ├── alertas.py        # Consultar alertas
│   │   │   ├── auth.py           # Login/register
│   │   │   └── telemetria.py     # Histórico posições
│   │   ├── websocket.py          # Conexões WebSocket
│   │   └── dependencies.py       # Injeção de dependência
│   ├── models/
│   │   ├── __init__.py
│   │   ├── voo.py               # ORM Model
│   │   ├── aeronave.py
│   │   ├── aeroporto.py
│   │   ├── alerta.py
│   │   ├── usuario.py
│   │   └── telemetria.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── voo.py               # Pydantic schema (DTO)
│   │   ├── aeronave.py
│   │   ├── alerta.py
│   │   └── token.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── voo_service.py       # Lógica de negócio
│   │   ├── aeronave_service.py
│   │   ├── alerta_service.py
│   │   └── simulador_service.py
│   ├── database/
│   │   ├── __init__.py
│   │   ├── connection.py        # Criação de conexão
│   │   ├── session.py           # Gerenciador de sessão
│   │   └── base.py              # Base classes ORM
│   ├── simulator/
│   │   ├── __init__.py
│   │   ├── core.py              # Classe Simulador
│   │   ├── processes/
│   │   │   └── voo_process.py   # ProcessoVoo SimPy
│   │   ├── telemetry/
│   │   │   ├── generator.py     # Gera lat/lon/alt
│   │   │   └── trajectory.py    # Cálculo rota
│   │   └── conflict_detection/
│   │       └── proximity_checker.py
│   └── utils/
│       ├── __init__.py
│       ├── jwt_utils.py         # Funções JWT
│       ├── validators.py        # Validadores custom
│       ├── exceptions.py        # Custom exceptions
│       └── logger.py            # Logging setup
├── tests/
│   ├── __init__.py
│   ├── test_voos.py
│   ├── test_auth.py
│   ├── test_simulador.py
│   └── conftest.py             # Fixtures pytest
├── requirements.txt
├── .env.example
└── main.py                     # Script entrada (uvicorn)
```

---

## 3. Endpoints Principais

### 3.1 Autenticação

```
POST /api/auth/login
  Body: { email, password }
  Resposta: 200 { access_token, token_type: "bearer" }

POST /api/auth/register
  Body: { email, password, password_confirm }
  Resposta: 201 { id, email, papel: "visualizador" }

GET /api/auth/me
  Headers: { Authorization: "Bearer {token}" }
  Resposta: 200 { id, email, papel }
```

### 3.2 Gerenciamento Aeronaves

```
POST /api/aeronaves
  Auth: requerido
  Body: { modelo, fabricante, matricula, capacidade_passageiros }
  Resposta: 201 { id, matricula, ... }

GET /api/aeronaves
  Query: ?status=ativo&modelo=B737
  Resposta: 200 [ {...}, {...} ]

GET /api/aeronaves/{id}
  Resposta: 200 { id, matricula, modelo, ... }

PUT /api/aeronaves/{id}
  Body: { modelo?, status?, ... }
  Resposta: 200 { id, ... }

DELETE /api/aeronaves/{id}
  Resposta: 204 NoContent
```

### 3.3 Gerenciamento Voos

```
POST /api/voos
  Body: { aeronave_id, tipo_operacao, horario_previsto }
  Resposta: 201 { id, codigo_voo, status: "PROGRAMADO" }

GET /api/voos
  Query: ?status=ATIVO&data__gte=2026-04-09&tipo=chegada
  Resposta: 200 [ {...voos...} ]

GET /api/voos/{id}
  Resposta: 200 { id, codigo_voo, telemetria_atual, ... }

PUT /api/voos/{id}/estado
  Body: { novo_estado: "DECOLANDO" }
  Resposta: 200 { status: "DECOLANDO" }

PUT /api/voos/{id}/prioridade
  Body: { prioridade: 8 }
  Resposta: 200 { prioridade: 8 }

GET /api/voos/{id}/historico
  Resposta: 200 [ { timestamp, estado_anterior, estado_novo } ]
```

### 3.4 Alertas

```
GET /api/alertas
  Query: ?severidade=CRITICO&resolvido=false
  Resposta: 200 [ {...alertas...} ]

GET /api/alertas/{id}
  Resposta: 200 { id, tipo, mensagem, voo_id, timestamp, severidade }

PUT /api/alertas/{id}/resolver
  Body: { resolvido: true, observacoes: "..." }
  Resposta: 200 { resolvido: true }
```

### 3.5 Telemetria

```
GET /api/voos/{id}/telemetria
  Query: ?desde=2026-04-09T00:00:00Z&ate=2026-04-09T05:00:00Z
  Resposta: 200 [ { timestamp, lat, lon, alt, vel, direcao } ]

GET /api/voos/{id}/rota
  Resposta: 200 { origem, destino, distancia, waypoints: [...] }
```

### 3.6 Aeroporto

```
GET /api/aeroporto
  Resposta: 200 { id, nome, icao_code, iata_code, lat, lon, status }

PUT /api/aeroporto/status
  Body: { status: "aberto" | "fechado" | "contingencia" }
  Resposta: 200 { status: "aberto" }
```

---

## 4. Modelos ORM (SQLAlchemy)

### 4.1 Modelo: Voo

```python
from sqlalchemy import Column, Integer, String, DateTime, Enum
from app.database.base import Base

class Voo(Base):
    __tablename__ = "voos"

    id = Column(Integer, primary_key=True)
    codigo_voo = Column(String(20), unique=True, nullable=False)
    aeronave_id = Column(Integer, ForeignKey("aeronaves.id"), nullable=False)
    aeroporto_id = Column(Integer, ForeignKey("aeroportos.id"), nullable=False)

    tipo_operacao = Column(Enum("chegada", "saida"), nullable=False)
    status = Column(
        Enum("PROGRAMADO", "TAXIANDO", "DECOLANDO", "CRUZEIRO",
             "APROXIMACAO", "POUSO", "FINALIZADO", "CANCELADO"),
        default="PROGRAMADO"
    )

    horario_previsto = Column(DateTime, nullable=False)
    horario_real = Column(DateTime, nullable=True)

    latitude_atual = Column(Float, nullable=True)
    longitude_atual = Column(Float, nullable=True)
    altitude_atual = Column(Integer, nullable=True)  # feet
    velocidade_atual = Column(Float, nullable=True)  # km/h

    prioridade = Column(Integer, default=0)
    emergencia = Column(Boolean, default=False)

    criado_em = Column(DateTime, default=datetime.utcnow)
    atualizado_em = Column(DateTime, onupdate=datetime.utcnow)

    # Relacionamentos
    aeronave = relationship("Aeronave", back_populates="voos")
    telemetria = relationship("Telemetria",cascade="all, delete-orphan")
    alertas = relationship("Alerta", back_populates="voo")
```

---

## 5. Schemas (Pydantic)

### 5.1 Schema: VooCriacao

```python
from pydantic import BaseModel, Field, validator
from datetime import datetime

class VooCriacao(BaseModel):
    aeronave_id: int
    tipo_operacao: str  # "chegada" ou "saida"
    horario_previsto: datetime
    prioridade: int = Field(default=0, ge=0, le=10)

    @validator('tipo_operacao')
    def validar_tipo(cls, v):
        if v not in ("chegada", "saida"):
            raise ValueError("tipo_operacao deve ser chegada ou saida")
        return v

class VooResposta(VooCriacao):
    id: int
    codigo_voo: str
    status: str
    latitude_atual: Optional[float] = None
    longitude_atual: Optional[float] = None
    altitude_atual: Optional[int] = None

    class Config:
        from_attributes = True
```

---

## 6. Services (Lógica de Negócio)

### 6.1 VooService

```python
from app.models import Voo
from app.database.session import get_db

class VooService:

    @staticmethod
    def criar_voo(db: Session, voo_data: VooCriacao) -> Voo:
        """Cria novo voo e registra no simulador"""
        # Validar aeronave existe
        aeronave = db.query(Aeronave).get(voo_data.aeronave_id)
        if not aeronave:
            raise ValueError("Aeronave não encontrada")

        # Gerar código único
        codigo = f"VM-SA-{voo_data.tipo_operacao[0].upper()}-{randint(1000, 9999)}"

        # Criar voo
        voo = Voo(**voo_data.dict(), codigo_voo=codigo)
        db.add(voo)
        db.commit()

        # Registrar no simulador
        simulador = get_simulador()
        simulador.registrar_voo(voo)

        return voo

    @staticmethod
    def listar_voos(db: Session, filtros: dict) -> List[Voo]:
        """Lista voos com filtros"""
        query = db.query(Voo)

        if "status" in filtros:
            query = query.filter(Voo.status == filtros["status"])
        if "tipo" in filtros:
            query = query.filter(Voo.tipo_operacao == filtros["tipo"])

        return query.all()
```

---

## 7. Tratamento de Erros

### 7.1 Exceções Customizadas

```python
class APIException(Exception):
    """Base para exceções do sistema"""
    def  __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail

class RecursoNaoEncontrado(APIException):
    def __init__(self, recurso: str):
        super().__init__(404, f"{recurso} não encontrado")

class ValidacaoError(APIException):
    def __init__(self, campo: str, mensagem: str):
        super().__init__(400, f"Erro em {campo}: {mensagem}")

class NaoAutorizado(APIException):
    def __init__(self):
        super().__init__(401, "Não autorizado")
```

### 7.2 Global Exception Handler

```python
@app.exception_handler(APIException)
async def api_exception_handler(request: Request, exc: APIException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail}
    )
```

---

## 8. Autenticação e Autorização

### 8.1 JWT Flow

```
1. User login: POST /api/auth/login
   └─► Valida credentials
   └─► Gera JWT com payload { user_id, papel }
   └─► Retorna access_token

2. Requisição autenticada
   └─► Headers: { Authorization: "Bearer {token}" }
   └─► FastAPI valida token com private key
   └─► Token incluído em context (request.user)

3. Autorização
   └─► Checa papel do usuário
   └─► Only "admin" pode deletar aeronave
```

### 8.2 Dependency para Auth

```python
from fastapi.security import HTTPBearer, HTTPAuthenticationCredentials

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthenticationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> Usuario:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("sub")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(Usuario).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    return user

# Uso
@router.delete("/aeronaves/{id}")
async def delete_aeronave(id: int, current_user: Usuario = Depends(get_current_user)):
    if current_user.papel != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado")
    # ...
```

---

## 9. WebSocket para Tempo Real

### 9.1 Conexão WebSocket

```python
@app.websocket("/ws/voos")
async def websocket_voos(websocket: WebSocket):
    await websocket.accept()

    try:
        while True:
            # Aguarda mensagem do client (optional keep-alive)
            data = await websocket.receive_text()

            # Pode processar comandos do client aqui
            # Exemplo: {"action": "zoom", "params": {...}}

    except WebSocketDisconnect:
        print("Client desconectou")

# Server push (de outro lugar no código)
async def broadcast_telemetria(voo_id: int, posicao: dict):
    for conexao in active_connections:
        await conexao.send_json({
            "tipo": "telemetria_atualizada",
            "voo_id": voo_id,
            "posicao": posicao
        })
```

---

## 10. Testes Unitários

### 10.1 Test criar Voo

```python
import pytest
from app.services import VooService
from app.schemas import VooCriacao

def test_criar_voo_valido(db_session):
    # Arrange
    dados = VooCriacao(
        aeronave_id=1,
        tipo_operacao="saida",
        horario_previsto=datetime(2026, 4, 9, 14, 30),
        prioridade=5
    )

    # Act
    voo = VooService.criar_voo(db_session, dados)

    # Assert
    assert voo.id is not None
    assert voo.status == "PROGRAMADO"
    assert voo.codigo_voo.startswith("VM-SA-")
    db_session.refresh(voo)
    assert voo.codigo_voo in db_session.query(Voo).all()

def test_criar_voo_aeronave_inexistente(db_session):
    # Arrange
    dados = VooCriacao(
        aeronave_id=9999,  # não existe
        tipo_operacao="saida",
        horario_previsto=datetime.now()
    )

    # Act & Assert
    with pytest.raises(ValueError, match="Aeronave não encontrada"):
        VooService.criar_voo(db_session, dados)
```

---

## 11. Variáveis de Ambiente (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/traffic_sim
# ou SQLite
DATABASE_URL=sqlite:///./test.db

# JWT
SECRET_KEY=sua-chave-secreta-muito-longa-aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Server
DEBUG=True
HOST=0.0.0.0
PORT=8000

# Logger
LOG_LEVEL=INFO

# Simulador
SIMULATION_SPEED=1.0  # 1.0 = tempo real
SIMULATION_TICK=1  # segundos entre updates
```

---

## 12. Execução Local

```bash
# 1. Instalar dependências
pip install -r requirements.txt

# 2. Configurar .env
cp .env.example .env
# Editar .env conforme necessário

# 3. Rodar migrações (Future use Alembic)
python -m app.database.init_db

# 4. Iniciar servidor
uvicorn app.main:app --reload

# Servirá em: http://localhost:8000
# Docs: http://localhost:8000/docs (Swagger)
```

---

## 13. Documentos Relacionados

- [ARQUITETURA.md](ARQUITETURA.md)
- [MODELOS-DADOS.md](MODELOS-DADOS.md)
- [SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)

---

**Última Atualização**: 09 de Abril de 2026
