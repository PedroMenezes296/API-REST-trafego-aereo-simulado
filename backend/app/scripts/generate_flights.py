from datetime import date, datetime, time, timedelta
import random

from app.database.connection import SessionLocal
from app.models.aeroporto import Aeroporto
from app.models.voo import Voo


def gerar_codigo_voo(indice: int, tipo_operacao: str) -> str:
    prefixo_operacao = "CH" if tipo_operacao == "chegada" else "SA"
    return f"VM-{prefixo_operacao}-{indice:04d}"


def gerar_horarios_unicos(data_operacao: date, quantidade: int, hora_inicio=6, hora_fim=22):
    inicio = datetime.combine(data_operacao, time(hour=hora_inicio, minute=0))
    fim = datetime.combine(data_operacao, time(hour=hora_fim, minute=0))

    intervalo_minutos = int((fim - inicio).total_seconds() // 60)

    if quantidade > intervalo_minutos + 1:
        raise ValueError("Quantidade de voos maior que a quantidade de minutos disponíveis no intervalo.")

    minutos_sorteados = random.sample(range(intervalo_minutos + 1), quantidade)
    horarios = [inicio + timedelta(minutes=minuto) for minuto in minutos_sorteados]
    horarios.sort()

    return horarios


def gerar_operacoes(quantidade: int):
    total_chegadas = round(quantidade * 0.6)
    total_saidas = quantidade - total_chegadas

    operacoes = ["chegada"] * total_chegadas + ["saida"] * total_saidas
    random.shuffle(operacoes)

    return operacoes, total_chegadas, total_saidas


def gerar_voos(aeroporto_id: int, data_operacao: date, quantidade: int):
    db = SessionLocal()

    try:
        aeroporto = db.query(Aeroporto).filter(Aeroporto.id == aeroporto_id).first()

        if not aeroporto:
            print(f"Aeroporto com id {aeroporto_id} não encontrado.")
            return

        operacoes, total_chegadas, total_saidas = gerar_operacoes(quantidade)
        horarios = gerar_horarios_unicos(data_operacao, quantidade)

        total_criados = 0

        for i in range(quantidade):
            tipo_operacao = operacoes[i]
            horario_previsto = horarios[i]

            voo = Voo(
                codigo_voo=gerar_codigo_voo(
                    indice=i + 1,
                    tipo_operacao=tipo_operacao
                ),
                tipo_operacao=tipo_operacao,
                status="programado",
                data_operacao=data_operacao,
                horario_previsto=horario_previsto,
                horario_real=None,
                prioridade=0,
                emergencia=False,
                aeroporto_id=aeroporto_id,
            )

            db.add(voo)
            total_criados += 1

        db.commit()

        print("Geração de voos concluída com sucesso.")
        print(f"Aeroporto: {aeroporto.nome} (id={aeroporto.id})")
        print(f"Data: {data_operacao}")
        print(f"Total de voos criados: {total_criados}")
        print(f"Chegadas: {total_chegadas}")
        print(f"Saídas: {total_saidas}")

    except Exception as e:
        db.rollback()
        print(f"Erro ao gerar voos: {e}")

    finally:
        db.close()


if __name__ == "__main__":
    gerar_voos(
        aeroporto_id=1,
        data_operacao=date(2026, 4, 10),
        quantidade=20
    )