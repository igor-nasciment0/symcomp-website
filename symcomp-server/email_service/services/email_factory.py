from .template_renderer import TemplateRenderer

class EmailFactory:
    def __init__(self, renderer=None):
        self.renderer = renderer or TemplateRenderer()

    def create_verification_email(self, code: str, to_email: str):
        subject = "Código de verificação"
        html = self.renderer.render(
            "email_service/emails/verification_template.html",
            {"code": code}
        )
        return {
            "subject": subject,
            "html": html,
            "to_email": to_email
        }
