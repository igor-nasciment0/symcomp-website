#language: pt

Funcionalidade: Lista todas palestras
    Cenário: Usuário acessa o cronograma no dia 20
        Dado que existe pelo menos um palestrante
        E pelo menos uma palestra diferente por dia da semana foi registrada com palestrante
        Quando o usuário acessa a página principal do cronograma
        Então ele deve receber a lista de palestras do dia

    Cenário: usuário acesso o crongorama e quer ver as palestras do dia 21
        Dado que existe pelo menos um palestrante
        E pelo menos uma palestra diferente por dia da semana foi registrada com palestrante
        Quando o usuário acessa a página principal do cronograma
        E troca para um dia específico
        Então ele deve receber a lista de palestras do dia selecionado
        
