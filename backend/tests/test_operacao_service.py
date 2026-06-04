from datetime import datetime, timedelta
from types import SimpleNamespace

from app.services.operacao_service import recalcular_ordem_operacional


def voo_mock(id, horario_str, prioridade=0):
    return SimpleNamespace(
        id=id,
        horario_previsto=datetime.fromisoformat(horario_str),
        horario_ajustado=None,
        prioridade=prioridade,
    )


def test_sem_conflitos_horarios_ok():
    voos = [
        voo_mock(1, "2026-04-10T10:00:00"),
        voo_mock(2, "2026-04-10T10:10:00"),
    ]
    resultado = recalcular_ordem_operacional(voos)
    # Sem conflito: horario_ajustado == horario_previsto
    assert resultado[0].horario_ajustado == resultado[0].horario_previsto
    assert resultado[1].horario_ajustado == resultado[1].horario_previsto


def test_conflito_ajusta_segundo_voo():
    voos = [
        voo_mock(1, "2026-04-10T10:00:00"),
        voo_mock(2, "2026-04-10T10:02:00"),  # apenas 2 min de diferença
    ]
    resultado = recalcular_ordem_operacional(voos)
    esperado = datetime.fromisoformat("2026-04-10T10:00:00") + timedelta(minutes=5)
    assert resultado[1].horario_ajustado == esperado


def test_prioridade_alta_vai_primeiro():
    voos = [
        voo_mock(1, "2026-04-10T10:00:00", prioridade=0),
        voo_mock(2, "2026-04-10T09:55:00", prioridade=100),
    ]
    resultado = recalcular_ordem_operacional(voos)
    assert resultado[0].id == 2


def test_multiplos_conflitos_em_cascata():
    voos = [
        voo_mock(1, "2026-04-10T10:00:00"),
        voo_mock(2, "2026-04-10T10:01:00"),
        voo_mock(3, "2026-04-10T10:02:00"),
    ]
    resultado = recalcular_ordem_operacional(voos)
    # Voo 2 ajustado para 10:05, voo 3 ajustado para 10:10
    assert resultado[1].horario_ajustado == datetime.fromisoformat("2026-04-10T10:05:00")
    assert resultado[2].horario_ajustado == datetime.fromisoformat("2026-04-10T10:10:00")
