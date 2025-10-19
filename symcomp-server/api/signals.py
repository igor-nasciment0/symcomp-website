from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.crypto import get_random_string
from .models import User, PerfilUsuario, DesignacaoDePapel, Papel, EmailVerificationCode
from email_service.services.email_sender import EmailSender
from email_service.services.email_factory import EmailFactory

            
@receiver(post_save, sender=User)
def send_verification_code(sender, instance, created, **kwargs):
    if created and not instance.eh_verificado:
        code = get_random_string(length=6, allowed_chars='0123456789')

        EmailVerificationCode.objects.create(user=instance, code=code)

        factory = EmailFactory()
        email_data = factory.create_verification_email(code, instance.email)

        sender = EmailSender()
        sender.send(
            subject=email_data["subject"],
            html=email_data["html"],
            to_email=email_data["to_email"]
        )

