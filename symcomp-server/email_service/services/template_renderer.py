from django.template.loader import render_to_string

class TemplateRenderer:
    @staticmethod
    def render(template_name: str, context: dict) -> str:
        return render_to_string(template_name, context)
