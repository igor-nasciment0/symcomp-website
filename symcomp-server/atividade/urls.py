from django.urls import path
from . import views

urlpatterns = [
    path('atividade/registrar-presenca/', views.registrar_presenca, name='registrar_presenca'),
]