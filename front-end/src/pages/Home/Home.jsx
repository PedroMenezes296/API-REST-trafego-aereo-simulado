import "./Home.css";

function Home() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  return (
    <section className="home-modern-v2">
      <div className="home-hero-v2">
        <div className="home-hero-left">
          <span className="home-tag">Painel Principal</span>

          <h1>Sistema de Gerenciamento de Tráfego Aéreo Simulado</h1>

          <p>
            Monitoramento, controle operacional e simulação visual de voos em
            ambiente aeroportuário.
          </p>

          {auth && (
            <div className="home-user-box">
              <span>Perfil conectado</span>
              <strong>
                {auth.tipo === "admin" ? "Administrador" : "Usuário"} —{" "}
                {auth.nome}
              </strong>
            </div>
          )}

          <div className="home-stats">
            <div className="home-stat-card">
              <strong>Operações</strong>
              <span>Gestão e acompanhamento dos voos cadastrados.</span>
            </div>

            <div className="home-stat-card">
              <strong>Simulação</strong>
              <span>Visualização dinâmica do fluxo operacional em pista.</span>
            </div>

            <div className="home-stat-card">
              <strong>Monitoramento</strong>
              <span>Consulta estruturada de dados e ordem operacional.</span>
            </div>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="radar-card">
            <div className="radar-circle radar-circle-1"></div>
            <div className="radar-circle radar-circle-2"></div>
            <div className="radar-circle radar-circle-3"></div>
            <div className="radar-line"></div>

            <div className="plane plane-1">✈</div>
            <div className="plane plane-2">✈</div>
            <div className="plane plane-3">✈</div>

            <div className="radar-label radar-label-1">
              Voo em monitoramento
            </div>
            <div className="radar-label radar-label-2">Controle ativo</div>
          </div>

          <div className="runway-card">
            <div className="runway">
              <div className="runway-line"></div>
              <div className="runway-plane">✈</div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-bottom-grid">
        <div className="home-info-card">
          <h3>Visão Operacional</h3>
          <p>
            Acompanhe operações aéreas simuladas com foco em organização,
            análise e apoio à tomada de decisão em contexto acadêmico.
          </p>
        </div>

        <div className="home-info-card">
          <h3>Módulos do Sistema</h3>
          <ul>
            <li>Dashboard operacional</li>
            <li>Cadastro de voos</li>
            <li>Simulação em tempo real</li>
            <li>Consulta e monitoramento</li>
          </ul>
        </div>

        <div className="home-info-card destaque">
          <h3>Ambiente Integrado</h3>
          <p>
            Interface conectada à API backend, com dados reais de aeroportos e
            operações simuladas em evolução contínua.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
