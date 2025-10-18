from django.urls import path
from .views.verification_view import send_verification_email_view

urlpatterns = [
    path('send-verification/', send_verification_email_view, name='send_verification_email'),
]
