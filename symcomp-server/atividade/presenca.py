from django.db import models
from atividade.models import Atividade

class Presenca(models.Model):
    nome = models.CharField(max_length=255, default="")
    email = models.EmailField(default="")
    atividade = models.ForeignKey(Atividade, on_delete=models.CASCADE, related_name='registros_presenca')
    horario_registro = models.DateTimeField(auto_now_add=True)
    horas = models.PositiveIntegerField(default=1)
    compartilhar_email = models.BooleanField(default=False)

    class Meta:
        ordering = ['-horario_registro']
        indexes = [
            models.Index(fields=['email', 'atividade', 'horario_registro'])
        ]

    def __str__(self):
        return f"{self.nome} ({self.email}) - {self.atividade.titulo}"
