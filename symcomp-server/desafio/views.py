from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from desafio.questao.models import Questao
from desafio.jogador.models import Jogador
from desafio.resposta.models import Resposta
from desafio.models import Desafio
from rest_framework import status
from desafio.serializers import RankingSerializer, DesafioSerializer
from desafio.resposta.serializers import RespostaSerializer
from .questao.serializers import QuestaoSerializer
from desafio.jogador.serializers import JogadorSerializer
from desafio.services import GerenciadorDePontuacao, ValidadorFormulario

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def criar_jogador(request, desafio_id):
    try:
        desafio = Desafio.objects.get(pk=desafio_id)
    except Desafio.DoesNotExist:
        return Response(
            {"error": "Desafio não encontrado."},
            status=status.HTTP_404_NOT_FOUND
        )

    if Jogador.objects.filter(user=request.user, desafio=desafio).exists():
        return Response(
            {"error": "Você já está inscrito neste desafio."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        jogador = Jogador.objects.create(
            user=request.user,
            desafio=desafio
        )
        serializer = JogadorSerializer(jogador)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except ValueError as e:
        # Captura o erro do 'busca_username_disponivel'
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {"error": f"Ocorreu um erro ao criar o jogador: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

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
        desafio = Desafio.objects.get(pk=desafio_id)
    except Desafio.DoesNotExist:
        return Response({"error": "Desafio não encontrado"}, status=status.HTTP_404_NOT_FOUND)

    questoes = Questao.objects.filter(desafio=desafio)
    jogador = Jogador.objects.filter(user=request.user, desafio=desafio).first()
    respostas = Resposta.objects.filter(jogador=jogador) if jogador else []

    if respostas.filter(correta__isnull=False).exists():
        return Response({"detail": "Respostas já validadas."}, status=status.HTTP_200_OK)

    respostas_dict = {r.questao.id: r.resposta for r in respostas}
    serializer = QuestaoSerializer(questoes, many=True)
    data = serializer.data

    for q in data:
        q["respostaSalva"] = respostas_dict.get(q["id"], "")

    return Response(data, status=status.HTTP_200_OK)

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

@api_view(['GET'])
@permission_classes([AllowAny])
def listar_desafios(request):
    desafios = Desafio.objects.all()
    serializer = DesafioSerializer(desafios, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def salvar_respostas_em_lote(request, desafio_id):
    """
    Recebe um payload no formato:
    {
        "1": "resposta da questão 1",
        "2": "",
        "3": "resposta da questão 3"
    }

    e salva ou atualiza todas as respostas do jogador para o desafio informado.
    """
    try:
        desafio = Desafio.objects.get(pk=desafio_id)
    except Desafio.DoesNotExist:
        return Response({"error": "Desafio não encontrado."}, status=status.HTTP_404_NOT_FOUND)

    try:
        jogador = Jogador.objects.get(user=request.user, desafio=desafio)
    except Jogador.DoesNotExist:
        return Response({"error": "Jogador não encontrado para este desafio."}, status=status.HTTP_404_NOT_FOUND)

    respostas_data = request.data  # dicionário com questao_id -> resposta

    # Percorre cada par (questao_id, resposta)
    for questao_id, resposta_texto in respostas_data.items():
        try:
            questao = Questao.objects.get(pk=questao_id, desafio=desafio)
        except Questao.DoesNotExist:
            continue  # ignora IDs inválidos, mas não quebra o processo

        Resposta.objects.update_or_create(
            jogador=jogador,
            questao=questao,
            defaults={'resposta': resposta_texto or ""}
        )

    return Response({"status": "Respostas salvas com sucesso."}, status=status.HTTP_200_OK)
