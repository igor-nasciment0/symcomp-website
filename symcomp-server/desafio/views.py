from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from desafio.questao.models import Questao
from desafio.jogador.models import Jogador
from desafio.resposta.models import Resposta
from desafio.models import Desafio
from rest_framework import status
from desafio.serializers import RankingSerializer
from desafio.resposta.serializers import RespostaSerializer
from .questao.serializers import QuestaoSerializer
from desafio.services import GerenciadorDePontuacao, ValidadorFormulario

# salvar_questao -> utilizado para salvar a resposta do usuário sem submeter todo o formulario
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def salvar_resposta(request):
    """
    O frontend deve mandar {'questao': ID, 'resposta': 'resposta do usuario'}
    """ 
    serializer = RespostaSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    validated_data = serializer.validated_data
    questao = validated_data['questao']  

    try:
        jogador = Jogador.objects.get(user=request.user, desafio=questao.desafio)
    except Jogador.DoesNotExist:
        return Response({"error": "Jogador não encontrado."}, status=status.HTTP_404_NOT_FOUND)

    Resposta.objects.update_or_create(
            jogador=jogador,
            questao=questao,
            defaults={'resposta': validated_data['resposta']}
            )

    return Response({"status": "Resposta salva com sucesso."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submeter_formulario(request, desafio_id):
    """
    Recebe o sinal de finalização de desafio, valida as respostas em lote e calcula a pontuação final.
    """
    try:
        desafio = Desafio.objects.get(id=desafio_id)
        jogador = Jogador.objects.get(user=request.user, desafio=desafio)
    except Desafio.DoesNotExist:
        return Response({"error": "desafio não encontrado para este desafio_id"}, status=status.HTTP_404_NOT_FOUND)
    except Jogador.DoesNotExist:
        return Response({"error": "Jogador não encontrado para este desafio"}, status=status.HTTP_404_NOT_FOUND)

    pontuacao_final = ValidadorFormulario.processar_submissao(jogador)

    return Response(
            {"status": "Desafio finalizado!", "pontuacao_final": pontuacao_final},
            status=status.HTTP_200_OK
            )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_questoes_desafio(request, desafio_id):
    try:
        # Verifica se o desafio existe para evitar erros
        Desafio.objects.get(pk=desafio_id)
    except Desafio.DoesNotExist:
        return Response({"error": "Desafio não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    questoes = Questao.objects.filter(desafio_id=desafio_id)
    serializer = QuestaoSerializer(questoes, many=True)
    return Response(serializer.data)

# será inutilizável no futuro, pois não responderemos as questões individualmente, nem obteremos a pontuação individual de cada 
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
