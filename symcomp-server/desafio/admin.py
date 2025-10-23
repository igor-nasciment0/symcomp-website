from django.contrib import admin
from django.db import transaction
from .models import Desafio
from .questao.models import Questao
from .jogador.models import Jogador
from .resposta.models import Resposta
from .atividade_pontos.models import AtividadePontos


@admin.register(Desafio)
class DesafioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'factory_type', 'factory_display')

    def factory_display(self, obj):
        try:
            return str(obj.factory)
        except Exception:
            return "Factory não disponível"

    factory_display.short_description = "Fábrica"


@admin.action(description="Reatribuir usernames sequencialmente")
def reassign_usernames(modeladmin, request, queryset):
    """
    Reatribui usernames aos jogadores selecionados (ou todos, se desejado),
    usando a ordem do banco de dados.
    """
    jogadores = queryset.order_by('user_id')

    desafios = {}
    for jogador in jogadores:
        if jogador.desafio_id not in desafios:
            desafios[jogador.desafio_id] = jogador.desafio

    with transaction.atomic():
        for jogador in jogadores:
            desafio = desafios.get(jogador.desafio_id)
            try:
                username = desafio.busca_username_disponivel()
            except ValueError:
                username = f"fallback_{jogador.user.id}"
            jogador.username = username
            jogador.save()

    modeladmin.message_user(
        request,
        f"{len(jogadores)} usernames reatribuídos com sucesso."
    )


@admin.register(Jogador)
class JogadorAdmin(admin.ModelAdmin):
    list_display = ('user', 'username', 'desafio', 'pontos')
    actions = [reassign_usernames]


admin.site.register(Questao)
admin.site.register(Resposta)
admin.site.register(AtividadePontos)
