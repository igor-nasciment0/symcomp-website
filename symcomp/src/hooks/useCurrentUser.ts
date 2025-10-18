import { AuthenticationError } from '@/lib/errors'
import { api } from '@/lib/http/api'
import { Jogador, Perfil, User } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

interface MeResponse {
  user: User
  perfil: Perfil
  jogador: Jogador | null
}

async function fetchCurrentUser(): Promise<MeResponse> {
  try {
    const data = await api.get<unknown, MeResponse>('/me/', {
      withCredentials: true,
    })
    return data
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new AuthenticationError()
    }
    throw error
  }
}

export function useCurrentUser() {
  return useQuery<MeResponse>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
  })
}
