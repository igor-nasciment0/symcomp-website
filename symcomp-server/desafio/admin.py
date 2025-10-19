from django.contrib import admin
from .models import Desafio
from .questao.models import Questao
from .jogador.models import Jogador
from .resposta.models import Resposta

@admin.register(Desafio)
class DesafioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'factory_type', 'factory_display')

    def factory_display(self, obj):
        try:
            return str(obj.factory)
        except Exception:
            return "Factory não disponível"

    factory_display.short_description = "Fábrica"

admin.site.register(Questao)
admin.site.register(Jogador)
admin.site.register(Resposta)
