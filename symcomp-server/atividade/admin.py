from django.contrib import admin
from .models import Atividade
from .presenca import Presenca

admin.site.register(Atividade)
admin.site.register(Presenca)