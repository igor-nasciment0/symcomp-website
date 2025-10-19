from desafio.questao.models import Questao
from desafio.jogador.models import Jogador
from desafio.resposta.models import Resposta

class ValidadorDeQuestoes:
    @staticmethod
    def validar_questao(questao: Questao, resposta: str) -> bool:
        return questao.resposta.strip().lower() == resposta.strip().lower()

# Talvez fique inutilizado
class GerenciadorDePontuacao:
    @staticmethod
    def atualizar_pontuacao(usuario, questao: Questao, resposta: str) -> bool:
        correta = ValidadorDeQuestoes.validar_questao(questao, resposta)
        if correta:
            jogador = usuario.jogador
            jogador.pontos += int(questao.valor_pontos)
            jogador.save()
        return correta

class ValidadorFormulario:
    @staticmethod
    def processar_submissao(jogador: Jogador) -> int:
        respostas_do_jogador = Resposta.objects.filter(jogador=jogador)
        pontuacao = 0
        for resposta_obj in respostas_do_jogador:
            eh_correta = ValidadorDeQuestoes.validar_questao(
                    questao=resposta_obj.questao,
                    resposta=resposta_obj.resposta
                    )

            resposta_obj.correta = eh_correta
            if eh_correta:
                pontuacao += int(resposta_obj.questao.valor_pontos)

            resposta_obj.save()

        jogador.pontos += pontuacao
        jogador.save()
        
        return pontuacao

