import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import CadastroVoo from "../pages/CadastroVoo/CadastroVoo";
import Configuracoes from "../pages/Configuracoes/Configuracoes";
import Simulacao from "../pages/Simulacao/Simulacao";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cadastro-voo" element={<CadastroVoo />} />
          <Route path="configuracoes" element={<Configuracoes />} />
          <Route path="simulacao" element={<Simulacao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
