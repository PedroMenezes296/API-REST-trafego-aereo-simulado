from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.voo import Voo
from app.schemas.emergencia import EmergenciaResponse

router = APIRouter(prefix="/emergencias", tags=["Emergências"])


@router.patch("/{voo_id}", response_model=EmergenciaResponse)
def marcar_voo_emergencia(voo_id: int, db: Session = Depends(get_db)):
    voo = db.query(Voo).filter(Voo.id == voo_id).first()

    if not voo:
        raise HTTPException(status_code=404, detail="Voo não encontrado")

    voo.emergencia = True
    voo.prioridade = 100
    voo.status = "emergencia"

    db.commit()
    db.refresh(voo)

    return voo