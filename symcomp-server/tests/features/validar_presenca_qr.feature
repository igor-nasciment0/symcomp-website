#language: pt

Funcionalidade: Validação de presença via QR Code
    Como um participante do evento
    Quero escanear um QR code de uma atividade
    Para registrar minha presença

    Contexto:
        Dado que existe uma atividade cadastrada
        E que sou um usuário autenticado

    Cenário: Registrar presença em atividade durante seu horário
        Dado que a atividade está acontecendo no momento
        Quando eu escanear o QR code válido da atividade
        Então minha presença deve ser registrada com sucesso
        E devo receber uma mensagem de confirmação

    Cenário: Tentar registrar presença fora do horário
        Dado que a atividade não está acontecendo no momento
        Quando eu escanear o QR code válido da atividade
        Então minha presença não deve ser registrada
        E devo receber uma mensagem de erro sobre horário inválido

    Cenário: Tentar registrar presença com QR code inválido
        Dado que a atividade está acontecendo no momento
        Quando eu escanear um QR code inválido
        Então minha presença não deve ser registrada
        E devo receber uma mensagem de erro sobre token inválido

    Cenário: Tentar registrar presença duas vezes na mesma atividade
        Dado que a atividade está acontecendo no momento
        * que já registrei presença nesta atividade
        Quando eu escanear o QR code válido da atividade novamente
        Então minha presença não deve ser registrada novamente
        E devo receber uma mensagem informando que já estou registrado

    Cenário: Tentar registrar presença com QR code de outra atividade
        Dado que existem múltiplas atividades cadastradas
        * que a atividade está acontecendo no momento
        Quando eu escanear o QR code de uma atividade diferente
        Então minha presença não deve ser registrada
        E devo receber uma mensagem de erro sobre token não correspondente