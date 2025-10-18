import { CreateReadStreamOptions } from 'fs/promises'

import { api } from './api'

interface createLoginTokenRequest {
  email: string
  password: string
}

type createLoginTokenResponse = {
  message: string
}

export default async function createLoginToken({
  email,
  password,
}: createLoginTokenRequest): Promise<createLoginTokenResponse> {
  const data = await api.post<CreateReadStreamOptions, createLoginTokenResponse>(
    '/token/',
    { email, password },
  )
  return data
}
