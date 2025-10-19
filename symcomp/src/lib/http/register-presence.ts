import { api } from './api'

interface RegisterPresenceRequest {
  name: string
  email: string
  token: string
  compartilhar: boolean
}

type RegisterPresenceResponse = {
  message: string
}

export default async function registerPresence({
  name,
  email,
  token,
  compartilhar,
}: RegisterPresenceRequest): Promise<RegisterPresenceResponse> {
  const data = await api.post<RegisterPresenceRequest, RegisterPresenceResponse>(
    '/atividades/registrar-presenca/',
    {
      name,
      email,
      token,
      compartilhar,
    },
    { withCredentials: false },
  )
  return data
}
