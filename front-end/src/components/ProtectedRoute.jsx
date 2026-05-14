import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allow }) {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  if (!auth) {
    return <Navigate to="/acesso" replace />;
  }

  if (allow && !allow.includes(auth.tipo)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
