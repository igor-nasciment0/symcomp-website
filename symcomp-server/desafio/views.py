from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from desafio.questao.models import Questao
from desafio.jogador.models import Jogador
from desafio.models import Desafio
from rest_framework import status
from desafio.serializers import RankingSerializer
from desafio.services import GerenciadorDePontuacao

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def responder_questao(request, questao_id):
    """
    Recebe a resposta do usuário, valida e atualiza a pontuação.
    """
    try:
        questao = Questao.objects.get(id=questao_id)
    except Questao.DoesNotExist:
        return Response({"error": "Questão não encontrada"}, status=404)

    resposta_usuario = request.data.get("resposta")
    if resposta_usuario is None:
        return Response({"error": "Resposta não fornecida"}, status=400)

    correta = GerenciadorDePontuacao.atualizar_pontuacao(request.user, questao, resposta_usuario)

    return Response({
        "questao": questao.pergunta,
        "resposta_correta": correta,
        "pontuacao_atual": request.user.jogador.pontos
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obter_ranking(request, desafio_id):
    """
    Obtém o ranking (Top 10) de um desafio
    """

    try:
        desafio = Desafio.objects.get(pk=desafio_id)
    except Desafio.DoesNotExist:
        return Response({"error": "Desafio não encontrado"}, status=404)

    top_10_jogadores = Jogador.objects.filter(desafio=desafio).order_by('-pontos')[:10]

    serializer = RankingSerializer(top_10_jogadores, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
