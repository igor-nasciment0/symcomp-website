from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from atividade.models import Atividade
from .services import PresencaService
from atividade.validators import TokenPresencaValidator

from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def registrar_presenca(request):
    token = request.data.get('token')
    name = request.data.get('name')
    email = request.data.get('email')
    compartilhar = request.data.get('compartilhar')

    if not name or not email:
        return Response({'error': 'Nome e e-mail são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

    validator = TokenPresencaValidator(token)
    atividade, error_message = validator.get_valid_atividade()

    if not atividade:
        return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

    service = PresencaService(atividade, name, email, compartilhar)
    sucesso, mensagem = service.registrar_presenca()

    if sucesso:
        try:
            user = User.objects.get(email=email)
            if hasattr(user, 'jogador'):
                jogador = user.jogador
                jogador.pontos += 50
                jogador.save()
        except User.DoesNotExist:
            pass

        return Response({'message': mensagem}, status=status.HTTP_201_CREATED)

    return Response({'error': mensagem}, status=status.HTTP_400_BAD_REQUEST)

