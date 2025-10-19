import { getCurrentUser } from '@/lib/http/get-current-user'
import { useQuery } from '@tanstack/react-query'

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  })
}
