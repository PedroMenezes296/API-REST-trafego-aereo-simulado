from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship

from app.database.base import Base


class Voo(Base):
    __tablename__ = "voos"

    id = Column(Integer, primary_key=True, index=True)
    codigo_voo = Column(String, nullable=False, index=True)
    tipo_operacao = Column(String, nullable=False)  # chegada ou saida
    status = Column(String, nullable=False, default="programado")
    data_operacao = Column(Date, nullable=False)
    horario_previsto = Column(DateTime, nullable=False)
    horario_ajustado = Column(DateTime, nullable=True)
    horario_real = Column(DateTime, nullable=True)
    prioridade = Column(Integer, nullable=False, default=0)
    emergencia = Column(Boolean, nullable=False, default=False)
    
    # aeroporto controlado pela torre
    aeroporto_id = Column(Integer, ForeignKey("aeroportos.id"), nullable=False)
    # origem e destino reais do voo
    origem_id = Column(Integer, ForeignKey("aeroportos.id"), nullable=True)
    destino_id = Column(Integer, ForeignKey("aeroportos.id"), nullable=True)

    distancia_km = Column(Float, nullable=True)
    tempo_estimado_min = Column(Float, nullable=True)


    aeroporto = relationship("Aeroporto", foreign_keys=[aeroporto_id])
    origem = relationship("Aeroporto", foreign_keys=[origem_id])
    destino = relationship("Aeroporto", foreign_keys=[destino_id])