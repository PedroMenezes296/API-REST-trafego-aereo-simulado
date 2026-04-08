import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Menu</h2>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/cadastro-voo">Cadastro de Voo</NavLink>
        <NavLink to="/configuracoes">Configurações</NavLink>
        <NavLink to="/simulacao">Simulação</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
