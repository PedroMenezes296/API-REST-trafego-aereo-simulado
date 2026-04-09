# 📚 Documentação - Sistema de Gerenciamento de Tráfego Aéreo Simulado

Bem-vindo à documentação completa do projeto! Esta pasta contém toda a documentação de engenharia de software, de acordo com as melhores práticas de gerenciamento de requisitos e arquitetura de sistemas.

---

## 📖 Comece Por Aqui

**Novo no projeto?** Leia nesta ordem:

1. **[00-INDICE.md](00-INDICE.md)** ← Mapa completo de toda documentação
2. **[01-CONCEPCAO.md](01-CONCEPCAO.md)** ← Entenda o "por quê" do projeto
3. **[SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)** ← Configurar ambiente local
4. **[ARQUITETURA.md](ARQUITETURA.md)** ← Visão geral técnica
5. Depois explore conforme sua role:
   - **Dev Backend**: [BACKEND-API.md](BACKEND-API.md) → [MODELOS-DADOS.md](MODELOS-DADOS.md)
   - **Dev Frontend**: [FRONTEND.md](FRONTEND.md) → [SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)
   - **Gestor**: [02-LEVANTAMENTO-REQUISITOS.md](02-LEVANTAMENTO-REQUISITOS.md) → [06-GESTAO-REQUISITOS.md](06-GESTAO-REQUISITOS.md)
   - **QA/Tester**: [05-VALIDACAO-REQUISITOS.md](05-VALIDACAO-REQUISITOS.md) → [RASTREABILIDADE.md](RASTREABILIDADE.md)

---

## 📋 Lista Completa de Documentos

### 🎯 Engenharia de Software (6 fases)

| Documento                                                            | Descrição                                     | Público               |
| -------------------------------------------------------------------- | --------------------------------------------- | --------------------- |
| **[01-CONCEPCAO.md](01-CONCEPCAO.md)**                               | Visão, problema, objetivos, escopo            | Todos                 |
| **[02-LEVANTAMENTO-REQUISITOS.md](02-LEVANTAMENTO-REQUISITOS.md)**   | Requisitos funcionais e não-funcionais        | Developers, PMs       |
| **[03-NEGOCIACAO-REQUISITOS.md](03-NEGOCIACAO-REQUISITOS.md)**       | Conflitos resolvidos, priorização, trade-offs | PMs, Líderes Técnicos |
| **[04-ESPECIFICACAO-REQUISITOS.md](04-ESPECIFICACAO-REQUISITOS.md)** | Detalhe completo de cada requisito            | Developers            |
| **[05-VALIDACAO-REQUISITOS.md](05-VALIDACAO-REQUISITOS.md)**         | Plano e estratégia de testes                  | QA, Developers        |
| **[06-GESTAO-REQUISITOS.md](06-GESTAO-REQUISITOS.md)**               | Controle mudanças, versioning, acompanhamento | PMs, All              |

### 🏛️ Arquitetura e Design

| Documento                                | Descrição                                   | Público                |
| ---------------------------------------- | ------------------------------------------- | ---------------------- |
| **[ARQUITETURA.md](ARQUITETURA.md)**     | Visão geral: camadas, componentes, fluxos   | Tech Leads, Developers |
| **[BACKEND-API.md](BACKEND-API.md)**     | Stack, endpoints, services, autenticação    | Backend Developers     |
| **[FRONTEND.md](FRONTEND.md)**           | Stack, componentes, pages, state management | Frontend Developers    |
| **[MODELOS-DADOS.md](MODELOS-DADOS.md)** | Diagrama ER, DDL, relacionamentos           | Developers, DBAs       |

### 📊 Rastreamento e Validação

| Documento                                    | Descrição                                   | Público      |
| -------------------------------------------- | ------------------------------------------- | ------------ |
| **[RASTREABILIDADE.md](RASTREABILIDADE.md)** | Matriz RF×Componentes, RF×Testes, cobertura | QA, PMs, All |
| **[00-INDICE.md](00-INDICE.md)**             | Índice geral com links a todos docs         | Navegação    |

### 🚀 Setup e Operação

| Documento                                                | Descrição                                       | Público    |
| -------------------------------------------------------- | ----------------------------------------------- | ---------- |
| **[SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)** | Instalação, configuração local, troubleshooting | Developers |

---

## 🎓 Funções e Documentos Recomendados

### Desenvolvedor Backend

```
Essencial:
  ✅ SETUP-DESENVOLVIMENTO.md (Setup)
  ✅ ARQUITETURA.md (Context)
  ✅ BACKEND-API.md (Detailed)
  ✅ MODELOS-DADOS.md (DB Design)

Referência:
  📖 04-ESPECIFICACAO-REQUISITOS.md (Requirements)
  📖 RASTREABILIDADE.md (Test Matrix)
```

### Desenvolvedor Frontend

```
Essencial:
  ✅ SETUP-DESENVOLVIMENTO.md (Setup)
  ✅ ARQUITETURA.md (Context)
  ✅ FRONTEND.md (Detailed)

Referência:
  📖 04-ESPECIFICACAO-REQUISITOS.md (Requirements)
  📖 BACKEND-API.md (API Endpoints)
```

### Gerente de Projeto

```
Essencial:
  ✅ 01-CONCEPCAO.md (Vision)
  ✅ 02-LEVANTAMENTO-REQUISITOS.md (Features)
  ✅ 03-NEGOCIACAO-REQUISITOS.md (Scope)
  ✅ 06-GESTAO-REQUISITOS.md (Tracking)

Acompanhamento:
  📖 RASTREABILIDADE.md (Status Burndown)
```

