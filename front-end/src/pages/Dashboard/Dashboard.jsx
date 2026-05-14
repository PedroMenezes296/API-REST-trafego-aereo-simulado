import { useEffect, useState } from "react";
import "./Dashboard.css";
import { listarOrdemOperacional, resumoOperacional } from "../../services/api";

function Dashboard() {
  const hoje = new Date().toISOString().split("T")[0];

  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [resumo, setResumo] = useState(null);
  const [ordem, setOrdem] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        setErro("");
        const resumoData = await resumoOperacional(dataSelecionada);
        const ordemData = await listarOrdemOperacional(dataSelecionada);

        setResumo(resumoData);
        setOrdem(ordemData);
      } catch (err) {
        setErro("Erro ao carregar dados do dashboard.");
      }
    }

    carregarDados();
  }, [dataSelecionada]);

  return (
    <section className="dashboard-modern">
      <div className="dashboard-top">
        <div className="dashboard-top-left">
          <span className="dashboard-badge">Painel Operacional</span>
          <h1>Dashboard</h1>
          <p>
            Acompanhe em tempo real os indicadores operacionais e a ordem de
            execução dos voos simulados.
          </p>
        </div>

        <div className="dashboard-top-right">
          <label>Data de referência</label>
          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </div>
      </div>

      {erro && <div className="dashboard-erro">{erro}</div>}

      <div className="dashboard-cards-modern">
        <div className="dashboard-card-modern destaque">
          <span>Total de Operações</span>
          <strong>{resumo ? resumo.total_operacoes : "..."}</strong>
          <p>Total consolidado de movimentações registradas para a data.</p>
        </div>

        <div className="dashboard-card-modern">
          <span>Chegadas</span>
          <strong>{resumo ? resumo.total_chegadas : "..."}</strong>
          <p>Voos previstos ou registrados com operação de chegada.</p>
        </div>

        <div className="dashboard-card-modern">
          <span>Saídas</span>
          <strong>{resumo ? resumo.total_saidas : "..."}</strong>
          <p>Voos previstos ou registrados com operação de saída.</p>
        </div>

        <div className="dashboard-card-modern">
          <span>Voos em Ordem</span>
          <strong>{ordem ? ordem.length : "..."}</strong>
          <p>Quantidade de voos atualmente listados na ordem operacional.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <h3>Resumo Executivo</h3>
            <span>{dataSelecionada}</span>
          </div>

          <div className="dashboard-summary-list">
            <div className="dashboard-summary-item">
              <span>Operações do dia</span>
              <strong>{resumo ? resumo.total_operacoes : "..."}</strong>
            </div>

            <div className="dashboard-summary-item">
              <span>Chegadas registradas</span>
              <strong>{resumo ? resumo.total_chegadas : "..."}</strong>
            </div>

            <div className="dashboard-summary-item">
              <span>Saídas registradas</span>
              <strong>{resumo ? resumo.total_saidas : "..."}</strong>
            </div>

            <div className="dashboard-summary-item">
              <span>Itens na ordem operacional</span>
              <strong>{ordem ? ordem.length : "..."}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="dashboard-panel-header">
            <h3>Status do Painel</h3>
            <span>Online</span>
          </div>

          <div className="dashboard-status-box">
            <div className="status-row">
              <span>Integração API</span>
              <strong>Ativa</strong>
            </div>
            <div className="status-row">
              <span>Consulta operacional</span>
              <strong>Disponível</strong>
            </div>
            <div className="status-row">
              <span>Base aeroportuária</span>
              <strong>Carregada</strong>
            </div>
            <div className="status-row">
              <span>Monitoramento do dia</span>
              <strong>{dataSelecionada}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-table-panel">
        <div className="dashboard-panel-header">
          <h3>Ordem Operacional</h3>
          <span>{ordem.length} registro(s)</span>
        </div>

        {ordem.length === 0 ? (
          <div className="dashboard-empty">
            Nenhum voo encontrado para a data selecionada.
          </div>
        ) : (
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Operação</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Prioridade</th>
                  <th>Status</th>
                  <th>Emergência</th>
                </tr>
              </thead>
              <tbody>
                {ordem.map((voo) => (
                  <tr key={voo.id}>
                    <td>{voo.codigo_voo}</td>
                    <td>
                      <span
                        className={`tipo-badge ${
                          voo.tipo_operacao === "chegada" ? "chegada" : "saida"
                        }`}
                      >
                        {voo.tipo_operacao}
                      </span>
                    </td>
                    <td>{voo.origem_nome}</td>
                    <td>{voo.destino_nome}</td>
                    <td>{voo.prioridade}</td>
                    <td>{voo.status}</td>
                    <td>
                      {voo.emergencia ? (
                        <span className="emergencia-badge">Sim</span>
                      ) : (
                        <span className="normal-badge">Não</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
