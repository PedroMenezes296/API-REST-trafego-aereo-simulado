def criar_voo_payload(codigo, hora, aeroporto_id, origem_id, destino_id, prioridade=0):
    return {
        "codigo_voo": codigo,
        "tipo_operacao": "chegada",
        "status": "programado",
        "data_operacao": "2026-04-10",
        "horario_previsto": hora,
        "prioridade": prioridade,
        "emergencia": False,
        "aeroporto_id": aeroporto_id,
        "origem_id": origem_id,
        "destino_id": destino_id,
    }


def test_ordem_vazia(client):
    response = client.get("/ordem-operacional/?data=2026-04-10")
    assert response.status_code == 200
    assert response.json() == []


def test_ordem_retorna_voos(client, dois_aeroportos):
    gru, gig = dois_aeroportos
    client.post("/voos/", json=criar_voo_payload("LA001", "2026-04-10T10:00:00", gru.id, gig.id, gru.id))
    client.post("/voos/", json=criar_voo_payload("LA002", "2026-04-10T10:10:00", gru.id, gig.id, gru.id))

    response = client.get("/ordem-operacional/?data=2026-04-10")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_horario_ajustado_com_conflito(client, dois_aeroportos):
    gru, gig = dois_aeroportos
    # Dois voos com apenas 2 minutos de intervalo (abaixo do mínimo de 5 min)
    client.post("/voos/", json=criar_voo_payload("LA001", "2026-04-10T10:00:00", gru.id, gig.id, gru.id))
    client.post("/voos/", json=criar_voo_payload("LA002", "2026-04-10T10:02:00", gru.id, gig.id, gru.id))

    response = client.get("/ordem-operacional/?data=2026-04-10")
    data = response.json()
    assert len(data) == 2

    # O segundo voo deve ter horario_ajustado diferente do previsto
    voo2 = next(v for v in data if v["codigo_voo"] == "LA002")
    assert voo2["horario_ajustado"] is not None
    assert voo2["horario_ajustado"] != voo2["horario_previsto"]


def test_filtro_por_aeroporto(client, dois_aeroportos):
    gru, gig = dois_aeroportos
    # Voo no aeroporto GRU
    client.post("/voos/", json=criar_voo_payload("LA001", "2026-04-10T10:00:00", gru.id, gig.id, gru.id))
    # Voo no aeroporto GIG
    client.post("/voos/", json=criar_voo_payload("LA002", "2026-04-10T10:10:00", gig.id, gru.id, gig.id))

    response = client.get(f"/ordem-operacional/?data=2026-04-10&aeroporto_id={gru.id}")
    data = response.json()
    assert len(data) == 1
    assert data[0]["codigo_voo"] == "LA001"
