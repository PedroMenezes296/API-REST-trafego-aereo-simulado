
from pydantic import BaseModel


class EmergenciaResponse(BaseModel):
    id: int
    codigo_voo: str
    emergencia: bool
    prioridade: int
    status: str

    class Config:
        from_attributes = True