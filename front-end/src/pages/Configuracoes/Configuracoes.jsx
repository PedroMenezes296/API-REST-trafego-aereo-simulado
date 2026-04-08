import "./Configuracoes.css";

function Configuracoes() {
  return (
    <section>
      <h2>Configurações</h2>
      <div className="config-box">
        <label>
          <span>Atualização automática</span>
          <input type="checkbox" defaultChecked />
        </label>

        <label>
          <span>Tempo entre atualizações</span>
          <select defaultValue="1">
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
