from django.urls import path
from desafio.views import responder_questao, obter_ranking

urlpatterns = [
    path('questoes/<int:questao_id>/responder/', responder_questao, name='responder-questao'),
    path('<int:desafio_id>/ranking/', obter_ranking, name='obter-ranking'), 
]
