import jwt
from django.conf import settings
from atividade.models import Atividade

class TokenPresencaValidator:
    def __init__(self, token: str):
        self.token = token

    def get_valid_atividade(self):
        if not self.token:
            return None, "Token não fornecido."

        try:
            payload = jwt.decode(self.token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.InvalidTokenError:
            return None, "Token inválido."

        if payload.get("type") != "qr_presence":
            return None, "Tipo de token inválido."

        uid = payload.get("uid")
        if not uid:
            return None, "Token sem UID da atividade."

        atividade = Atividade.objects.filter(uid=uid).first()
        if not atividade:
            return None, "Atividade não encontrada."

        return atividade, None
