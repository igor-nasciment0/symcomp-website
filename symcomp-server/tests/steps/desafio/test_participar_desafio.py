import pytest
from pytest_bdd import given, when, then, scenario
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from desafio.models import Desafio
from desafio.username.models import Daname
from api.models import PerfilUsuario, Papel, Jogador

User = get_user_model()


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def contexto():
    return {}


@pytest.mark.django_db
@scenario('../features/desafio/participar_desafio.feature', 'Usuário cadastrado aceita o desafio')
def test_usuario_cadastrado_aceita_desafio():
    pass


@given("que o usuário está cadastrado")
def usuario_cadastrado(contexto):
    user = User.objects.create_user(
        email="usuario@example.com",
        name="Usuário",
        password="123"
    )
    perfil = PerfilUsuario.objects.create(user=user, papel=Papel.PARTICIPANTE)
    contexto["user"] = user
    contexto["perfil"] = perfil
    return contexto


@given("existe um desafio")
def existe_evento(contexto):
    desafio = Desafio.objects.create(
        titulo="Desafio da Semana",
        factory_type="daname"
    )
    contexto["desafio"] = desafio
    return contexto


@given("existem nicknames possíveis registrados")
def criar_nicknames():
    Daname.objects.create(nome="ÁguiaVeloz")
    Daname.objects.create(nome="TigreManso")
    Daname.objects.create(nome="CorujaSábia")


@when("ele aceita o desafio")
def aceitar_desafio(client, contexto):
    user = contexto["user"]
    desafio = contexto["desafio"]
    client.force_authenticate(user=user)
    response = client.post(
        f"/desafios/{desafio.id}/jogador/",
        {},
        format="json"
    )
    contexto["response"] = response
    return contexto


@then("ele deve receber um nickname da lista")
def verificar_nickname(contexto):
    user = contexto["user"]
    jogador = Jogador.objects.get(user=user)
    nicknames = list(Daname.objects.values_list("nome", flat=True))
    assert jogador.nickname in nicknames


@then("ter pontuação 0")
def verificar_pontuacao_inicial(contexto):
    user = contexto["user"]
    jogador = Jogador.objects.get(user=user)
    assert jogador.pontos == 0
