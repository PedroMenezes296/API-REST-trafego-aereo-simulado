# 🚀 Setup e Desenvolvimento

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Documentado

---

## 1. Pré-requisitos

### 1.1 Sistema Operacional

- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 20.04+ ou equivalente)

### 1.2 Software Necessário

| Software   | Versão | Download                      |
| ---------- | ------ | ----------------------------- |
| Git        | 2.30+  | https://git-scm.com           |
| Python     | 3.11+  | https://www.python.org        |
| Node.js    | 18.x+  | https://nodejs.org            |
| PostgreSQL | 13+    | https://www.postgresql.org    |
| VSCode     | Latest | https://code.visualstudio.com |

### 1.3 Variáveis de Ambiente (conforme SO)

**Windows**:

```powershell
$env:PYTHON_HOME = "C:\Python311"
$env:NODE_HOME = "C:\Program Files\nodejs"
```

**Linux/Mac**:

```bash
export PYTHON_HOME=/usr/bin/python3.11
export NODE_HOME=/usr/local/nodejs
```

---

## 2. Instalação Backend

### 2.1 Clonar Repositório

```bash
cd seu-workspace
git clone https://github.com/seu-usuario/projeto.git
cd projeto/backend
```

### 2.2 Criar Ambiente Virtual

**Windows**:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Linux/Mac**:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2.3 Instalar Dependências

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 2.4 Configurar .env

```bash
cp .env.example .env
```

**Editar `.env`**:

```env
# Database (escolher uma opção)
# Option 1: PostgreSQL
DATABASE_URL=postgresql://usuario:senha@localhost:5432/traffic_db

# Option 2: SQLite (desenvolvimento rápido)
DATABASE_URL=sqlite:///./traffic.db

# JWT
SECRET_KEY=sua-chave-secreta-super-longa-aqui-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Server
DEBUG=True
HOST=0.0.0.0
PORT=8000

# Logging
LOG_LEVEL=INFO
```

### 2.5 Inicializar Banco de Dados

```bash
# Criar tabelas (futuro: usar Alembic migrations)
python -c "from app.database.connection import Base, engine; Base.metadata.create_all(bind=engine)"

# Importar dados de aeroportos (opcional)
python -m app.scripts.import_airports
```

### 2.6 Rodar Servidor Backend

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Resultado esperado**:

```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Validar**:

- Docs: http://localhost:8000/docs (Swagger UI)
- Health: http://localhost:8000/health

---

## 3. Instalação Frontend

### 3.1 Navegar até Diretório Frontend

```bash
cd ../front-end
```

### 3.2 Instalar Dependências Node

```bash
npm install
```

**Aguarde** (pode levar 2-3 minutos)

### 3.3 Configurar .env

```bash
cp .env.example .env
```

**Editar `.env`**:

```env
# API Principal
VITE_API_URL=http://localhost:8000

# WebSocket
VITE_WS_URL=ws://localhost:8000

# Ambiente
VITE_ENV=development

# Debug
VITE_DEBUG=true
```

### 3.4 Rodar Dev Server Frontend

```bash
npm run dev
```

**Resultado esperado**:

```
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Validar**:

- App: http://localhost:5173
- Deve carregar com erro de conexão (backend ainda não pronto para auth)

---

## 4. Configuração PostgreSQL (Opcional)

### 4.1 Instalação

**Windows**:

- Download: https://www.postgresql.org/download/windows/
- Instalar com pgAdmin 4
- During install, set password for `postgres` user

**Linux**:

```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Mac**:

```bash
brew install postgresql
brew services start postgresql
```

### 4.2 Criar Banco de Dados

```bash
# Login
psql -U postgres

# Criar DB
CREATE DATABASE traffic_db;
CREATE USER traffic_user WITH PASSWORD 'sua_senha_segura';
ALTER ROLE traffic_user SET client_encoding TO 'utf8';
ALTER ROLE traffic_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE traffic_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE traffic_db TO traffic_user;

# Sair
\q
```

### 4.3 Conectar Backend ao PostgreSQL

**Atualizar `.env`**:

```env
DATABASE_URL=postgresql://traffic_user:sua_senha_segura@localhost:5432/traffic_db
```

**Reiniciar backend**:

```bash
# Terminal 2
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

---

## 5. Fluxo de Desenvolvimento Completo

### 5.1 Setup Inicial (primeira vez)

