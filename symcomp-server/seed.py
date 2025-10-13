import os
from pathlib import Path
import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

User = get_user_model()

print("Seeding database...")

admin_email = os.getenv("SEEDER_ADMIN_EMAIL", "admin@symcomp.ime.usp.com")
admin_password = os.getenv(
    "SEEDER_ADMIN_PASSWORD",
    "d36efcdb53a2e3d8030a15ac0fb0317f0e5e981cf4bf1c62afdc9bd3e5f81bcf"
)

if not User.objects.filter(email=admin_email).exists():
    User.objects.create_superuser(
        email=admin_email,
        name="Presidentes",
        password=admin_password
    )

# Staff
staff_email = os.getenv("SEEDER_STAFF_EMAIL", "jonathas@symcomp.ime.usp.br")
staff_password = os.getenv("SEEDER_STAFF_PASSWORD", "jojotadinho")

if not User.objects.filter(email=staff_email).exists():
    User.objects.create_staff(
        email=staff_email,
        name="staff Castilho",
        password=staff_password,
    )
