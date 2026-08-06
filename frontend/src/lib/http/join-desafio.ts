import { desafio } from './desafio'

interface joinDesafioRequest {
  desafioId: string
}

type joinDesafioResponse = {
  message: string
}

export default async function joinDesafio({
  desafioId,
}: joinDesafioRequest): Promise<joinDesafioResponse> {
  const data = await desafio.post<joinDesafioRequest, joinDesafioResponse>(
    `/${desafioId}/join/`,
    {},
  )
  return data
}
