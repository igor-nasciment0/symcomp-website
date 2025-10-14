from rest_framework import serializers
from desafio.jogador.models import Jogador
from desafio.models import Desafio
from desafio.questao.serializers import QuestaoSerializer

class DesafioSerializer(serializers.ModelSerializer):
    questoes = QuestaoSerializer(many=True)

    class Meta:
        model = Desafio
        fields = "__all__"

class RankingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)

    class Meta: 
        model = Jogador
        fields = ['username', 'pontos'] 
