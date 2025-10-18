import pytest
from datetime import datetime, timedelta
from pytest_bdd import scenario, given, when, then
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken
from atividade.models import Atividade, TipoAtividade, StatusAtividade
from atividade.presenca import Presenca
from atividade.services import PresencaService
from atividade.validators import TokenPresencaValidator
from api.models import User

@pytest.fixture(autouse=True)
def limpar_registros_presenca(db):
    Presenca.objects.all().delete()
    yield

@pytest.fixture
def client():
    return APIClient()

@scenario('../features/validar_presenca_qr.feature', 'Registrar presença em atividade durante seu horário')
def test_registro_presenca_valido(db):
    pass

@scenario('../features/validar_presenca_qr.feature', 'Tentar registrar presença fora do horário')
def test_registro_presenca_fora_horario(db):
    pass

@scenario('../features/validar_presenca_qr.feature', 'Tentar registrar presença com QR code inválido')
def test_registro_presenca_qr_invalido(db):
    pass

@scenario('../features/validar_presenca_qr.feature', 'Tentar registrar presença duas vezes na mesma atividade')
def test_registro_presenca_duplicado(db):
    pass

@scenario('../features/validar_presenca_qr.feature', 'Tentar registrar presença com QR code de outra atividade')
def test_registro_presenca_qr_trocado(db):
    pass

@pytest.fixture
@given('que existe uma atividade cadastrada')
def atividade_cadastrada(db):
    agora = timezone.now()
    atividade = Atividade.objects.create(
        tipo=TipoAtividade.PALESTRA,
        status=StatusAtividade.CONFIRMADA,
        comeca_as=agora - timedelta(minutes=30),  # Começou há 30 minutos
        termina_as=agora + timedelta(minutes=30)  # Termina em 30 minutos
    )
    return atividade

_user_counter = 0

@pytest.fixture
@given('que sou um usuário autenticado')
def usuario_autenticado(client, db):
    global _user_counter
    _user_counter += 1
    
    user = User.objects.create_user(
        name=f'Test User {_user_counter}',
        username=f'testuser{_user_counter}',
        email=f'test{_user_counter}@example.com',
        password='testpass123'
    )
    client.force_authenticate(user=user)
    return user

@given('que a atividade está acontecendo no momento')
def atividade_em_andamento():
    pass

@given('que a atividade não está acontecendo no momento')
def atividade_fora_horario(atividade_cadastrada):
    futuro = timezone.now() + timedelta(days=1)
    atividade_cadastrada.comeca_as = futuro
    atividade_cadastrada.termina_as = futuro + timedelta(hours=1)
    atividade_cadastrada.save()
    return atividade_cadastrada

@given('que já registrei presença nesta atividade')
def presenca_registrada(db, atividade_cadastrada, usuario_autenticado):
    Presenca.objects.filter(
        usuario=usuario_autenticado,
        atividade=atividade_cadastrada
    ).delete()
    
    Presenca.objects.create(
        usuario=usuario_autenticado,
        atividade=atividade_cadastrada
    )

@pytest.fixture
@given('que existem múltiplas atividades cadastradas')
def outra_atividade(db, atividade_cadastrada):
    agora = timezone.now()
    outra = Atividade.objects.create(
        tipo=TipoAtividade.PALESTRA,
        status=StatusAtividade.CONFIRMADA,
        comeca_as=agora - timedelta(minutes=30),
        termina_as=agora + timedelta(minutes=30)
    )
    return outra

def criar_token_valido(atividade: Atividade) -> str:
    token = AccessToken()
    token['aid'] = str(atividade.uid)
    return str(token)

def criar_token_invalido() -> str:
    token = AccessToken()
    token['aid'] = 'invalid-uid'
    return str(token)

@pytest.fixture
@when('eu escanear o QR code válido da atividade')
def escanear_qr_valido(atividade_cadastrada, usuario_autenticado):
    Presenca.objects.filter(
        usuario=usuario_autenticado,
        atividade=atividade_cadastrada
    ).delete()
    
    token = criar_token_valido(atividade_cadastrada)
    service = PresencaService(atividade_cadastrada, usuario_autenticado)
    validator = TokenPresencaValidator(token, str(atividade_cadastrada.uid))
    is_valid, message = validator.validate()
    if not is_valid:
        return False, message
    return service.registrar_presenca()

