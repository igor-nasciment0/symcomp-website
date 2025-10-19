from rest_framework import serializers
from .models import Resposta
from desafios.questao.models import Questao

class RespostaSerializer(serializers.ModelSerializer):
    questao = serializers.PrimaryKeyRelatedField(
        queryset=Questao.objects.all()
    )

    class Meta:
        model = Resposta
        fields = ['questao', 'resposta']
