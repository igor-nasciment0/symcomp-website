from django.db import models
from django.conf import settings
from rest_framework_simplejwt.tokens import Token
import uuid
import jwt  # PyJWT
from datetime import datetime
from api.lib.qr_code_generator import generate_qr_code


class StatusAtividade(models.TextChoices):
    PROVISORIA = 'provisoria'
    CONFIRMADA = 'confirmada'


class TipoAtividade(models.TextChoices):
    PALESTRA = 'palestra'
    ENCERRAMENTO = 'encerramento'
    CONVERSA = 'conversa'
    COFFEE_BREAK = 'coffee_break'


class Atividade(models.Model):
    tipo = models.CharField(max_length=30, choices=TipoAtividade.choices)
    titulo = models.CharField(max_length=255, default="")
    status = models.CharField(max_length=30, choices=StatusAtividade.choices, default=StatusAtividade.PROVISORIA)
    comeca_as = models.DateTimeField(unique=True)
    termina_as = models.DateTimeField(unique=True)
    qr_code = models.ImageField(upload_to='qr_codes', null=True, blank=True)
    uid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    token = models.CharField(max_length=512, default="", null=True, blank=True)

    def _generate_signed_token(self) -> str:
        payload = {
            "uid": str(self.uid),
            "type": "qr_presence",
            "iat": int(datetime.utcnow().timestamp()),  # apenas para registro, não expira
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
        self.token = token
        return token

    def generate_qr_data(self) -> str:
        return self._generate_signed_token()

    def generate_qr_code(self):
        if not self.qr_code:
            qr_data = self.generate_qr_data()
            filename, image_file = generate_qr_code(qr_data)
            self.qr_code.save(filename.split('/')[-1], image_file, save=False)

    def save(self, *args, **kwargs):
        if not self.qr_code:
            self.generate_qr_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.titulo} - {self.comeca_as.strftime('%d/%m/%Y %H:%M')}"
