from django.db import models
from .username.models import Daname
from django.db import transaction

class Desafio(models.Model):
    FACTORY_CHOICES = [
        ("daname", "DanameFactory"),
    ]

    titulo = models.CharField(max_length=255)
    factory_type = models.CharField(max_length=50, choices=FACTORY_CHOICES, null=True, blank=True)

    def busca_username_disponivel(self):
        with transaction.atomic():
            available = Daname.objects.select_for_update().filter(is_available=True).first()
            
            if not available:
                return None

            available.is_available = False
            available.save(update_fields=["is_available"])
            return available.nickname


    def __str__(self):
        return self.titulo
