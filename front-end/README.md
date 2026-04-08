# ✈️ Sistema de Gerenciamento de Tráfego Aéreo — Frontend

## 📌 Descrição

Este projeto corresponde ao frontend do sistema de gerenciamento de tráfego aéreo simulado. A aplicação permite visualizar, cadastrar e acompanhar operações de voos, além de oferecer uma simulação visual em tempo real das atividades em pista.

O sistema foi desenvolvido com foco em organização, escalabilidade e integração com uma API backend baseada em FastAPI.

---

## 🚀 Tecnologias utilizadas

* React
* Vite
* JavaScript
* React Router DOM
* CSS

---

## 🧱 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis (Layout, Sidebar, etc.)
├── pages/          # Páginas do sistema
│   ├── Home
│   ├── Dashboard
│   ├── CadastroVoo
│   ├── Configuracoes
│   └── Simulacao
├── routes/         # Definição das rotas da aplicação
├── services/       # Integração com API (futuro)
├── styles/         # Estilos globais
```

---

## 🖥️ Funcionalidades atuais

* Navegação entre páginas
* Layout com menu lateral (Sidebar)
* Página inicial de apresentação do sistema
* Dashboard (estrutura inicial)
* Cadastro de voos (estrutura inicial)
* Página de configurações
* Simulação visual de aviões em pista (movimento simulado)

---

## ✈️ Simulação em tempo real

A aplicação possui uma página dedicada à simulação de operações em pista.

Atualmente:

* Aviões são representados por elementos visuais
* A posição é atualizada a cada segundo
* A movimentação é simulada via estado interno do React

Futuramente:

* Integração com backend
* Atualização baseada em dados reais da API
* Múltiplas pistas
* Estados operacionais (pouso, decolagem, taxiamento)

---

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Acesse a pasta do frontend

```bash
cd frontend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

### 5. Acesse no navegador

```
http://localhost:5173/
```

---

## 🔗 Integração com Backend

Este frontend foi projetado para consumir uma API REST desenvolvida com FastAPI.

Endpoints esperados:

* `/aeroportos`
* `/voos`
* `/operacoes/resumo`

A integração será realizada na pasta:

```
src/services/api.js
```

---

## 📈 Próximas melhorias

* Integração completa com API
* Dashboard com dados reais
* Cadastro de voos funcional
* Simulação baseada em backend
* Suporte a múltiplas pistas
* Visualização gráfica avançada
* Possível uso de WebSocket para atualização em tempo real

---

## 👨‍💻 Autor

Desenvolvido como parte de um projeto acadêmico de Engenharia de Software, com foco em simulação, sistemas distribuídos e visualização de dados.

---

## 📌 Observações

Este projeto está em desenvolvimento contínuo e novas funcionalidades serão adicionadas progressivamente.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
