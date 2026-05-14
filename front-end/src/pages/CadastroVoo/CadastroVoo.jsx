import { useEffect, useState } from "react";
import "./CadastroVoo.css";
import { criarVoo, listarAeroportos } from "../../services/api.js";

function CadastroVoo() {
  const [aeroportos, setAeroportos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    codigo_voo: "",
    tipo_operacao: "chegada",
    status: "programado",
    data_operacao: "",
    horario_previsto: "",
    horario_real: null,
    prioridade: 0,
    emergencia: false,
    aeroporto_id: "",
    origem_id: "",
    destino_id: "",
  });

  useEffect(() => {
    async function carregarAeroportos() {
      try {
        const dados = await listarAeroportos();
        const ordenados = [...dados].sort((a, b) =>
          a.nome.localeCompare(b.nome),
        );
        setAeroportos(ordenados);
      } catch (err) {
        setErro("Erro ao carregar aeroportos.");
      }
    }

    carregarAeroportos();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    if (form.origem_id === form.destino_id) {
      setErro("Origem e destino não podem ser iguais.");
      return;
    }

    try {
      const payload = {
        ...form,
        aeroporto_id: Number(form.aeroporto_id),
        origem_id: Number(form.origem_id),
        destino_id: Number(form.destino_id),
        prioridade: Number(form.prioridade),
        horario_previsto: new Date(form.horario_previsto).toISOString(),
        distancia_km: null,
        tempo_estimado_min: null,
      };

      await criarVoo(payload);

      setMensagem("Voo cadastrado com sucesso.");
      setForm({
        codigo_voo: "",
        tipo_operacao: "chegada",
        status: "programado",
        data_operacao: "",
        horario_previsto: "",
        horario_real: null,
        prioridade: 0,
        emergencia: false,
        aeroporto_id: "",
        origem_id: "",
        destino_id: "",
      });
    } catch (err) {
      setErro(err.message || "Erro ao cadastrar voo.");
    }
  }

  return (
    <section className="cadastro-modern">
      <div className="cadastro-top">
        <div className="cadastro-top-left">
          <span className="cadastro-badge">Módulo Operacional</span>
          <h1>Cadastro de Voo</h1>
          <p>
            Registre novos voos simulados para composição da ordem operacional,
            monitoramento e visualização em tempo real.
          </p>
        </div>
      </div>

      {mensagem && <div className="cadastro-alert sucesso">{mensagem}</div>}
      {erro && <div className="cadastro-alert erro">{erro}</div>}

      <form className="cadastro-card" onSubmit={handleSubmit}>
        <div className="cadastro-section">
          <h3>Informações Básicas</h3>

          <div className="cadastro-grid">
            <div className="campo">
              <label>Código do voo</label>
              <input
                type="text"
                name="codigo_voo"
                placeholder="Ex.: VM-SA-0001"
                value={form.codigo_voo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label>Tipo de operação</label>
              <select
                name="tipo_operacao"
                value={form.tipo_operacao}
                onChange={handleChange}
              >
                <option value="chegada">Chegada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <div className="campo">
              <label>Status</label>
              <input
                type="text"
                name="status"
                placeholder="programado"
                value={form.status}
                onChange={handleChange}
              />
            </div>

            <div className="campo">
              <label>Prioridade</label>
              <input
                type="number"
                name="prioridade"
                placeholder="0"
                value={form.prioridade}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="cadastro-section">
          <h3>Planejamento Operacional</h3>

          <div className="cadastro-grid">
            <div className="campo">
              <label>Data da operação</label>
              <input
                type="date"
                name="data_operacao"
                value={form.data_operacao}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo">
              <label>Horário previsto</label>
              <input
                type="datetime-local"
                name="horario_previsto"
                value={form.horario_previsto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="campo campo-checkbox">
              <label>Classificação operacional</label>
              <label className="checkbox-inline">
                <input
                  type="checkbox"
                  name="emergencia"
                  checked={form.emergencia}
                  onChange={handleChange}
                />
                Marcar como emergência
              </label>
            </div>
          </div>
        </div>

        <div className="cadastro-section">
          <h3>Rota e Controle</h3>

          <div className="cadastro-grid">
            <div className="campo">
              <label>Aeroporto controlado</label>
              <select
                name="aeroporto_id"
                value={form.aeroporto_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o aeroporto controlado</option>
                {aeroportos.map((aeroporto) => (
                  <option key={aeroporto.id} value={aeroporto.id}>
                    {aeroporto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label>Origem</label>
              <select
                name="origem_id"
                value={form.origem_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione a origem</option>
                {aeroportos.map((aeroporto) => (
                  <option key={aeroporto.id} value={aeroporto.id}>
                    {aeroporto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label>Destino</label>
              <select
                name="destino_id"
                value={form.destino_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o destino</option>
                {aeroportos.map((aeroporto) => (
                  <option key={aeroporto.id} value={aeroporto.id}>
                    {aeroporto.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="cadastro-actions">
          <button type="submit">Cadastrar voo</button>
        </div>
      </form>
    </section>
  );
}

export default CadastroVoo;
