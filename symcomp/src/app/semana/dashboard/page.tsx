'use client'

import { Text } from '@/components/sc-2025/typography'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { semanaValidar } from '@/lib/routes'
import { useRouter } from 'next/navigation'

export default function UserDashboard() {
  const { data } = useCurrentUser()
  const route = useRouter()

  if (!data?.user.eh_verificado) {
    route.push(semanaValidar)
  }

  return (
    <div className="flex-1 bg-sc-2025-background w-full h-full">
      <div className="flex flex-col gap-4">
        <Text>{data?.jogador?.username}</Text>
        <Text>{data?.jogador?.pontos}</Text>
      </div>
    </div>
  )
}
