from django.db import models
from django.utils import timezone
from api.models import User
from atividade.models import Atividade

class Presenca(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='registros_presenca')
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE, related_name='registros_presenca')
    horario_registro = models.DateTimeField(auto_now_add=True)
    horas = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['-horario_registro']
        indexes = [
            models.Index(fields=['usuario', 'atividade', 'horario_registro'])
        ]