# 🎨 Frontend - Interface Web

**Data**: 09 de Abril de 2026  
**Versão**: 1.0  
**Status**: ✅ Documentado

---

## 1. Stack Tecnológico

| Camada    | Tecnologia      | Versão |
| --------- | --------------- | ------ |
| Build     | Vite            | 5.0+   |
| Framework | React           | 18.2+  |
| Styling   | Tailwind CSS    | 3.4+   |
| State     | Zustand         | 4.4+   |
| Maps      | Leaflet.js      | 1.9+   |
| Charts    | Chart.js        | 4.4+   |
| HTTP      | Axios           | 1.6+   |
| Forms     | React Hook Form | 7.48+  |
| Routing   | React Router    | 6.20+  |

---

## 2. Estrutura de Diretórios

```
front-end/
├── src/
│   ├── main.jsx                    # Entry point
│   ├── index.css                   # Global styles
│   ├── App.jsx                     # App root
│   ├── routes/
│   │   └── AppRoutes.jsx           # Router setup
│   ├── pages/
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── KPIs.jsx
│   │   │   └── Graficos.jsx
│   │   ├── Voos/
│   │   │   ├── ListaVoos.jsx
│   │   │   ├── CadastroVoo.jsx
│   │   │   └── DetalheVoo.jsx
│   │   ├── Mapa/
│   │   │   └── Mapa.jsx
│   │   ├── Aeronaves/
│   │   │   ├── ListaAeronaves.jsx
│   │   │   └── CadastroAeronave.jsx
│   │   ├── Alertas/
│   │   │   └── PainelAlertas.jsx
│   │   └── Auth/
│   │       ├── Login.jsx
│   │       └── Register.jsx
│   ├── components/
│   │   ├── Layout.jsx              # Header + Sidebar
│   │   ├── Mapa.jsx               # Componente reutilizável
│   │   ├── Tabelas/
│   │   │   ├── TabelaVoos.jsx
│   │   │   └── TabelaAeronaves.jsx
│   │   ├── Cards/
│   │   │   ├── CardKPI.jsx
│   │   │   └── CardAlerta.jsx
│   │   ├── Formularios/
│   │   │   ├── FormCadastroVoo.jsx
│   │   │   └── FormCadastroAeronave.jsx
│   │   └── Notificacoes/
│   │       ├── Toast.jsx
│   │       └── Modal.jsx
│   ├── hooks/
│   │   ├── useAPI.js               # Custom hook para HTTP
│   │   ├── useWebSocket.js         # Custom hook WebSocket
│   │   ├── useAuth.js              # Context de auth
│   │   ├── useVoos.js              # Lógica de voos
│   │   └── useMapa.js              # Lógica do mapa
│   ├── context/
│   │   ├── AuthContext.jsx         # Contexto autenticação
│   │   ├── AppContext.jsx          # Contexto app global
│   │   └── NotificacaoContext.jsx  # Contexto notifications
│   ├── store/
│   │   ├── vooStore.js             # Zustand store voos
│   │   ├── mapaStore.js            # Zustand store mapa
│   │   └── alertaStore.js          # Zustand store alertas
│   ├── services/
│   │   ├── api.js                  # Instância Axios
│   │   ├── apiVoos.js              # Endpoints voos
│   │   ├── apiAeronaves.js         # Endpoints aeronaves
│   │   ├── apiAlertas.js           # Endpoints alertas
│   │   └── websocketService.js     # WebSocket client
│   ├── utils/
│   │   ├── formatters.js           # Formatadores (data, etc)
│   │   ├── validators.js           # Validadores
│   │   ├── constants.js            # Constantes globais
│   │   ├── colors.js               # Paleta cores
│   │   └── helpers.js              # Hepers genéricos
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── styles/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.example
```

---

## 3. Páginas Principais

### 3.1 Dashboard

**Localização**: `pages/Dashboard/Dashboard.jsx`

**Componentes**:

- Header com saudação
- KPIs (Cards):
  - Voos programados hoje
  - Alertas ativos
  - Taxa sucesso operações
  - Ocupação pistas
- Gráficos:
  - Ocupação pistas ao longo do tempo
  - Distribuição tipos operação
- Tabelas
  - Últimos voos criados
  - Alertas recentes

**Estado Gerenciado**:

- Zustand: vooStore, alertaStore
- Context: AuthContext

---

### 3.2 Mapa Interativo

**Localização**: `pages/Mapa/Mapa.jsx` + `components/Mapa.jsx`

**Bibliotecas**:

- Leaflet.js (mapa)
- Leaflet-Routing-Machine (rotas, opcional)
- Custom markers (aeronaves)

**Features**:

- Centro no aeroporto (lat, lon carregados)
- Zoom 5-18
- Camadas (base map, satellite, terrain)
- Marcadores dinâmicos (aeronaves)
- Pop-ups ao clicar
- Trail/esteira de rota

**Atualização em Tempo Real**:

```javascript
// useWebSocket.js
useEffect(() => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.tipo === "telemetria_atualizada") {
      // Atualizar posição do ícone no mapa
      atualizarMarcador(data.voo_id, data.posicao);
    }
  };
}, []);
```

---

### 3.3 Gerenciamento de Voos

**Localização**: `pages/Voos/`

#### 3.3.1 Lista de Voos

- Tabela com filtros (status, tipo, data)
- Paginação (10 voos por página)
- Ações: visualizar, editar, cancelar
- Exportar para CSV

#### 3.3.2 Cadastro Voo

Formulário com campos:

- Aeronave (dropdown)
- Tipo operação (radio: chegada/saída)
- Horário previsto (datepicker + timepicker)
- Prioridade (slider 0-10)

Validações:

- Campos obrigatórios
- Horário >= agora
- Aeronave não em manutenção

