from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.voo import Voo
from app.schemas.ordem_operacional import VooOrdemResponse

router = APIRouter(prefix="/ordem-operacional", tags=["Ordem Operacional"])


@router.get("/", response_model=list[VooOrdemResponse])
def listar_ordem_operacional(
    data: date = Query(..., description="Data da operação no formato YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    voos = (
        db.query(Voo)
        .filter(Voo.data_operacao == data)
        .order_by(Voo.prioridade.desc(), Voo.horario_previsto.asc())
        .all()
    )

    return voos