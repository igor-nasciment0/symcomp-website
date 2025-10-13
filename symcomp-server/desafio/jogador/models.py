from django.db import models
from django.conf import settings
from desafio.models import Desafio

class Jogador(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="jogador"
    )
    desafio = models.ForeignKey(
        Desafio,
        on_delete=models.CASCADE,
        related_name="jogadores"
    )
    pontos = models.IntegerField(default=0)
    username = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'{self.username or "Sem username"} - {self.user.email}'

    def solicitar_username(self):
        """Obtém um username disponível do desafio ou cria um fallback."""
        if self.username:
            return self.username

        if not self.desafio:
            # Retorna um username fallback caso o desafio não esteja definido
            return f'player_{self.user.id}'

        # Busca username disponível na fábrica
        try:
            username = self.desafio.busca_username_disponivel()
        except ValueError:
            # Se não houver username disponível, cria um fallback
            username = f'player_{self.user.id}'

        return username

    def save(self, *args, **kwargs):
        # Gera username automaticamente se ainda não existir
        if not self.username:
            self.username = self.solicitar_username()
        super().save(*args, **kwargs)
