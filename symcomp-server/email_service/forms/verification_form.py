from django import forms

class VerificationEmailForm(forms.Form):
    email = forms.EmailField(label='Destinatário')
    code = forms.CharField(label='Código de verificação', max_length=10)