```bash
# Terminal 1: Frontend
cd projeto/front-end
npm install
npm run dev
# Esperado: http://localhost:5173

# Terminal 2: Backend
cd projeto/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Esperado: http://localhost:8000/docs

# Terminal 3: Acompanhar logs (opcional)
tail -f logs/app.yml
```

### 5.2 Sessão de Desenvolvimento Diária

```bash
# Terminal 1
cd projeto/back-end
source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2
cd projeto/front-end
npm run dev
```

---

## 6. Testes

### 6.1 Testes Backend

```bash
cd backend
source venv/bin/activate

# Executar todos os testes
pytest

# Com cobertura
pytest --cov=app --cov-report=html

# Teste específico
pytest tests/test_auth.py::test_login

# Modo verbose
pytest -v
```

### 6.2 Testes Frontend

```bash
cd front-end

# Rodar testes
npm run test

# Com cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

---

## 7. Lint e Formatação

### 7.1 Python (Black + Flake8)

```bash
cd backend
source venv/bin/activate

# Formatar com Black
black app/

# Verificar com Flake8
flake8 app/ --max-line-length=100

# Ambos
black app/ && flake8 app/
```

### 7.2 JavaScript (ESLint + Prettier)

```bash
cd front-end

# Formatar com Prettier
npx prettier --write src/

# Verificar com ESLint
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

---

## 8. Deploy Local (Produção Simulada)

### 8.1 Build Frontend

```bash
cd front-end
npm run build

# Output: dist/
```

### 8.2 Servir com Servidor Estático

```bash
# Instalar http-server globalmente
npm install -g http-server

# Servir dist
cd dist
http-server -p 3000
```

**Resultado**: http://localhost:3000

### 8.3 Gunicorn Backend (melhor que Uvicorn para prod)

```bash
cd backend
source venv/bin/activate
pip install gunicorn

gunicorn app.main:app -w 4 -b 0.0.0.0:8000
```

---

## 9. Troubleshooting

### Problema: "ModuleNotFoundError: No module named 'app'"

**Solução**:

```bash
cd backend
# Verificar se venv está ativado
which python  # Deve mostrar caminho dentro venv/

# Se não, ativar
source venv/bin/activate

# Reinstalar
pip install -e .
```

### Problema: "CORS error ao conectar frontend/backend"

**Solução** (Backend `main.py`):

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Problema: "Port 8000 is already in use"

**Solução**:

```bash
# Linux/Mac: Encontrar processo
lsof -i :8000

# Matar processo
kill -9 <PID>

# Ou usar porta diferente
uvicorn app.main:app --reload --port 8001
```

### Problema: "PostgreSQL connection refused"

**Solução**:

```bash
# Verificar serviço
sudo systemtl status postgresql

# Iniciar se parado
sudo systemctl start postgresql

# Verificar credenciais em .env
psql -U traffic_user -d traffic_db -h localhost
```

---

## 10. Git Workflow

### 10.1 Fluxo de Commits

```bash
# 1. Criar branch feature
git checkout -b feature/eu-digitadora-novo

# 2. Fazer changes
# Editar arquivos...

# 3. Stage changes
git add app/

# 4. Commit com mensagem descritiva
git commit -m "feat: nova funcionalidade de alertas"

# 5. Push para remoto
git push origin feature/eu-digitadora-novo

# 6. Criar Pull Request no GitHub

# 7. Merge (após approval)
git checkout main
git pull
git merge --no-ff feature/eu-digitadora-novo
git push
```

### 10.2 Padrão de Commit (Conventional)

```
feat: nova funcionalidade
fix: correção de bug
docs: atualização documentação
style: formatação código
refactor: reorganização sem mudança de comportamento
test: adicionar/atualizar testes
chore: atualizar dependências
```

---

## 11. VSCode Extensions Recomendadas

**Backend**:

- Python
- Pylance
- Pytest
- SQLTools

**Frontend**:

- ES7+ React/Redux/React-Native snippets
- ESLint
- Prettier
- Tailwind CSS IntelliSense

**Geral**:

- GitLens
- Thunder Client (ou REST Client)
- Markdown Preview Enhanced

---

## 12. Documentos Relacionados

- [ARQUITETURA.md](ARQUITETURA.md)
- [BACKEND-API.md](BACKEND-API.md)
- [FRONTEND.md](FRONTEND.md)
- [MODELOS-DADOS.md](MODELOS-DADOS.md)

---

## 13. Suporte

**Dúvidas?**:

1. Verificar FAQ em README.md
2. Buscar em Dicussões GitHub
3. Contactar orientador/líder técnico

---

**Última Atualização**: 09 de Abril de 2026
