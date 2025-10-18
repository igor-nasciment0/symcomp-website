from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Atividade
from .services import PresencaService
from .validators import TokenPresencaValidator

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def registrar_presenca(request, uid):
    atividade = get_object_or_404(Atividade, uid=uid)
    
    token = request.data.get('token')
    validator = TokenPresencaValidator(token, uid)
    token_valid, error_message = validator.validate()
    
    if not token_valid:
        return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
    
    service = PresencaService(atividade, request.user)
    sucesso, mensagem = service.registrar_presenca()
    
    if sucesso:
        return Response({'message': mensagem}, status=status.HTTP_201_CREATED)
    return Response({'error': mensagem}, status=status.HTTP_400_BAD_REQUEST)
