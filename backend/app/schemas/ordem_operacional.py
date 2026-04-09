from datetime import date, datetime
from pydantic import BaseModel


class VooOrdemResponse(BaseModel):
    id: int
    codigo_voo: str
    tipo_operacao: str
    status: str
    data_operacao: date
    horario_previsto: datetime
    horario_ajustado: datetime | None = None
    prioridade: int
    emergencia: bool
    # campos para mostrar o meu aeroporto, origem e destino
    origem_nome: str | None = None  # ← adiciona
    destino_nome: str | None = None  # ← adiciona
    distancia_km: float | None = None  # ← adiciona se quiser mostrar
    tempo_estimado_min: float | None = None  # ← adiciona se quiser mostrar

    class Config:
        from_attributes = True