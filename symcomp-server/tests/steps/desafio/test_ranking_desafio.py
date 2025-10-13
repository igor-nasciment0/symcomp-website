from os import wait
import pytest
from pytest_bdd import given, when, then, scenario
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from desafio.models import Desafio
from desafio.jogador.models import Jogador
from desafio.username.models import Daname
from api.models import PerfilUsuario, Papel

User = get_user_model()

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def contexto():
    return {}

# Definição do cenário
@pytest.mark.django_db
@scenario('/../../features/desafio/ranking_desafio.feature', 'Obter o ranking de um desafio com vários jogadores')
def test_obter_ranking_de_desafio():
    pass

@given("que o usuário está autenticado")
def usuario_autenticado(contexto):
    user = User.objects.create_user(
            email="testador@example.com",
            name="TesteUser",
            password="symcomp123"
        )
    perfil = PerfilUsuario.objects.create(user=user, papel=Papel.PARTICIPANTE)

    contexto["user"] = user
    contexto["perfil"] = perfil
    return contexto

@given("existe um desafio")
def existe_desafio(contexto):
    desafio = Desafio.objects.create(
            titulo="Desafio1",
            factory_type="daname"
            )
    contexto["desafio"] = desafio
    return contexto

@given("existem vários jogadores inscritos neste desafio com diferentes pontuações")
def popular_jogadores(contexto):
    desafio = contexto["desafio"]
    for i in range(15):
        user = User.objects.create_user(
                email=f"jogador{i}@exemplo.com",
                name=f"Jogador {i}",
                password="123"
        )
        jogador = Jogador.objects.create(
                user=user,
                desafio=desafio,
                pontos= i*20,
                username=f"jogamuito{1}"
        )

@when("o usuário solicita o ranking para esse desafio")
def solicitar_ranking(client, contexto):
    user = contexto["user"]
    desafio = contexto["desafio"]
    client.force_authenticate(user=user)
    response = client.get(f"/desafios/{desafio.id}/ranking/")
    contexto["response"] = response
    return contexto

@then("a resposta deve ser bem-sucedida")
def verificar_sucesso(contexto):
    assert contexto["response"].status_code == 200

@then("resposta deve conter uma lista com os 10 melhores jogadores")
def verificar_tamanho_lista(contexto):
    data = contexto["response"].data
    assert isinstance(data, list)
    assert len(data) == 10

@then("lista de jogadores deve estar ordenada por pontuação de forma decrescente")
def verificar_ordem_lista(contexto):
    data = contexto["response"].data

    pontuacoes = [jogador['pontos'] for jogador in data]
    pontuacoes_esperadas = sorted(pontuacoes, reverse=True)

    assert pontuacoes == pontuacoes_esperadas
    assert pontuacoes_esperadas[0] == 280
