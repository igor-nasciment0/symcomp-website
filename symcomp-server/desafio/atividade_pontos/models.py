from django.db import models
from django.conf import settings
from desafio.models import Desafio
from atividade.models import Atividade

class AtividadePontos(models.Model):
    atividade = models.OneToOneField(
        Atividade,
        related_name="pontos",
        on_delete=models.CASCADE,
    )
    valor = models.IntegerField(default=250)

    def __str__(self):
        return f'{self.atividade.titulo} - {self.pontos}'
