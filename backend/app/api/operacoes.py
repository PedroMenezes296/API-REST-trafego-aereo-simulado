from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.voo import Voo
from app.schemas.operacoes import ResumoOperacionalResponse
from app.simulator.motor import detectar_conflitos

router = APIRouter(prefix="/operacoes", tags=["Operações"])


@router.get("/resumo", response_model=ResumoOperacionalResponse)
def resumo_operacional_por_dia(
    data: date = Query(..., description="Data da operação no formato YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    total_chegadas = db.query(Voo).filter(
        Voo.data_operacao == data,
        Voo.tipo_operacao == "chegada"
    ).count()

    total_saidas = db.query(Voo).filter(
        Voo.data_operacao == data,
        Voo.tipo_operacao == "saida"
    ).count()

    total_operacoes = total_chegadas + total_saidas

    return ResumoOperacionalResponse(
        data=data,
        total_chegadas=total_chegadas,
        total_saidas=total_saidas,
        total_operacoes=total_operacoes
    )


@router.get("/conflitos")
def listar_conflitos(
    data: date = Query(..., description="Data da operação no formato YYYY-MM-DD"),
    db: Session = Depends(get_db),
):
    voos = (
        db.query(Voo)
        .filter(Voo.data_operacao == data)
        .order_by(Voo.horario_previsto.asc())
        .all()
    )
    return detectar_conflitos(voos)