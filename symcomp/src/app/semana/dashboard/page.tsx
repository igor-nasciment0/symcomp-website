'use client'

import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Text } from '@/components/sc-2025/typography'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { semanaValidar } from '@/lib/routes'
import { slugfy } from '@/lib/utils'
import { Jogador, User } from '@/types/user'

import { divas } from '../divas/[lastNameSlug]/divas'
import SemanaHeader from '../header'
import { AceitarDesafioButton } from './aceitar-desafio-button'

export default function UserDashboard() {
  const { data } = useCurrentUser()
  const router = useRouter()

  if (typeof window !== 'undefined' && !data?.user?.eh_verificado) {
    router.push(semanaValidar)
    return null
  }

  return (
    <div className="flex-1 bg-sc-2025-contrast w-full flex flex-col h-full">
      <SemanaHeader />
      <div className="p-4">
        {data && data.jogador ? (
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row">
              <Text className="text-2xl">
                Username:{' '}
                <strong className="text-sc-2025-background">
                  {data.jogador.username}
                </strong>
              </Text>
            </div>
            <div className="flex flex-row">
              <Text className="text-sm opacity-30">
                <UserLabel user={data.user} jogador={data.jogador} />
                usr stats
              </Text>
            </div>
            <div className="flex flex-row text-4xl">
              <Text>Score: {data.jogador.pontos}</Text>
            </div>
            <div className="flex flex-row">
              <Text className="text-sm opacity-30">
                <UserLabel user={data.user} jogador={data.jogador} /> cd ./quem-sou-eu
              </Text>
            </div>
            <div className="flex flex-row">
              <Text className="text-sm opacity-30">
                <UserLabel user={data.user} jogador={data.jogador} dir="/quem-eu-sou" />{' '}
                ls
              </Text>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col">
                {divas
                  .filter((diva) => {
                    const username = data.jogador?.username?.toLowerCase() ?? ''
                    const nameParts = diva.fullName.toLowerCase().split(' ')
                    return nameParts.some((part) => username.includes(part))
                  })
                  .map((diva) => (
                    <Link
                      href={`/semana/divas/${slugfy(diva.lastName)}`}
                      className="flex flex-row items-center gap-4"
                      key={diva.lastName}
                    >
                      <Text key={diva.fullName}>{diva.fullName}</Text>
                      <ExternalLink size={16} />
                    </Link>
                  ))}
              </div>
            </div>
            <div className="flex flex-row">
              <Text className="text-sm opacity-30">
                <UserLabel user={data.user} jogador={data.jogador} dir="/quem-eu-sou" />
                {` `}
              </Text>
            </div>
            <div className="h-[24px] w-[10px] bg-white animate-blink-fast" />
          </div>
        ) : (
          <AceitarDesafioButton />
        )}
      </div>
    </div>
  )
}

export function UserLabel({
  user,
  jogador,
  dir,
}: {
  user: User
  jogador: Jogador
  dir?: string
}) {
  const nome = user?.name?.split(' ')[0] ?? 'user'
  const username = jogador?.username ?? 'anon'
  return (
    <>
      {nome}@<strong className="text-sc-2025-background text-sm">{username}</strong>
      {`:~${dir || ''}$ `}
    </>
  )
}
