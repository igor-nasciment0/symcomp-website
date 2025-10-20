from django.contrib import admin, messages
from .models import Atividade
from .presenca import Presenca
import random

@admin.register(Atividade)
class AtividadeAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'status', 'comeca_as', 'termina_as')
    actions = ['sortear_presenca']

    def sortear_presenca(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, "Selecione apenas uma atividade para sortear.", level=messages.WARNING)
            return

        atividade = queryset.first()
        presencas = list(atividade.registros_presenca.all())
        if not presencas:
            self.message_user(request, "Nenhum presente encontrado nesta atividade.", level=messages.INFO)
            return

        sorteado = random.choice(presencas)
        msg = f"Sorteado: {sorteado.nome} ({sorteado.email})"
        self.message_user(request, msg, level=messages.SUCCESS)

    sortear_presenca.short_description = "Sortear um presente desta atividade"


@admin.register(Presenca)
class PresencaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'atividade', 'horario_registro')
    list_filter = ('atividade',)
