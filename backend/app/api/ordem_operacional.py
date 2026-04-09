from datetime import date

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, aliased

from app.database.connection import get_db
from app.models.aeroporto import Aeroporto
from app.models.voo import Voo
from app.schemas.ordem_operacional import VooOrdemResponse
from app.services.operacao_service import recalcular_ordem_operacional

router = APIRouter(prefix="/ordem-operacional", tags=["Ordem Operacional"])


@router.get("/", response_model=list[VooOrdemResponse])
def listar_ordem_operacional(
    data: date = Query(..., description="Data da operação no formato YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    Origem = aliased(Aeroporto)
    Destino = aliased(Aeroporto)

    resultados = (
        db.query(
            Voo,
            Origem.nome.label("origem_nome"),
            Destino.nome.label("destino_nome"),
        )
        .join(Origem, Voo.origem_id == Origem.id)
        .join(Destino, Voo.destino_id == Destino.id)
        .filter(Voo.data_operacao == data)
        .order_by(Voo.prioridade.desc(), Voo.horario_previsto.asc())
        .all()
    )

    resposta = []

    for voo, origem_nome, destino_nome in resultados:
        resposta.append({
            "id": voo.id,
            "codigo_voo": voo.codigo_voo,
            "tipo_operacao": voo.tipo_operacao,
            "status": voo.status,
            "data_operacao": voo.data_operacao,
            "horario_previsto": voo.horario_previsto,
            "horario_ajustado": voo.horario_ajustado,
            "prioridade": voo.prioridade,
            "emergencia": voo.emergencia,
            "origem_nome": origem_nome,
            "destino_nome": destino_nome,
            "distancia_km": voo.distancia_km,
            "tempo_estimado_min": voo.tempo_estimado_min,
        })

    return resposta