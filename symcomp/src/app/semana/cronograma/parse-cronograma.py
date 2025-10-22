import csv
import json

dias = [
    {"name": "Segunda", "key": "SEG", "date": "20/10"},
    {"name": "Terça", "key": "TER", "date": "21/10"},
    {"name": "Quarta", "key": "QUA", "date": "22/10"},
    {"name": "Quinta", "key": "QUI", "date": "23/10"},
    {"name": "Sexta", "key": "SEX", "date": "24/10"},
]

def parse_csv(path_csv: str, path_json: str):
    with open(path_csv, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = [r for r in reader if any(r.values())]

    cronograma = []
    for dia in dias:
        atividades = []
        for row in rows:
            if row.get("Dia da Semana") == dia["key"]:
                # Garantir todos os campos necessários, preenchendo com string vazia se faltar
                atividade = {
                    "horario": row.get("Horário", ""),
                    "data": dia["key"],
                    "titulo": row.get("Titulo da Palestra", ""),
                    "descricao": row.get("Descrição", ""),
                    "palestrante": row.get("Nome do palestrante", ""),
                    "sobre": row.get("Sobre o palestrante", ""),
                    "foto": row.get("arquivo_foto", ""),
                    "contato": row.get("Contato", ""),
                    "status": row.get("Status", ""),
                    "linkCalendar": row.get("link_calendar", ""),
                    "keyWord": row.get("key_word", ""),
                    "linkLive": row.get("link_live", ""),  # essencial para o Palestra
                    "sponsorName": row.get("sponsor_name", ""),
                    "sponsorTier": row.get("sponsor_tier", ""),
                }
                atividades.append(atividade)
        cronograma.append({
            "name": dia["name"],
            "date": dia["date"],
            "atividades": atividades,
        })

    with open(path_json, "w", encoding="utf-8") as jsonfile:
        json.dump(cronograma, jsonfile, indent=2, ensure_ascii=False)

    print(f"✅ Arquivo JSON gerado em: {path_json}")


if __name__ == "__main__":
    parse_csv("2025-10-22-2__cronograma.csv", "cronograma.json")
