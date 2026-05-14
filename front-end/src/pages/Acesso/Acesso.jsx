import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Acesso.css";

function Acesso() {
  const [modo, setModo] = useState("usuario");
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  function entrarComoUsuario(e) {
    e.preventDefault();
    setErro("");

    if (!nome.trim()) {
      setErro("Informe o nome do usuário para continuar.");
      return;
    }

    localStorage.setItem(
      "auth",
      JSON.stringify({
        tipo: "usuario",
        nome,
      }),
    );

    navigate("/dashboard");
  }

  function entrarComoAdmin(e) {
    e.preventDefault();
    setErro("");

    if (!login.trim() || !senha.trim()) {
      setErro("Informe login e senha.");
      return;
    }

    if (login !== "admin" || senha !== "1234") {
      setErro("Credenciais administrativas inválidas.");
      return;
    }

    localStorage.setItem(
      "auth",
      JSON.stringify({
        tipo: "admin",
        nome: "Administrador",
      }),
    );

    navigate("/dashboard");
  }

  return (
    <div className="acesso-wrapper">
      <div className="acesso-bg-shape acesso-bg-1"></div>
      <div className="acesso-bg-shape acesso-bg-2"></div>

      <section className="acesso-container">
        <div className="acesso-brand">
          <span className="acesso-badge">Controle Operacional</span>
          <h1>Sistema de Gerenciamento de Tráfego Aéreo</h1>
          <p>
            Plataforma de apoio ao monitoramento, organização operacional e
            simulação de voos em ambiente aeroportuário.
          </p>

          <div className="acesso-brand-cards">
            <div className="brand-card">
              <strong>Visualização</strong>
              <span>Painéis operacionais e acompanhamento em tempo real.</span>
            </div>

            <div className="brand-card">
              <strong>Controle</strong>
              <span>Gestão de operações, voos e prioridades críticas.</span>
            </div>

            <div className="brand-card">
              <strong>Simulação</strong>
              <span>Cenários dinâmicos para apoio acadêmico e analítico.</span>
            </div>
          </div>
        </div>

        <div className="acesso-card">
          <div className="acesso-card-header">
            <h2>Acesso ao Sistema</h2>
            <p>Selecione o perfil apropriado para entrar na plataforma.</p>
          </div>

          <div className="acesso-toggle">
            <button
              type="button"
              className={modo === "usuario" ? "ativo" : ""}
              onClick={() => setModo("usuario")}
            >
              Usuário
            </button>

            <button
              type="button"
              className={modo === "admin" ? "ativo" : ""}
              onClick={() => setModo("admin")}
            >
              Administrador
            </button>
          </div>

          {erro && <div className="acesso-erro">{erro}</div>}

          {modo === "usuario" ? (
            <form className="acesso-form" onSubmit={entrarComoUsuario}>
              <label>Nome do usuário</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <button type="submit">Entrar como usuário</button>
            </form>
          ) : (
            <form className="acesso-form" onSubmit={entrarComoAdmin}>
              <label>Login administrativo</label>
              <input
                type="text"
                placeholder="Digite o login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite a senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <button type="submit">Entrar como administrador</button>
            </form>
          )}

          <div className="acesso-footer">
            <span>
              Perfil{" "}
              <strong>
                {modo === "usuario" ? "Usuário" : "Administrador"}
              </strong>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Acesso;
