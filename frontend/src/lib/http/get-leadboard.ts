import { Question } from '@/types/question'

import { desafio } from './desafio'

export type Rank = {
  username: string
  pontos: number
}

export async function getLeadboard({
  desafioId,
}: {
  desafioId: string
}): Promise<Rank[]> {
  try {
    const data = await desafio.get<unknown, Rank[]>(`/${desafioId}/ranking/`, {
      withCredentials: false,
    })
    return data
  } catch (error) {
    throw error
  }
}
