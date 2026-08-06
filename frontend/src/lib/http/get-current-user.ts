import { Jogador, Perfil, User } from '@/types/user'

import { api } from './api'

interface MeResponse {
  user: User
  perfil: Perfil
  jogador: Jogador | null
}

export async function getCurrentUser(): Promise<MeResponse> {
  try {
    const data = await api.get<unknown, MeResponse>('/me/')
    return data
  } catch (error) {
    throw error
  }
}
