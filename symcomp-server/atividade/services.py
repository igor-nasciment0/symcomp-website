from django.utils import timezone
from django.db import transaction
from .models import Atividade
from .presenca import Presenca

class ValidadorPresenca:
    def __init__(self, atividade: Atividade):
        self.atividade = atividade

    def validar_horario(self, horario: timezone.datetime = None) -> bool:
        horario = horario or timezone.now()
        return self.atividade.comeca_as <= horario <= self.atividade.termina_as

class PresencaService:
    def __init__(self, atividade, nome, email, compartilhar):
        self.atividade = atividade
        self.nome = nome
        self.email = email
        self.compartilhar = compartilhar

    def registrar_presenca(self):
        ja_registrado = Presenca.objects.filter(
            atividade=self.atividade,
            email=self.email
        ).exists()

        if ja_registrado:
            return False, "Presença já registrada."

        Presenca.objects.create(
            atividade=self.atividade,
            email=self.email,
            nome=self.nome,
            compartilhar_email=self.compartilhar
        )

        return True, f"Presença de {self.nome} registrada com sucesso."
