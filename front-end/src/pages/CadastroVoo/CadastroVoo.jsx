import { useState } from "react";
import "./CadastroVoo.css";

function CadastroVoo() {
  const [form, setForm] = useState({
    codigo_voo: "",
    tipo_operacao: "chegada",
    status: "programado",
    data_operacao: "",
    horario_previsto: "",
    aeroporto_id: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dados do voo:", form);
  }

  return (
    <section>
      <h2>Cadastro de Voo</h2>

      <form className="form-voo" onSubmit={handleSubmit}>
        <input
          type="text"
          name="codigo_voo"
          placeholder="Código do voo"
          value={form.codigo_voo}
          onChange={handleChange}
        />

        <select
          name="tipo_operacao"
          value={form.tipo_operacao}
          onChange={handleChange}
        >
          <option value="chegada">Chegada</option>
          <option value="saida">Saída</option>
        </select>

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
        />

        <input
          type="date"
          name="data_operacao"
          value={form.data_operacao}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="horario_previsto"
          value={form.horario_previsto}
          onChange={handleChange}
        />

        <input
          type="number"
          name="aeroporto_id"
          placeholder="ID do aeroporto"
          value={form.aeroporto_id}
          onChange={handleChange}
        />

        <button type="submit">Cadastrar voo</button>
      </form>
    </section>
  );
}

export default CadastroVoo;
