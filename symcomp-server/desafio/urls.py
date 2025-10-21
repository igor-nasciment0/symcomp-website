from django.urls import path
from desafio.views import (
    responder_questao,
    obter_ranking,
    salvar_resposta,
    submeter_formulario,
    listar_questoes_desafio,
    criar_jogador,
    listar_desafios,
    salvar_respostas_em_lote,  # 👈 importa a nova view
)

urlpatterns = [
    path('<int:desafio_id>/join/', criar_jogador, name='criar-jogador'),
    # path('questoes/<int:questao_id>/responder/', responder_questao, name='responder-questao'),
    path('<int:desafio_id>/ranking/', obter_ranking, name='obter-ranking'),
    path('respostas/salvar/', salvar_resposta, name='salvar-resposta'),
    path('<int:desafio_id>/respostas/salvar-em-lote/', salvar_respostas_em_lote, name='salvar-respostas-em-lote'),
    path('<int:desafio_id>/submeter/', submeter_formulario, name='submeter-formulario'),
    path('<int:desafio_id>/questoes/', listar_questoes_desafio, name='desafio-questoes-list'),
    path('listar/', listar_desafios, name='listar-desafios'),
]
