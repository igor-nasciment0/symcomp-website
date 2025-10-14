# language: pt
Funcionalidade: Ranking do Desafio
	Cenário: Obter o ranking de um desafio com vários jogadores
		Dado que o usuário está autenticado
		* existe um desafio
		* existem vários jogadores inscritos neste desafio com diferentes pontuações 
		Quando o usuário solicita o ranking para esse desafio 
		Então a resposta deve ser bem-sucedida
		* resposta deve conter uma lista com os 10 melhores jogadores
		* lista de jogadores deve estar ordenada por pontuação de forma decrescente
