from django.db import models
from desafio.models import Desafio
from desafio.questao.models import Questao
from desafio.jogador.models import Jogador

class Resposta(models.Model):
    """
    Representa uma resposta salva de uma questão para um jogador 
    """
    
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE, related_name='respostas')
    jogador = models.ForeignKey(Jogador, on_delete=models.CASCADE, related_name='respostas')
    
    resposta = models.CharField(max_length=255)
    correta = models.BooleanField(null=True, blank=True) # Verifica se a resposta foi correta ao validar
    
    class Meta:
        unique_together = ('jogador', 'questao')

    def __str__(self):
        return f"Resposta de {self.jogador} para a questão {self.questao}"

