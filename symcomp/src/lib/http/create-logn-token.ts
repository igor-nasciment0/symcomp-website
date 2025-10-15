import { CreateReadStreamOptions } from 'fs/promises'

import { api } from './api'

interface CreateLoginTokenRequest {
  email: string
  password: string
}

type CreateLoginTokenResponse = {
  message: string
}

export default async function CreateLoginToken({
  email,
  password,
}: CreateLoginTokenRequest): Promise<CreateLoginTokenResponse> {
  const data = await api.post<CreateReadStreamOptions, CreateLoginTokenResponse>(
    '/token/',
    { email, password },
  )
  return data
}
