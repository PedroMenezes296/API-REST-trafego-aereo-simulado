from datetime import timedelta

from app.models.voo import Voo


INTERVALO_MINIMO_MINUTOS = 5


def recalcular_ordem_operacional(voos: list[Voo]) -> list[Voo]:
    """
    Reordena os voos por prioridade e horário previsto,
    e ajusta os horários para garantir intervalo mínimo entre operações.
    """
    voos_ordenados = sorted(
        voos,
        key=lambda voo: (-voo.prioridade, voo.horario_previsto)
    )

    ultimo_horario = None

    for voo in voos_ordenados:
        if ultimo_horario is None:
            voo.horario_ajustado = voo.horario_previsto
        else:
            horario_minimo = ultimo_horario + timedelta(minutes=INTERVALO_MINIMO_MINUTOS)

            if voo.horario_previsto < horario_minimo:
                voo.horario_ajustado = horario_minimo
            else:
                voo.horario_ajustado = voo.horario_previsto

        ultimo_horario = voo.horario_ajustado

    return voos_ordenados