from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.connection import engine
from app.models import Aeroporto
from app.api.aeroportos import router as aeroportos_router
from app.api.voos import router as voos_router
from app.api.operacoes import router as operacoes_router
from app.api.emergencias import router as emergencias_router
from app.api.ordem_operacional import router as ordem_operacional_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Gerenciamento de Tráfego Aéreo Simulado",
    description="API inicial do projeto acadêmico de engenharia de software.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(aeroportos_router)
app.include_router(voos_router)
app.include_router(operacoes_router)
app.include_router(emergencias_router)
app.include_router(ordem_operacional_router)


@app.get("/")
def read_root():
    return {"message": "API do sistema de tráfego aéreo simulada online."}


@app.get("/health")
def health_check():
    return {"status": "ok"}
