import { Question } from '@/types/question'
import { desafio } from './desafio'

export async function getQuestions({
  desafioId,
}: {
  desafioId: string
}): Promise<Question[]> {
  try {
    const data = await desafio.get<unknown, Question[]>(`/${desafioId}/questoes/`, {
      withCredentials: true,
    })
    return data
  } catch (error) {
    throw error
  }
}
