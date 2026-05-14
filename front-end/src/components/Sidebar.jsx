import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const tipo = auth?.tipo;

  function sair() {
    localStorage.removeItem("auth");
    navigate("/acesso");
  }

  return (
    <aside className="sidebar">
      <h2>Menu</h2>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>

        {tipo === "admin" && (
          <>
            <NavLink to="/cadastro-voo">Cadastro de Voo</NavLink>
            <NavLink to="/configuracoes">Configurações</NavLink>
          </>
        )}

        <NavLink to="/simulacao">Simulação</NavLink>

        <button
          onClick={sair}
          style={{
            marginTop: "12px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
