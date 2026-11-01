import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Login } from "../pages/Login/Login.jsx";
import { Cadastro } from "../pages/Cadastro/Cadastro.jsx";
import { Privacidade } from "../pages/Privacidade/Privacidade.jsx";
import { Dashboard } from "../pages/Dashboard/Dashboard.jsx";
import { MainLayout } from "../layouts/Mainlayout.jsx";
import { ProtectedRoute } from "../components/ProtectedReact.jsx";
import { Vendas } from "../pages/Vendas/Vendas.jsx";
import { Estoque } from "../pages/Estoque/Estoque.jsx";
import { Pedidos } from "../pages/Pedidos/Pedidos.jsx";
import { NotFound } from "../pages/Notfound/Notfound.jsx";
import { Configuracoes } from "../pages/Configuracoes/Configuracoes.jsx";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/vendas" element={<Vendas />} />

            <Route path="/estoque" element={<Estoque />} />

            <Route path="/pedidos" element={<Pedidos />} />

            <Route path="/configuracoes" element={<Configuracoes />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
