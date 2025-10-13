from django.db import models

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
    status = models.CharField(max_length=30, choices=StatusAtividade.choices, default=StatusAtividade.PROVISORIA)
    comeca_as = models.DateTimeField(unique=True)
    termina_as = models.DateTimeField(unique=True)
    qr_code = models.ImageField(upload_to='qr_codes', null=True, blank=True)

    def generate_qr_data(self) -> str:
        return (
            f"Atividade: {self.get_tipo_display()}\n"
            f"Status: {self.get_status_display()}\n"
            f"Início: {self.comeca_as.strftime('%d/%m/%Y %H:%M')}\n"
            f"Término: {self.termina_as.strftime('%d/%m/%Y %H:%M')}"
        )

    # def generate_qr_code(self):
    #    if not self.qr_code:
    #        qr_data = self.generate_qr_data()
    #        filename, image_file = generate_qr_code(qr_data)
    #        self.qr_code.save(filename.split('/')[-1], image_file, save=False)

    def save(self, *args, **kwargs):
        if not self.qr_code:
            self.generate_qr_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.comeca_as.strftime('%d/%m/%Y %H:%M')}"
