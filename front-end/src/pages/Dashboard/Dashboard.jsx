import "./Dashboard.css";
import CardResumo from "../../components/CardResumo";

function Dashboard() {
  return (
    <section>
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <CardResumo titulo="Voos Ativos" valor="12" />
        <CardResumo titulo="Pousos Hoje" valor="8" />
        <CardResumo titulo="Saídas Hoje" valor="6" />
        <CardResumo titulo="Alertas" valor="2" />
      </div>
    </section>
  );
}

export default Dashboard;
