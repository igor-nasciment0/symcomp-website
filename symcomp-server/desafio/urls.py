from django.urls import path
from desafio.views import responder_questao, obter_ranking, salvar_resposta, submeter_formulario,listar_questoes_desafio 

urlpatterns = [
    #path('questoes/<int:questao_id>/responder/', responder_questao, name='responder-questao'),
    path('<int:desafio_id>/ranking/', obter_ranking, name='obter-ranking'), 
    # O formato para resposta deve ser algo como {'questao': ID, 'resposta': 'resposta do usuario '}
    path('respostas/salvar/', salvar_resposta, name='salvar-resposta'),
    path('<int:desafio_id>/submeter/', submeter_formulario, name='submeter-formulario'),
    path('<int:desafio_id>/questoes/', listar_questoes_desafio, name='desafio-questoes-list'),
]
