# 📚 Índice de Documentação - Sistema de Gerenciamento de Tráfego Aéreo Simulado

## Visão Geral do Projeto

Este documento agrupa toda a documentação de engenharia de software do projeto de **Gerenciamento de Tráfego Aéreo Simulado**, desenvolvido com foco acadêmico em conceitos de simulação, eventos discretos e sistemas distribuídos.

---

## 📋 Documentos Disponíveis

### 🎯 Fase 1: Conceção

**[01-CONCEPCAO.md](01-CONCEPCAO.md)**

- Visão geral do projeto
- Problema a ser resolvido
- Motivação e contexto
- Objetivos gerais
- Restrições e assumptions
- Principais stakeholders

### 📝 Fase 2: Levantamento de Requisitos

**[02-LEVANTAMENTO-REQUISITOS.md](02-LEVANTAMENTO-REQUISITOS.md)**

- Técnicas de levantamento utilizadas
- Requisitos funcionais identificados
- Requisitos não-funcionais identificados
- Atores do sistema
- Casos de uso
- Requisitos de negócio

### 🤝 Fase 3: Negociação de Requisitos

**[03-NEGOCIACAO-REQUISITOS.md](03-NEGOCIACAO-REQUISITOS.md)**

- Conflitos identificados
- Resolução de conflitos
- Priorização de requisitos
- Trade-offs realizados
- Aprovação de stakeholders
- Escopo final definido

### 📐 Fase 4: Especificação de Requisitos

**[04-ESPECIFICACAO-REQUISITOS.md](04-ESPECIFICACAO-REQUISITOS.md)**

- Especificação detalhada dos requisitos
- Requisitos funcionais refinados
- Requisitos não-funcionais detalhados
- Especificação de dados
- Interfaces do sistema
- Critérios de aceitação

### ✅ Fase 5: Validação de Requisitos

**[05-VALIDACAO-REQUISITOS.md](05-VALIDACAO-REQUISITOS.md)**

- Plano de validação
- Testes de validação
- Rastreabilidade de requisitos
- Matriz de rastreabilidade
- Conformidade com o escopo
- Aprovação final

### 🎛️ Fase 6: Gestão de Requisitos

**[06-GESTAO-REQUISITOS.md](06-GESTAO-REQUISITOS.md)**

- Plano de gestão de requisitos
- Controle de mudanças
- Versionamento
- Track de modificações
- Status atual dos requisitos
- Próximas iterações planejadas

---

## 🏗️ Documentação Técnica

### 🏛️ Arquitetura do Sistema

**[ARQUITETURA.md](ARQUITETURA.md)**

- Visão geral da arquitetura
- Componentes principais (Backend, Frontend, Simulador, BD)
- Padrões de arquitetura utilizados
- Fluxo de dados
- Integração entre componentes
- Diagramas de arquitetura

### 🔧 Backend - API

**[BACKEND-API.md](BACKEND-API.md)**

- Stack tecnológico (FastAPI, SQLAlchemy, SimPy)
- Estrutura de diretórios
- Modelos de dados
- Endpoints da API
- Autenticação e autorização
- Integração com validador
- Tratamento de erros

### 🎨 Frontend

**[FRONTEND.md](FRONTEND.md)**

- Stack tecnológico (React, Vite, Tailwind)
- Estrutura de componentes
- Páginas principais
- Mapa interativo (Leaflet)
- Atualização em tempo real
- Estado da aplicação
- Guia de componentes

### 🚀 Configuração e Deployment

**[SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)**

- Pré-requisitos
- Instalação do backend
- Instalação do frontend
- Configuração do banco de dados
- Variáveis de ambiente
- Rodando localmente
- Deploy em produção
- Troubleshooting

### 🗂️ Modelos de Dados

**[MODELOS-DADOS.md](MODELOS-DADOS.md)**

- Diagrama ER
- Descrição de tabelas
- Relacionamentos
- Índices
- Constraints
- Scripts de inicialização

---

## 📊 Matriz de Rastreabilidade

**[RASTREABILIDADE.md](RASTREABILIDADE.md)**

- Matriz de rastreabilidade completa
- Mapeamento Requisitos → Componentes
- Mapeamento Requisitos → Testes
- Status de implementação
- Cobertura de testes

---

## 📈 Evolução do Projeto

### Sprints e Iterações

- Sprint 1: Infraestrutura e base de dados ✅
- Sprint 2: API REST e autenticação ✅
- Sprint 3: Simulador de eventos (SimPy) ⏳
- Sprint 4: Frontend - Dashboard ⏳
- Sprint 5: Mapa interativo ⏳
- Sprint 6: Alertas e notificações 📋
- Sprint 7: Testes e otimizações 📋

---

## 📞 Informações de Contato

**Projeto**: Sistema de Gerenciamento de Tráfego Aéreo Simulado
**Instituição**: [Sua Instituição]
**Data de Criação**: 2026
**Última Atualização**: 09 de Abril de 2026

---

## 📖 Como Usar Esta Documentação

1. **Novos membros da equipe**: Comece por [01-CONCEPCAO.md](01-CONCEPCAO.md) e [02-LEVANTAMENTO-REQUISITOS.md](02-LEVANTAMENTO-REQUISITOS.md)
2. **Desenvolvedores Backend**: Consulte [BACKEND-API.md](BACKEND-API.md) e [MODELOS-DADOS.md](MODELOS-DADOS.md)
3. **Desenvolvedores Frontend**: Consulte [FRONTEND.md](FRONTEND.md) e [ARQUITETURA.md](ARQUITETURA.md)
4. **Gerentes de Projeto**: Consulte [06-GESTAO-REQUISITOS.md](06-GESTAO-REQUISITOS.md) e [RASTREABILIDADE.md](RASTREABILIDADE.md)
5. **Revisão de Requisitos**: Consulte [05-VALIDACAO-REQUISITOS.md](05-VALIDACAO-REQUISITOS.md)

---

**Última Atualização**: 09 de Abril de 2026
