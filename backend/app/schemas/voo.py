from datetime import date, datetime
from pydantic import BaseModel


class VooCreate(BaseModel):
    codigo_voo: str
    tipo_operacao: str
    status: str = "programado"
    data_operacao: date
    horario_previsto: datetime
    horario_real: datetime | None = None
    prioridade: int = 0
    emergencia: bool = False
    aeroporto_id: int
    origem_id: int 
    destino_id: int
    distancia_km: float | None = None
    tempo_estimado_min: float | None = None


class VooResponse(BaseModel):
    id: int
    codigo_voo: str
    tipo_operacao: str
    status: str
    data_operacao: date
    horario_previsto: datetime
    horario_ajustado: datetime | None = None
    horario_real: datetime | None = None
    prioridade: int
    emergencia: bool
    aeroporto_id: int
    origem_id: int 
    destino_id: int
    distancia_km: float | None = None
    tempo_estimado_min: float | None = None

    class Config:
        from_attributes = True