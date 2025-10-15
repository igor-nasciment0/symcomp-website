from django.db import models
from django.utils import timezone
from django.db.models import Sum
from api.models import User
from atividade.models import Atividade

class RegistroPresenca(models.Model):
    """Modelo que registra cada momento de presença do usuário em uma atividade"""
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='registros_presenca')
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE, related_name='registros_presenca')
    horario_registro = models.DateTimeField(auto_now_add=True)
    horas = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['-horario_registro']
        indexes = [
            models.Index(fields=['usuario', 'atividade', 'horario_registro'])
        ]

class PresencaTotal(models.Model):
    """Modelo que agrega o total de horas de presença do usuário"""
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='presenca_total')
    total_horas = models.PositiveIntegerField(default=0)
    ultima_atualizacao = models.DateTimeField(auto_now=True)

    @classmethod
    def atualizar_ou_criar(cls, usuario: User) -> 'PresencaTotal':
        total = RegistroPresenca.objects.filter(
            usuario=usuario
        ).aggregate(
            total=Sum('horas')
        )['total'] or 0

        presenca_total, _ = cls.objects.update_or_create(
            usuario=usuario,
            defaults={'total_horas': total}
        )
        return presenca_total

    def __str__(self):
        return f"{self.usuario.username} - {self.total_horas}h"