import { Jogador, User } from '@/types/user'

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
