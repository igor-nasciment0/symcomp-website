from rest_framework import serializers
from .models import Jogador

class JogadorSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Jogador
        fields = ['user', 'email', 'desafio', 'pontos', 'username']
        read_only_fields = ['username', 'pontos']
