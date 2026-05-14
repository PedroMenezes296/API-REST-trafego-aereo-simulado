import { useEffect, useMemo, useState } from "react";
import PlaneSprite from "../../components/PlaneSprite";
import "./Simulacao.css";
import { listarOrdemOperacional } from "../../services/api.js";

function Simulacao() {
  const dataPadrao = "2026-04-10";
  const DURACAO_OPERACAO_SEGUNDOS = 14;
  const INTERVALO_ANIMACAO_MS = 500;
  const PASSO_AVIAO_PX = 4;

  const [dataSelecionada, setDataSelecionada] = useState(dataPadrao);
  const [voosOriginais, setVoosOriginais] = useState([]);
  const [voos, setVoos] = useState([]);
  const [erro, setErro] = useState("");
  const [alerta, setAlerta] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [segundosDecorridos, setSegundosDecorridos] = useState(0);
  const [horaSimulada, setHoraSimulada] = useState(null);
  const [modoSimulacao, setModoSimulacao] = useState("operacao"); // operacao | espera

  const [aviaoAnimado, setAviaoAnimado] = useState(null);

  useEffect(() => {
    async function carregarVoos() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await listarOrdemOperacional(dataSelecionada);
        setVoosOriginais(dados);
        setVoos(dados);
        setIndiceAtual(0);
        setSegundosDecorridos(0);

        if (dados.length > 0) {
          setHoraSimulada(new Date(dados[0].horario_previsto));
          setModoSimulacao("operacao");
        } else {
          setHoraSimulada(null);
          setModoSimulacao("espera");
        }
      } catch (err) {
        console.error("Erro na simulação:", err);
        setErro("Erro ao carregar voos da simulação.");
      } finally {
        setCarregando(false);
      }
    }

    carregarVoos();
  }, [dataSelecionada]);

  const vooAtual = useMemo(() => {
    if (voos.length === 0) return null;
    if (indiceAtual >= voos.length) return null;
    return voos[indiceAtual];
  }, [voos, indiceAtual]);

  const proximoVoo = useMemo(() => {
    if (voos.length === 0) return null;
    if (indiceAtual + 1 >= voos.length) return null;
    return voos[indiceAtual + 1];
  }, [voos, indiceAtual]);

  const vooEmPista = useMemo(() => {
    return modoSimulacao === "operacao" ? vooAtual : null;
  }, [modoSimulacao, vooAtual]);

  const proximosVoos = useMemo(() => {
    if (voos.length === 0) return [];

    if (modoSimulacao === "operacao") {
      return voos.slice(indiceAtual, indiceAtual + 10);
    }

    return voos.slice(indiceAtual + 1, indiceAtual + 11);
  }, [voos, indiceAtual, modoSimulacao]);

  function obterNomeOperacao(voo) {
    if (!voo) return "-";
    return voo.tipo_operacao === "chegada" ? "Pouso" : "Decolagem";
  }

  function formatarHora(dataHora) {
    if (!dataHora) return "-";
    return new Date(dataHora).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatarDataHoraSimulada(data) {
    if (!data) return "-";
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  function calcularAvancoRelogio() {
    if (!horaSimulada) return 10000;

    if (modoSimulacao === "operacao") {
      return 10 * 1000;
    }

    if (!proximoVoo) {
      return 10 * 1000;
    }

    const atual = horaSimulada.getTime();
    const proximo = new Date(proximoVoo.horario_previsto).getTime();
    const diferencaMinutos = (proximo - atual) / 60000;

    if (diferencaMinutos > 20) return 5 * 60 * 1000;
    if (diferencaMinutos > 5) return 60 * 1000;
    return 10 * 1000;
  }

  useEffect(() => {
    if (!vooEmPista) {
      setAviaoAnimado(null);
      return;
    }

    setAviaoAnimado({
      id: vooEmPista.id,
      top: 165,
      left: vooEmPista.tipo_operacao === "chegada" ? 670 : 60,
      label: vooEmPista.codigo_voo,
      emergencia: vooEmPista.emergencia,
      tipo_operacao: vooEmPista.tipo_operacao,
    });
  }, [vooEmPista]);

  useEffect(() => {
    if (!vooEmPista) return;

    const interval = setInterval(() => {
      setAviaoAnimado((prev) => {
        if (!prev) return prev;

        if (prev.tipo_operacao === "chegada") {
          return {
            ...prev,
            left:
              prev.left - PASSO_AVIAO_PX < 60 ? 60 : prev.left - PASSO_AVIAO_PX,
          };
        }

        return {
          ...prev,
          left:
            prev.left + PASSO_AVIAO_PX > 670 ? 670 : prev.left + PASSO_AVIAO_PX,
        };
      });
    }, INTERVALO_ANIMACAO_MS);

    return () => clearInterval(interval);
  }, [vooEmPista]);

  useEffect(() => {
    if (!horaSimulada) return;

    const interval = setInterval(() => {
      setHoraSimulada((prev) => {
        if (!prev) return prev;

        const avanco = calcularAvancoRelogio();

        if (modoSimulacao === "espera" && proximoVoo) {
          const horarioProximo = new Date(
            proximoVoo.horario_previsto,
          ).getTime();
          const proximoMs = prev.getTime() + avanco;
          return new Date(Math.min(proximoMs, horarioProximo));
        }

        return new Date(prev.getTime() + avanco);
      });

      if (modoSimulacao === "operacao") {
        setSegundosDecorridos((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [horaSimulada, modoSimulacao, proximoVoo]);

  useEffect(() => {
    if (!vooEmPista) return;

    if (segundosDecorridos >= DURACAO_OPERACAO_SEGUNDOS) {
      setModoSimulacao("espera");
      setSegundosDecorridos(0);
      setAviaoAnimado(null);
    }
  }, [segundosDecorridos, vooEmPista]);

  useEffect(() => {
    if (modoSimulacao !== "espera") return;
    if (!proximoVoo || !horaSimulada) return;

    const horarioProximo = new Date(proximoVoo.horario_previsto).getTime();

    if (horaSimulada.getTime() >= horarioProximo) {
      setIndiceAtual((prev) => prev + 1);
      setModoSimulacao("operacao");
      setSegundosDecorridos(0);
    }
  }, [horaSimulada, modoSimulacao, proximoVoo]);

  function simularEmergencia() {
    if (voos.length === 0) return;

    const vooSelecionado = voos[voos.length - 1];

    const atualizados = voos.map((voo) =>
      voo.id === vooSelecionado.id
        ? {
            ...voo,
            emergencia: true,
            prioridade: 999,
            status: "emergencia",
          }
        : voo,
    );

    atualizados.sort((a, b) => {
      if (b.prioridade !== a.prioridade) {
        return b.prioridade - a.prioridade;
      }
      return new Date(a.horario_previsto) - new Date(b.horario_previsto);
    });

    setVoos(atualizados);
    setIndiceAtual(0);
    setSegundosDecorridos(0);

    if (atualizados.length > 0) {
      setHoraSimulada(new Date(atualizados[0].horario_previsto));
      setModoSimulacao("operacao");
    }

    setAlerta({
      tipo: "emergencia",
      mensagem: `Alerta operacional: voo ${vooSelecionado.codigo_voo} marcado como emergência.`,
    });

    setTimeout(() => {
      setAlerta(null);
    }, 5000);
  }

  function restaurarOrdem() {
    setVoos(voosOriginais);
    setIndiceAtual(0);
    setSegundosDecorridos(0);

    if (voosOriginais.length > 0) {
      setHoraSimulada(new Date(voosOriginais[0].horario_previsto));
      setModoSimulacao("operacao");
    } else {
      setHoraSimulada(null);
      setModoSimulacao("espera");
    }

    setAlerta({
      tipo: "info",
      mensagem: "Ordem operacional restaurada para o estado original.",
    });

    setTimeout(() => {
      setAlerta(null);
    }, 4000);
  }

  return (
    <section className="simulacao-modern">
      <div className="simulacao-top">
        <div className="simulacao-top-left">
          <span className="simulacao-badge">Simulação Operacional</span>
          <h1>Monitoramento em Tempo Real</h1>
          <p>
            Acompanhe o voo atualmente em operação na pista e a sequência dos
            próximos movimentos programados.
          </p>
        </div>

        <div className="simulacao-top-right">
          <label>Data de referência</label>
          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
          />
        </div>
      </div>

      {erro && <div className="simulacao-erro">{erro}</div>}

      {alerta && (
        <div className={`simulacao-alerta ${alerta.tipo}`}>
          {alerta.mensagem}
        </div>
      )}

      <div className="simulacao-acoes">
        <button className="btn-simular-emergencia" onClick={simularEmergencia}>
          Simular emergência
        </button>

        <button className="btn-restaurar-ordem" onClick={restaurarOrdem}>
          Restaurar ordem
        </button>
      </div>

      <div className="simulacao-layout">
        <div className="simulacao-pista-panel">
          <div className="panel-header">
            <h3>Pista de Simulação</h3>
            <span>
              {carregando
                ? "carregando..."
                : vooEmPista
                  ? "1 aeronave em destaque"
                  : "pista livre"}
            </span>
          </div>

          <div className="simulacao-area">
            <div className="pista-realista">
              <div className="ceu-faixa"></div>
              <div className="grama-faixa"></div>
              <div className="pista-central"></div>
              <div className="pista-marcas"></div>

              {vooEmPista && (
                <div className="operacao-badge-pista">
                  {obterNomeOperacao(vooEmPista)} em andamento
                </div>
              )}

              {aviaoAnimado && (
                <div
                  className={
                    aviaoAnimado.emergencia
                      ? "aviao-destaque emergencia"
                      : "aviao-destaque"
                  }
                >
                  <PlaneSprite
                    key={aviaoAnimado.id}
                    top={aviaoAnimado.top}
                    left={aviaoAnimado.left}
                    label={aviaoAnimado.label}
                  />
                </div>
              )}

              <div className="torre-controle">
                <div className="torre-topo"></div>
                <div className="torre-base"></div>
              </div>
            </div>
          </div>

          <div className="simulacao-legenda">
            <div className="legenda-item">
              <span className="legenda-dot azul"></span>
              <span>Voo atual em destaque na pista</span>
            </div>
            <div className="legenda-item">
              <span className="legenda-dot vermelho"></span>
              <span>Emergência operacional</span>
            </div>
          </div>

          <div className="simulacao-relogio">
            <span>Horário da simulação</span>
            <strong>{formatarDataHoraSimulada(horaSimulada)}</strong>
          </div>

          {vooAtual && (
            <div className="voo-atual-panel">
              <div className="voo-atual-header">
                <h4>Voo em acompanhamento</h4>
                <span
                  className={
                    vooAtual.emergencia ? "tag-emergencia" : "tag-normal"
                  }
                >
                  {vooAtual.emergencia ? "Emergência" : "Operação normal"}
                </span>
              </div>

              <div className="voo-atual-grid">
                <div className="voo-info-card">
                  <span>Código</span>
                  <strong>{vooAtual.codigo_voo}</strong>
                </div>

                <div className="voo-info-card">
                  <span>Operação atual</span>
                  <strong>{obterNomeOperacao(vooAtual)}</strong>
                </div>

                <div className="voo-info-card">
                  <span>Origem</span>
                  <strong>{vooAtual.origem_nome}</strong>
                </div>

                <div className="voo-info-card">
                  <span>Destino</span>
                  <strong>{vooAtual.destino_nome}</strong>
                </div>

                <div className="voo-info-card">
                  <span>Horário previsto</span>
                  <strong>{formatarHora(vooAtual.horario_previsto)}</strong>
                </div>

                <div className="voo-info-card">
                  <span>Horário ajustado</span>
                  <strong>
                    {vooAtual.horario_ajustado
                      ? formatarHora(vooAtual.horario_ajustado)
                      : "-"}
                  </strong>
                </div>

                <div className="voo-info-card">
                  <span>Status</span>
                  <strong>{vooAtual.status}</strong>
                </div>

                <div className="voo-info-card">
                  <span>Prioridade interna</span>
                  <strong>{vooAtual.prioridade}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="simulacao-tabela-panel">
          <div className="panel-header">
            <h3>Próximos 10 Voos</h3>
            <span>{proximosVoos.length} registro(s)</span>
          </div>

          {proximosVoos.length === 0 ? (
            <div className="simulacao-empty">
              Nenhum voo disponível para a data selecionada.
            </div>
          ) : (
            <div className="simulacao-table-wrapper">
              <table className="simulacao-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Operação</th>
                    <th>Origem</th>
                    <th>Destino</th>
                    <th>Horário</th>
                    <th>Status</th>
                    <th>Emergência</th>
                  </tr>
                </thead>
                <tbody>
                  {proximosVoos.map((voo) => (
                    <tr
                      key={voo.id}
                      className={voo.emergencia ? "linha-emergencia" : ""}
                    >
                      <td>{voo.codigo_voo}</td>
                      <td>
                        <span
                          className={`tipo-badge ${
                            voo.tipo_operacao === "chegada"
                              ? "chegada"
                              : "saida"
                          }`}
                        >
                          {obterNomeOperacao(voo)}
                        </span>
                      </td>
                      <td>{voo.origem_nome}</td>
                      <td>{voo.destino_nome}</td>
                      <td>
                        {formatarHora(
                          voo.horario_ajustado || voo.horario_previsto,
                        )}
                      </td>
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
      </div>
    </section>
  );
}

export default Simulacao;
