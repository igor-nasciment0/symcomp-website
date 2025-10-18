from django.shortcuts import render
from ..forms.verification_form import VerificationEmailForm
from ..services.email_sender import EmailSender
from ..services.email_factory import EmailFactory

def send_verification_email_view(request):
    if request.method == 'POST':
        form = VerificationEmailForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            code = form.cleaned_data['code']

            factory = EmailFactory()
            sender = EmailSender()

            email_data = factory.create_verification_email(code, email)
            sender.send(email_data['subject'], email_data['html'], email_data['to_email'])

            return render(request, 'email_service/forms/verification_form.html', {
                'form': form,
                'success': f"Email de verificação enviado para {email}."
            })
    else:
        form = VerificationEmailForm()

    return render(request, 'email_service/forms/verification_form.html', {'form': form})
