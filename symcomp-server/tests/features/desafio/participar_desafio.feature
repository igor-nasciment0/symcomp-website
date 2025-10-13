#language: pt

Funcionalidade: Participar do desafio
    Cenário: Usuário cadastrado aceita o desafio
        Dado que o usuário está cadastrado
        * existe um desafio
        * existem nicknames possíveis registrados
        Quando ele aceita o desafio
        Então ele deve receber um nickname da lista
        E ter pontuação 0