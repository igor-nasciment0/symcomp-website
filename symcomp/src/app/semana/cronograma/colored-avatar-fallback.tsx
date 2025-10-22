import { AvatarFallback } from '@/components/ui/avatar'

const cores = [
  'bg-sc-2025-primary',
  'bg-sc-2025-tertiary',
  'bg-sc-2025-background',
  'bg-sc-2025-contrast',
]

function hashString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export function ColoredAvatarFallback({ nome }: { nome: string }) {
  const partes = nome.trim().split(/\s+/)
  const iniciais =
    partes.length > 1 ? partes[0][0] + partes[partes.length - 1][0] : partes[0][0]

  const cor = cores[hashString(nome) % cores.length]

  return (
    <AvatarFallback className={`${cor} text-white`}>
      {iniciais.toUpperCase()}
    </AvatarFallback>
  )
}