### QA/Testador

```
Essencial:
  ✅ 05-VALIDACAO-REQUISITOS.md (Test Plan)
  ✅ 04-ESPECIFICACAO-REQUISITOS.md (AC)
  ✅ RASTREABILIDADE.md (Test Matrix)

Técnico:
  📖 BACKEND-API.md (APIs to test)
  📖 FRONTEND.md (Workflows)
```

---

## 📊 Estrutura de Pastas

```
📁 documentacao/
├── 📄 00-INDICE.md                    ← Comece aqui!
├── 📄 01-CONCEPCAO.md                 ← Fase 1
├── 📄 02-LEVANTAMENTO-REQUISITOS.md   ← Fase 2
├── 📄 03-NEGOCIACAO-REQUISITOS.md     ← Fase 3
├── 📄 04-ESPECIFICACAO-REQUISITOS.md  ← Fase 4
├── 📄 05-VALIDACAO-REQUISITOS.md      ← Fase 5
├── 📄 06-GESTAO-REQUISITOS.md         ← Fase 6
├── 📄 ARQUITETURA.md                  ← Visão Geral
├── 📄 BACKEND-API.md                  ← Backend
├── 📄 FRONTEND.md                     ← Frontend
├── 📄 MODELOS-DADOS.md                ← Database
├── 📄 RASTREABILIDADE.md              ← Tracking
├── 📄 SETUP-DESENVOLVIMENTO.md        ← Setup
└── 📄 README.md                       ← Este arquivo
```

---

## 🎯 Quick Links

### Para Configurar o Ambiente

→ [SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)

### Para Entender Requisitos

→ [02-LEVANTAMENTO-REQUISITOS.md](02-LEVANTAMENTO-REQUISITOS.md)

### Para Começar a Codificar (Backend)

→ [BACKEND-API.md](BACKEND-API.md)

### Para Começar a Codificar (Frontend)

→ [FRONTEND.md](FRONTEND.md)

### Para Entender a Arquitetura

→ [ARQUITETURA.md](ARQUITETURA.md)

### Para Ver Status do Projeto

→ [RASTREABILIDADE.md](RASTREABILIDADE.md)

### Para Consultar BD

→ [MODELOS-DADOS.md](MODELOS-DADOS.md)

---

## 📞 Informações Gerais

**Projeto**: Sistema de Gerenciamento de Tráfego Aéreo Simulado  
**Data Criação**: 09 de Abril de 2026  
**Última Atualização**: 09 de Abril de 2026  
**Status**: ✅ Documentação Completa (V1.0)

**Stack Principal**:

- Backend: Python 3.11+ (FastAPI, SQLAlchemy, SimPy)
- Frontend: Node.js 18+ (React, Tailwind, Leaflet)
- Database: PostgreSQL/SQLite
- Deployment: Docker (opcional)

---

## 📝 Convenções Utilizadas

### Status Indicators

- ✅ Completo/Implementado/Testado
- 🔵 Em Design/Especificação
- ⏳ Planejado
- ⚠️ Atenção requerida
- ❌ Não escopo/Descartado

### Prioridades (MoSCoW)

- 🔴 MUST (Crítico/Essencial)
- 🟠 SHOULD (Importante)
- 🟡 COULD (Desejável)
- ⭕ WONT (Fora escopo)

### Links

- **[Arquivo.md](Arquivo.md)** = Link interno
- [Externa](https://link) = Link externo

---

## 🔄 Ciclo de Vida Esperado

```
Sprint 1 (09-20 Abr)
  └─ Setup básico + Auth + BD ✅

Sprint 2 (21 Abr - 04 Mai)
  └─ Aeronaves + Voos V1 🔵

Sprint 3 (05-18 Mai)
  └─ Simulador + Alertas ⏳

Sprint 4 (19 Mai - 01 Jun)
  └─ Frontend completo ⏳

Sprint 5 (02-15 Jun)
  └─ Testes + Validação ⏳

Sprint 6 (16-30 Jun)
  └─ Finalização + Deploy ⏳
```

---

## 💡 Dicas de Uso

### 1. **Buscar um Requisito**

→ Use RASTREABILIDADE.md para encontrar RF-xxx

### 2. **Ver Critério de Aceitação**

→ Veja 04-ESPECIFICACAO-REQUISITOS.md

### 3. **Consultar Endpoints da API**

→ Veja BACKEND-API.md (seção Endpoints)

### 4. **Adicionar Nova Feature**

→ Siga processo em 06-GESTAO-REQUISITOS.md (Change Request)

### 5. **Executar Primeira Vez**

→ Veja SETUP-DESENVOLVIMENTO.md (Fluxo Completo)

---

## 📚 Referências Externas

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)
- [SimPy Docs](https://simpy.readthedocs.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet.js](https://leafletjs.com/)

---

## ❓ FAQ

**P: Posso usar SQLite em produção?**  
R: Não recomendado. Use para desenvolvimento/testes. PostgreSQL é melhor para escala.

**P: Como atualizar documentação?**  
R: Commits seguindo convenção "docs: descrição da mudança"

**P: Documentação está desatualizada?**  
R: Reporte em Issues com "docs:" ou crie PR com correção

**P: Preciso adicionar novo requisito?**  
R: Siga processo de Change Request em 06-GESTAO-REQUISITOS.md

---

**Última Atualização**: 09 de Abril de 2026  
**Próxima Revisão**: 16 de Abril de 2026
