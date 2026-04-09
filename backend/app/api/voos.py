from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.voo import Voo
from app.models.aeroporto import Aeroporto
from app.schemas.voo import VooCreate, VooResponse

router = APIRouter(prefix="/voos", tags=["Voos"])


@router.post("/", response_model=VooResponse)
def criar_voo(voo_data: VooCreate, db: Session = Depends(get_db)):
    aeroporto = db.query(Aeroporto).filter(Aeroporto.id == voo_data.aeroporto_id).first()
    origem = db.query(Aeroporto).filter(Aeroporto.id == voo_data.origem_id).first()
    destino = db.query(Aeroporto).filter(Aeroporto.id == voo_data.destino_id).first()


    if not aeroporto:
        raise HTTPException(status_code=404, detail="Aeroporto não encontrado")

    if not origem:
        raise HTTPException(status_code=404, detail="Origem não encontrada")

    if not destino:
        raise HTTPException(status_code=404, detail="Destino não encontrado")

    novo_voo = Voo(
        codigo_voo=voo_data.codigo_voo,
        tipo_operacao=voo_data.tipo_operacao,
        status=voo_data.status,
        data_operacao=voo_data.data_operacao,
        horario_previsto=voo_data.horario_previsto,
        horario_real=voo_data.horario_real,
        prioridade=voo_data.prioridade,
        emergencia=voo_data.emergencia,
        aeroporto_id=voo_data.aeroporto_id,
        origem_id=voo_data.origem_id,
        destino_id=voo_data.destino_id,
        distancia_km=voo_data.distancia_km,
        tempo_estimado_min=voo_data.tempo_estimado_min,
    )

    db.add(novo_voo)
    db.commit()
    db.refresh(novo_voo)

    return novo_voo


@router.get("/", response_model=list[VooResponse])
def listar_voos(db: Session = Depends(get_db)):
    return db.query(Voo).all()


@router.get("/{voo_id}", response_model=VooResponse)
def buscar_voo(voo_id: int, db: Session = Depends(get_db)):
    voo = db.query(Voo).filter(Voo.id == voo_id).first()

    if not voo:
        raise HTTPException(status_code=404, detail="Voo não encontrado")

    return voo