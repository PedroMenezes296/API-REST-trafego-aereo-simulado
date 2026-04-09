from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.voo import Voo
from app.schemas.ordem_operacional import VooOrdemResponse
from app.services.operacao_service import recalcular_ordem_operacional

router = APIRouter(prefix="/ordem-operacional", tags=["Ordem Operacional"])


@router.get("/", response_model=list[VooOrdemResponse])
def listar_ordem_operacional(
    data: date = Query(..., description="Data da operação no formato YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    voos = db.query(Voo).filter(Voo.data_operacao == data).all()

    voos_recalculados = recalcular_ordem_operacional(voos)

    for voo in voos_recalculados:
        db.add(voo)

    db.commit()

    return voos_recalculados  # já vem ordenado do service