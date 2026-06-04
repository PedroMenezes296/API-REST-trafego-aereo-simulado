def voo_payload(aeroporto_id, origem_id, destino_id, codigo="LA3000", hora="2026-04-10T10:00:00"):
    return {
        "codigo_voo": codigo,
        "tipo_operacao": "chegada",
        "status": "programado",
        "data_operacao": "2026-04-10",
        "horario_previsto": hora,
        "prioridade": 0,
        "emergencia": False,
        "aeroporto_id": aeroporto_id,
        "origem_id": origem_id,
        "destino_id": destino_id,
    }


def test_listar_voos_vazio(client):
    response = client.get("/voos/")
    assert response.status_code == 200
    assert response.json() == []


def test_criar_voo(client, dois_aeroportos):
    gru, gig = dois_aeroportos
    payload = voo_payload(gru.id, gig.id, gru.id)
    response = client.post("/voos/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["codigo_voo"] == "LA3000"
    assert data["status"] == "programado"
    assert data["emergencia"] is False


def test_buscar_voo_existente(client, dois_aeroportos):
    gru, gig = dois_aeroportos
    criado = client.post("/voos/", json=voo_payload(gru.id, gig.id, gru.id)).json()
    response = client.get(f"/voos/{criado['id']}")
    assert response.status_code == 200
    assert response.json()["id"] == criado["id"]


def test_buscar_voo_inexistente(client):
    response = client.get("/voos/9999")
    assert response.status_code == 404


def test_patch_status(client, dois_aeroportos):
    gru, gig = dois_aeroportos
    criado = client.post("/voos/", json=voo_payload(gru.id, gig.id, gru.id)).json()
    response = client.patch(f"/voos/{criado['id']}", json={"status": "finalizado"})
    assert response.status_code == 200
    assert response.json()["status"] == "finalizado"


def test_patch_emergencia(client, dois_aeroportos):
    gru, gig = dois_aeroportos
    criado = client.post("/voos/", json=voo_payload(gru.id, gig.id, gru.id)).json()
    response = client.patch(f"/voos/{criado['id']}", json={"emergencia": True, "prioridade": 100})
    assert response.status_code == 200
    data = response.json()
    assert data["emergencia"] is True
    assert data["prioridade"] == 100


def test_patch_voo_inexistente(client):
    response = client.patch("/voos/9999", json={"status": "finalizado"})
    assert response.status_code == 404
