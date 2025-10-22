'use client'

import { Text, TypographyH1 } from '@/components/sc-2025/typography'
import SemanaHeader from '../header'
import { getDesafios } from '@/lib/http/get-desafios'
import { getLeadboard } from '@/lib/http/get-leadboard'
import { useQuery } from '@tanstack/react-query'

export default function LeadboardPage() {
  const { data: desafios, isLoading: desafiosLoading } = useQuery({
    queryKey: ['desafio-list'],
    queryFn: getDesafios,
  })

  const primeiroDesafioId = desafios?.[0]?.id

  const { data: ranking, isLoading: rankingLoading } = useQuery({
    queryKey: ['ranking', primeiroDesafioId],
    queryFn: () => getLeadboard({ desafioId: primeiroDesafioId || '1' }),
    enabled: !!primeiroDesafioId,
  })

  if (desafiosLoading || rankingLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Text className="text-black">Carregando...</Text>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-symcomp-secondary w-full flex flex-col h-full">
      <SemanaHeader />
      <div className="p-4 flex flex-col items-center flex-1 w-full h-full justify-center gap-8">
        <TypographyH1>Top 10 no desafio da semana</TypographyH1>
        <div className="flex flex-col gap-4">
          {ranking
            ?.sort((a, b) => b.pontos - a.pontos)
            ?.slice(0, 10)
            ?.map((rank, index) => (
              <div key={rank.username} className="w-[300px] bg-symcomp-primary p-4">
                <div className="flex flex-row justify-between">
                  <Text>
                    {index + 1}. {rank.username}
                  </Text>
                  <Text>{rank.pontos}</Text>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
