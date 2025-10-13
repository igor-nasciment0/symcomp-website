#language: pt

Funcionalidade: Obtem certificado de atividade
    Cenário: Alguém não autenticado obtem certificado de uma palestra
        Dado que existe uma palestra
        * um link para gerar o certificado
        * este link está aceitando respostas
        E o usuário não está autenticado
        Quando ele acessa o link 
        E preenche corretamente suas informações para receber o certificado
        Então ele deve receber uma notificação que registrou sua presença por email

    Cenário: Ao final 
        
