import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import CadastroVoo from "../pages/CadastroVoo/CadastroVoo";
import Configuracoes from "../pages/Configuracoes/Configuracoes";
import Simulacao from "../pages/Simulacao/Simulacao";
import Acesso from "../pages/Acesso/Acesso";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/acesso" element={<Acesso />} />

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute allow={["usuario", "admin"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allow={["usuario", "admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="cadastro-voo"
            element={
              <ProtectedRoute allow={["admin"]}>
                <CadastroVoo />
              </ProtectedRoute>
            }
          />
          <Route
            path="configuracoes"
            element={
              <ProtectedRoute allow={["admin"]}>
                <Configuracoes />
              </ProtectedRoute>
            }
          />
          <Route
            path="simulacao"
            element={
              <ProtectedRoute allow={["usuario", "admin"]}>
                <Simulacao />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
