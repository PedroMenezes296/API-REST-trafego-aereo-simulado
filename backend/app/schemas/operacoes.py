from datetime import date
from pydantic import BaseModel


class ResumoOperacionalResponse(BaseModel):
    data: date
    total_chegadas: int
    total_saidas: int
    total_operacoes: int