@pytest.fixture
@when('eu escanear um QR code inválido')
def escanear_qr_invalido(atividade_cadastrada, usuario_autenticado):
    token = criar_token_invalido()
    service = PresencaService(atividade_cadastrada, usuario_autenticado)
    validator = TokenPresencaValidator(token, str(atividade_cadastrada.uid))
    is_valid, _ = validator.validate()
    if is_valid:
        return service.registrar_presenca()
    return False, "Token inválido"

@pytest.fixture
@when('eu escanear o QR code válido da atividade novamente')
def escanear_qr_novamente(usuario_autenticado, atividade_cadastrada):
    token = criar_token_valido(atividade_cadastrada)
    service = PresencaService(atividade_cadastrada, usuario_autenticado)
    validator = TokenPresencaValidator(token, str(atividade_cadastrada.uid))
    is_valid, _ = validator.validate()
    if is_valid:
        return service.registrar_presenca()
    return False, "Token inválido"

@pytest.fixture
@when('eu escanear o QR code de uma atividade diferente')
def escanear_qr_outra_atividade(atividade_cadastrada, outra_atividade, usuario_autenticado):
    token = criar_token_valido(outra_atividade)
    validator = TokenPresencaValidator(token, str(atividade_cadastrada.uid))
    is_valid, message = validator.validate()
    return is_valid, message

@then('minha presença deve ser registrada com sucesso')
def verificar_presenca_registrada(usuario_autenticado, atividade_cadastrada, escanear_qr_valido):
    sucesso, mensagem = escanear_qr_valido
    assert sucesso, f"Falha ao registrar presença: {mensagem}"
    assert Presenca.objects.filter(
        usuario=usuario_autenticado,
        atividade=atividade_cadastrada
    ).exists(), "Registro de presença não foi criado"

@then('minha presença não deve ser registrada')
def verificar_presenca_nao_registrada(usuario_autenticado, atividade_cadastrada, escanear_qr_invalido):
    sucesso, _ = escanear_qr_invalido
    assert not sucesso
    assert not Presenca.objects.filter(
        usuario=usuario_autenticado,
        atividade=atividade_cadastrada
    ).exists()

@then('devo receber uma mensagem de confirmação')
def verificar_mensagem_sucesso(escanear_qr_valido):
    sucesso, mensagem = escanear_qr_valido
    assert sucesso
    assert 'sucesso' in mensagem.lower()

@then('devo receber uma mensagem de erro sobre horário inválido')
def verificar_mensagem_horario_invalido(escanear_qr_valido):
    sucesso, mensagem = escanear_qr_valido
    assert not sucesso
    assert 'horário' in mensagem.lower()

@then('devo receber uma mensagem de erro sobre token inválido')
def verificar_mensagem_token_invalido(escanear_qr_invalido):
    sucesso, mensagem = escanear_qr_invalido
    assert not sucesso
    assert 'token' in mensagem.lower()
    assert 'inválido' in mensagem.lower()

@then('minha presença não deve ser registrada novamente')
def verificar_sem_presenca_duplicada(usuario_autenticado, atividade_cadastrada, escanear_qr_novamente):
    sucesso, mensagem = escanear_qr_novamente
    assert not sucesso
    assert mensagem == "Presença já registrada para esta atividade"
    assert Presenca.objects.filter(
        usuario=usuario_autenticado,
        atividade=atividade_cadastrada
    ).count() == 1

@then('devo receber uma mensagem informando que já estou registrado')
def verificar_mensagem_ja_registrado(escanear_qr_novamente):
    sucesso, mensagem = escanear_qr_novamente
    assert not sucesso
    assert 'já registrada' in mensagem.lower()

@then('devo receber uma mensagem de erro sobre token não correspondente')
def verificar_mensagem_token_nao_correspondente(escanear_qr_outra_atividade):
    sucesso, mensagem = escanear_qr_outra_atividade
    assert not sucesso
    assert 'não corresponde' in mensagem.lower()