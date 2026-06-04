import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "72px", margin: "0 0 8px", color: "#0f172a" }}>404</h1>
      <p style={{ fontSize: "18px", color: "#64748b", marginBottom: "28px" }}>
        Página não encontrada.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "#1d4ed8",
          color: "white",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Voltar ao início
      </Link>
    </div>
  );
}

export default NotFound;
