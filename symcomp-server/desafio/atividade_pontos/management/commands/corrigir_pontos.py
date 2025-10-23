from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from datetime import datetime, timedelta

from atividade.models import Atividade, TipoAtividade
from desafio.atividade_pontos.models import AtividadePontos
from atividade.presenca import Presenca
from desafio.jogador.models import Jogador


class Command(BaseCommand):
    help = "Corrige a pontuação de jogadores que participaram das palestras em 2025-10-20 e 2025-10-21."

    def handle(self, *args, **options):
        User = get_user_model()

        # Datas de segunda e terça
        dias = [datetime(2025, 10, 20), datetime(2025, 10, 21)]

        # Define intervalo de 00:00 até 23:59 para cada dia
        def dia_intervalo(d):
            inicio = datetime(d.year, d.month, d.day, 0, 0, 0)
            fim = inicio + timedelta(days=1)
            return (inicio, fim)

        atividades_alvo = []
        for d in dias:
            inicio, fim = dia_intervalo(d)
            atividades_dia = Atividade.objects.filter(
                tipo=TipoAtividade.PALESTRA,
                comeca_as__gte=inicio,
                comeca_as__lt=fim,
            )
            atividades_alvo.extend(atividades_dia)

        if not atividades_alvo:
            self.stdout.write(self.style.WARNING("Nenhuma palestra encontrada nas datas especificadas."))
            return

        total_jogadores_pontuados = 0
        total_pontos = 0

        with transaction.atomic():
            for atividade in atividades_alvo:
                try:
                    pontos_atividade = atividade.pontos.valor
                except AtividadePontos.DoesNotExist:
                    self.stdout.write(self.style.WARNING(f"Atividade sem relação de pontos: {atividade.titulo}"))
                    continue

                presencas = Presenca.objects.filter(atividade=atividade)
                for presenca in presencas:
                    user = User.objects.filter(email__iexact=presenca.email).first()
                    if not user:
                        continue  # presença não é usuário

                    jogador = getattr(user, "jogador", None)
                    if not jogador:
                        continue  # usuário não é jogador

                    jogador.pontos += pontos_atividade
                    jogador.save()
                    total_jogadores_pontuados += 1
                    total_pontos += pontos_atividade

        self.stdout.write(
            self.style.SUCCESS(
                f"Correção concluída. {total_jogadores_pontuados} jogadores receberam pontos "
                f"(total de {total_pontos} pontos adicionados)."
            )
        )