#### 3.3.3 Detalhe Voo

- Info completa: código, status, aeronave, horário
- Posição atual (lat, lon, alt, vel)
- Estado: PROGRAMADO → ... → FINALIZADO
- Histórico de mudanças
- Botões ação: edit, resolve, cancelar

---

### 3.4 Gerenciamento de Aeronaves

**Localização**: `pages/Aeronaves/`

#### 3.4.1 Lista Aeronaves

- Tabela com filtros (status, modelo)
- Info: matrícula, modelo, capacidade
- Ações: editar, deletar, visualizar voos

#### 3.4.2 Cadastro Aeronave

Campos:

- Modelo (text input)
- Fabricante (text input)
- Matrícula (text input, formato XX-XXX)
- Capacidade (number input)
- Status (dropdown: ativo, inativo, manutenção)

---

### 3.5 Painel de Alertas

**Localização**: `pages/Alertas/PainelAlertas.jsx`

- Listagem alertas (com filtros: severidade, tipo, resolvido)
- Cards por alerta com ícone e cor (vermelho=crítico, amarelo=aviso)
- Ações: resolver, descartar, visualizar voo associado
- Toast notifications para novos alertas

---

## 4. Componentes Reutilizáveis

### 4.1 Card KPI

```jsx
// components/Cards/CardKPI.jsx
export function CardKPI({ titulo, valor, icone, cor }) {
  return (
    <div className={`bg-${cor}-50 border-l-4 border-${cor}-500 p-4`}>
      <div className="flex items-center">
        <span className={`text-${cor}-600`}>{icone}</span>
        <div className="ml-3">
          <p className="text-sm text-gray-500">{titulo}</p>
          <p className="text-2xl font-bold">{valor}</p>
        </div>
      </div>
    </div>
  );
}
```

### 4.2 Tabela Voos

```jsx
// components/Tabelas/TabelaVoos.jsx
export function TabelaVoos({ voos, onEdit, onDelete, onSelect }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th>Código</th>
          <th>Aeronave</th>
          <th>Status</th>
          <th>Horário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {voos.map((voo) => (
          <tr key={voo.id} className="border-b hover:bg-gray-50">
            <td>{voo.codigo_voo}</td>
            <td>{voo.aeronave.matricula}</td>
            <td>
              <Badge status={voo.status} />
            </td>
            <td>{formatarData(voo.horario_previsto)}</td>
            <td>
              <button onClick={() => onSelect(voo.id)}>Ver</button>
              {/* ... mais ações ... */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## 5. Custom Hooks

### 5.1 useAPI

```javascript
// hooks/useAPI.js
export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api[method.toLowerCase()](endpoint, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || "Erro na requisição");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}

// Uso
const { request, loading } = useAPI();
const voos = await request("GET", "/api/voos");
```

### 5.2 useWebSocket

```javascript
// hooks/useWebSocket.js
export function useWebSocket() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/voos`);

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onerror = (error) => console.error("WS error:", error);

    setSocket(ws);

    return () => ws.close();
  }, []);

  const send = (data) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
    }
  };

  return { socket, isConnected, send };
}
```

---

## 6. State Management (Zustand)

### 6.1 Voo Store

```javascript
// store/vooStore.js
import create from "zustand";

export const useVooStore = create((set) => ({
  voos: [],
  filtros: { status: "ATIVO", tipo: null },

  setVoos: (voos) => set({ voos }),

  addVoo: (voo) =>
    set((state) => ({
      voos: [...state.voos, voo],
    })),

  updateVoo: (id, updates) =>
    set((state) => ({
      voos: state.voos.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    })),

  removeVoo: (id) =>
    set((state) => ({
      voos: state.voos.filter((v) => v.id !== id),
    })),

  setFiltros: (filtros) => set({ filtros }),
}));
```

---

## 7. Autenticação (Context)

### 7.1 AuthContext

```javascript
// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      // Validar token com backend
      verificarToken(token);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    setToken(access_token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 8. Formulários (React Hook Form)

### 8.1 Cadastro Voo

```jsx
// components/Formularios/FormCadastroVoo.jsx
import { useForm } from "react-hook-form";

export function FormCadastroVoo({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Aeronave</label>
        <select {...register("aeronave_id", { required: true })}>
          <option>Selecione aeronave</option>
          {aeronaves.map((a) => (
            <option key={a.id} value={a.id}>
              {a.matricula}
            </option>
          ))}
        </select>
        {errors.aeronave_id && <span>Campo obrigatório</span>}
      </div>

      <div>
        <label>Horário Previsto</label>
        <input
          type="datetime-local"
          {...register("horario_previsto", { required: true })}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Criar Voo
      </button>
    </form>
  );
}
```

---

## 9. Responsividade (Tailwind)

```jsx
// Exemplo: Componente responsivo
<div
  className="
  grid 
  grid-cols-1       // Mobile: 1 coluna
  md:grid-cols-2    // Tablet: 2 colunas
  lg:grid-cols-3    // Desktop: 3 colunas
  gap-4
"
>
  {cards.map((card) => (
    <Card key={card.id} {...card} />
  ))}
</div>
```

---

## 10. Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
cp .env.example .env
# VITE_API_URL=http://localhost:8000

# 3. Rodar dev server
npm run dev

# Servirá em: http://localhost:5173

# 4. Build para produção
npm run build

# 5. Preview build
npm run preview
```

---

## 11. Documentos Relacionados

- [ARQUITETURA.md](ARQUITETURA.md)
- [BACKEND-API.md](BACKEND-API.md)
- [SETUP-DESENVOLVIMENTO.md](SETUP-DESENVOLVIMENTO.md)

---

**Última Atualização**: 09 de Abril de 2026
