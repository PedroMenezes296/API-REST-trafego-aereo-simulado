const API_BASE_URL = "http://127.0.0.1:8000";

async function tratarResposta(res) {
  if (!res.ok) {
    const erro = await res.json().catch(() => ({}));
    throw new Error(erro.detail || "Erro na requisição");
  }
  return res.json();
}

export async function listarAeroportos() {
  const res = await fetch(`${API_BASE_URL}/aeroportos/`);
  return tratarResposta(res);
}

export async function listarVoos() {
  const res = await fetch(`${API_BASE_URL}/voos/`);
  return tratarResposta(res);
}

export async function criarVoo(dados) {
  const res = await fetch(`${API_BASE_URL}/voos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  return tratarResposta(res);
}

export async function resumoOperacional(data) {
  const res = await fetch(`${API_BASE_URL}/operacoes/resumo?data=${data}`);
  return tratarResposta(res);
}

export async function listarOrdemOperacional(data) {
  const res = await fetch(`${API_BASE_URL}/ordem-operacional/?data=${data}`);
  return tratarResposta(res);
}

export async function marcarEmergencia(vooId) {
  const res = await fetch(`${API_BASE_URL}/emergencias/${vooId}`, {
    method: "PATCH",
  });

  return tratarResposta(res);
}