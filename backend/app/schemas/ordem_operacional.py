from datetime import date, datetime
from pydantic import BaseModel


class VooOrdemResponse(BaseModel):
    id: int
    codigo_voo: str
    tipo_operacao: str
    status: str
    data_operacao: date
    horario_previsto: datetime
    prioridade: int
    emergencia: bool

    class Config:
        from_attributes = True