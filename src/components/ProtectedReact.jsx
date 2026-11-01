import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const usuario = localStorage.getItem("usuario");

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
