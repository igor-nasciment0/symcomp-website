import { desafio } from './desafio'

export async function sendAnswers({
  desafioId,
  answers,
}: {
  desafioId: string
  answers: Record<string, string>
}): Promise<{ status: string }> {
  try {
    const data = await desafio.post<unknown, { status: string }>(
      `/${desafioId}/respostas/salvar-em-lote/`,
      answers,
      { withCredentials: true },
    )
    return data
  } catch (error) {
    throw error
  }
}
