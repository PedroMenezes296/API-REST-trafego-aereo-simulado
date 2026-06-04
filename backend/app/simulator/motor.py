import simpy

DURACAO_OPERACAO_MIN = 5  # separação mínima entre operações (minutos)


def detectar_conflitos(voos: list) -> list[dict]:
    """
    Usa simulação de eventos discretos (SimPy) para detectar conflitos de horário
    na fila de operações. A pista é modelada como recurso de capacidade 1.
    Voos agendados com menos de 5 minutos de intervalo competem pelo recurso e
    o segundo fica em espera, caracterizando um conflito.
    """
    if not voos:
        return []

    voos_sorted = sorted(voos, key=lambda v: v.horario_previsto)
    ref_time = voos_sorted[0].horario_previsto

    env = simpy.Environment()
    pista = simpy.Resource(env, capacity=1)
    conflitos: list[dict] = []

    def processo_voo(voo):
        sim_time = (voo.horario_previsto - ref_time).total_seconds() / 60
        yield env.timeout(sim_time)

        tempo_chegada_fila = env.now
        with pista.request() as req:
            yield req

            atraso = round(env.now - tempo_chegada_fila, 1)
            if atraso > 0:
                conflitos.append({
                    "voo_id": voo.id,
                    "codigo_voo": voo.codigo_voo,
                    "horario_previsto": voo.horario_previsto.isoformat(),
                    "atraso_minutos": atraso,
                    "mensagem": f"Conflito: {voo.codigo_voo} aguardou {atraso} min na fila da pista",
                })

            yield env.timeout(DURACAO_OPERACAO_MIN)

    for voo in voos_sorted:
        env.process(processo_voo(voo))

    env.run()

    return conflitos
