import "./Configuracoes.css";
import { useState } from "react";

const CHAVE_AUTO = "config_atualizacao_auto";
const CHAVE_INTERVALO = "config_intervalo";

function Configuracoes() {
  const [autoUpdate, setAutoUpdate] = useState(
    () => localStorage.getItem(CHAVE_AUTO) !== "false",
  );
  const [intervalo, setIntervalo] = useState(
    () => localStorage.getItem(CHAVE_INTERVALO) || "5",
  );

  function handleAutoUpdate(e) {
    const valor = e.target.checked;
    setAutoUpdate(valor);
    localStorage.setItem(CHAVE_AUTO, String(valor));
  }

  function handleIntervalo(e) {
    const valor = e.target.value;
    setIntervalo(valor);
    localStorage.setItem(CHAVE_INTERVALO, valor);
  }

  return (
    <section>
      <h2>Configurações</h2>
      <div className="config-box">
        <label>
          <span>Atualização automática</span>
          <input type="checkbox" checked={autoUpdate} onChange={handleAutoUpdate} />
        </label>

        <label>
          <span>Tempo entre atualizações</span>
          <select value={intervalo} onChange={handleIntervalo} disabled={!autoUpdate}>
            <option value="1">1 segundo</option>
            <option value="2">2 segundos</option>
            <option value="5">5 segundos</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default Configuracoes;
