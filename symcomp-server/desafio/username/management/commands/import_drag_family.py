import csv
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from desafio.username.models import Mother, Daname


class Command(BaseCommand):
    help = "Importa dados das mothers e daughters a partir dos CSVs."

    def handle(self, *args, **options):
        base_path = os.path.join(settings.BASE_DIR, "desafio", "username")

        mothers_csv = os.path.join(base_path, "mothers.csv")
        danames_csv = os.path.join(base_path, "danames.csv")

        # --- importa momes ---
        self.stdout.write("Importando Mothers...")
        with open(mothers_csv, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            Mother.objects.all().delete()
            for row in reader:
                Mother.objects.create(
                    first_name=row["first_name"],
                    last_name=row["last_name"],
                    description=row["description"],
                )
        self.stdout.write(self.style.SUCCESS("Mothers importadas com sucesso!"))

        # --- importa danames ---
        self.stdout.write("Importando Danames...")
        with open(danames_csv, encoding="utf-8") as f:
            reader = csv.DictReader(f)
            Daname.objects.all().delete()
            for row in reader:
                Daname.objects.create(
                    nickname=row["nickname"],
                    first_mome_full_name=row["first_mome_full_name"],
                    last_mome_full_name=row["last_mome_full_name"],
                )
        self.stdout.write(self.style.SUCCESS("Danames importadas com sucesso!"))
