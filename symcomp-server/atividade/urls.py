from django.urls import path
from atividade.views import registrar_presenca

urlpatterns = [
    path('atividades/registrar-presenca/', registrar_presenca, name='registrar-presenca'),
]
