# Backend

## Como rodar o projeto

1. Entre na pasta backend
2. Ative o ambiente virtual
-> está dentro da pasta .venv\Scripts\Activate.ps1
-> exemplo da minha maquina: PS C:\Users\PedroMenezes\Documents\meusCodigos\Python\GerenciamentoTrafegoAereo-EngenhariaSoftware> & \backend\.venv\Scripts\Activate.ps1
3. Execute o servidor

### Comando

```bash
python -m uvicorn app.main:app --reload

### Depois abrir no link

http://127.0.0.1:8000/docs

# e aqui vão estar os get e set para teste do programa