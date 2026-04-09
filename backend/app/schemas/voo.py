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

    class Config:
        from_attributes = True