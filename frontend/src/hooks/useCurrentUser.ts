import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '@/lib/http/get-current-user'

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  })
}
