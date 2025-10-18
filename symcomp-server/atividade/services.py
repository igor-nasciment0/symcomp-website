from django.utils import timezone
from django.db import transaction
from .models import Atividade
from .presenca import RegistroPresenca

class ValidadorPresenca:
    def __init__(self, atividade: Atividade):
        self.atividade = atividade

    def validar_horario(self, horario: timezone.datetime = None) -> bool:
        horario = horario or timezone.now()
        return self.atividade.comeca_as <= horario <= self.atividade.termina_as

class RegistroPresencaService:
    def __init__(self, atividade: Atividade, usuario):
        self.atividade = atividade
        self.usuario = usuario
        self.validador = ValidadorPresenca(atividade)

    def registrar_presenca(self) -> tuple[bool, str]:
        if not self.validador.validar_horario():
            return False, "Presença só pode ser registrada durante o horário da atividade"

        if RegistroPresenca.objects.filter(
            usuario=self.usuario,
            atividade=self.atividade
        ).exists():
            return False, "Presença já registrada para esta atividade"

        try:
            RegistroPresenca.objects.create(
                usuario=self.usuario,
                atividade=self.atividade
            )
            return True, "Presença registrada com sucesso"
        except Exception as e:
            return False, f"Erro ao registrar presença: {str(e)}"