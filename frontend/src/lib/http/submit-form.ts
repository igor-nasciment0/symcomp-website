import { desafio } from './desafio'

export async function submitForm({ desafioId }: { desafioId: string }) {
  const data = await desafio.post<unknown, { status: string; pontuacao_final?: number }>(
    `/${desafioId}/submeter/`,
    {},
    { withCredentials: true },
  )
  return data
}
