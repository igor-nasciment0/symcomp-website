from django.urls import path
from desafio.views import responder_questao, obter_ranking, salvar_resposta, submeter_formulario

urlpatterns = [
    #path('questoes/<int:questao_id>/responder/', responder_questao, name='responder-questao'),
    path('<int:desafio_id>/ranking/', obter_ranking, name='obter-ranking'), 
    path('respostas/salvar/', salvar_resposta, name='salvar-resposta'),
    path('<int:desafio_id>/submeter', submeter_formulario, name='submeter-formulario'),
]
