import { Jogador, Perfil, User } from '@/types/user'

import { desafio } from './desafio'

type Desafio = {
  id: string
  titulo: string
}

export async function getDesafios(): Promise<Desafio[]> {
  try {
    const data = await desafio.get<unknown, Desafio[]>('/listar/', {
      withCredentials: false,
    })
    return data
  } catch (error) {
    throw error
  }
}
