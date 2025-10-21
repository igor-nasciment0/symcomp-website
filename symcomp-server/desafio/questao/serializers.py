from rest_framework import serializers
from desafio.questao.models import Questao

class QuestaoSerializer(serializers.ModelSerializer):
    valorPontos = serializers.CharField(source='valor_pontos', read_only=True)

    class Meta:
        model = Questao
        fields = ['id', 'pergunta', 'valorPontos']
