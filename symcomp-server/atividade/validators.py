from datetime import datetime
from typing import Tuple
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.utils import timezone
from django.shortcuts import get_object_or_404
from .models import Atividade

class TokenPresencaValidator:
    def __init__(self, token: str, atividade_uid: str):
        self.token = token
        self.atividade_uid = atividade_uid

    def validate(self) -> Tuple[bool, str]:
        if not self.token:
            return False, "Token não fornecido"

        try:
            decoded_token = AccessToken(self.token)
            if str(decoded_token['aid']) != str(self.atividade_uid):
                return False, "Token não corresponde à atividade"
            return True, "Token válido"
        except TokenError:
            return False, "Token inválido ou expirado"
        except KeyError:
            return False, "Token não contém identificador da atividade"
        except Exception as e:
            return False, f"Erro ao validar token: {str(e)}"