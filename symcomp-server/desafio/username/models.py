from django.db import models
from django.conf import settings


class Mother(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    description = models.CharField(max_length=1024)
    full_name = models.CharField(max_length=201, editable=False)

    def save(self, *args, **kwargs):
        self.full_name = f"{self.first_name} {self.last_name}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name


class Daname(models.Model):
    nickname = models.CharField(max_length=255)
    first_mome_full_name = models.CharField(max_length=255)
    last_mome_full_name = models.CharField(max_length=255)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.nickname


class DanameFactory(models.Model):
    """Fábrica de usernames Daname, exclusiva para um desafio."""
    danames = models.ManyToManyField(Daname, related_name="factories")

    def generate_username(self):
        """Atribui ao usuário um username disponível e marca como usado."""
        available = self.danames.filter(is_available=True).first()
        if not available:
            raise ValueError("Nenhum Daname disponível nesta fábrica.")

        available.is_available = False
        available.save(update_fields=["is_available"])
        return available.nickname

    def __str__(self):
        return f"{self.id}"