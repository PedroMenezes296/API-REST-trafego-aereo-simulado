import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app as fastapi_app
from app.database.base import Base
from app.database.connection import get_db
from app.models.aeroporto import Aeroporto
from app.models import voo as _voo_model  # registra Voo no metadata

SQLALCHEMY_TEST_URL = "sqlite:///:memory:"


@pytest.fixture(scope="function")
def engine():
    # StaticPool mantém uma única conexão compartilhada para o banco in-memory
    _engine = create_engine(
        SQLALCHEMY_TEST_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=_engine)
    yield _engine
    Base.metadata.drop_all(bind=_engine)


@pytest.fixture
def db(engine):
    TestSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = TestSession()
    yield session
    session.close()


@pytest.fixture
def client(engine):
    TestSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    def override_get_db():
        session = TestSession()
        try:
            yield session
        finally:
            session.close()

    fastapi_app.dependency_overrides[get_db] = override_get_db
    with TestClient(fastapi_app) as c:
        yield c
    fastapi_app.dependency_overrides.clear()


@pytest.fixture
def dois_aeroportos(db):
    gru = Aeroporto(
        external_id=1, identificador="SBGR", tipo="large_airport",
        nome="Guarulhos", latitude=-23.435, longitude=-46.473,
        codigo_iata="GRU",
    )
    gig = Aeroporto(
        external_id=2, identificador="SBGL", tipo="large_airport",
        nome="Galeão", latitude=-22.809, longitude=-43.243,
        codigo_iata="GIG",
    )
    db.add_all([gru, gig])
    db.commit()
    db.refresh(gru)
    db.refresh(gig)
    return gru, gig
