import { useEffect, useState } from "react";
import PlaneSprite from "../../components/PlaneSprite";
import "./Simulacao.css";

const posicoesIniciais = [
  { id: 1, top: 60, left: 40, label: "Voo A1" },
  { id: 2, top: 140, left: 120, label: "Voo B2" },
];

function Simulacao() {
  const [avioes, setAvioes] = useState(posicoesIniciais);

  useEffect(() => {
    const interval = setInterval(() => {
      setAvioes((prev) =>
        prev.map((aviao) => ({
          ...aviao,
          left: aviao.left + 30 > 700 ? 40 : aviao.left + 30,
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <h2>Simulação em Tempo Real</h2>

      <div className="simulacao-area">
        <div className="pista">
          {avioes.map((aviao) => (
            <PlaneSprite
              key={aviao.id}
              top={aviao.top}
              left={aviao.left}
              label={aviao.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Simulacao;
