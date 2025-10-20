import { SCButton } from '@/components/sc-2025/button'
import { getDesafios } from '@/lib/http/get-desafios'
import joinDesafio from '@/lib/http/join-desafio'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function AceitarDesafioButton() {
  const router = useRouter()
  const { data } = useQuery({
    queryFn: getDesafios,
    queryKey: ['desafio-list'],
  })

  const { mutate, isPending } = useMutation({
    mutationFn: joinDesafio,
    onSuccess: () => router.refresh(),
  })

  return (
    <div>
      {data &&
        data.map((desafio) => (
          <SCButton
            disabled={isPending}
            key={desafio.id}
            onClick={() => mutate({ desafioId: desafio.id })}
          >
            Aceitar desafio
          </SCButton>
        ))}
    </div>
  )
}
