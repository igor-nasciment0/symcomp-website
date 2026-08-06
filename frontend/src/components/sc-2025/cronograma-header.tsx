'use client'

import { SCButton } from './button'
import { SCCarousel } from './carousel'
import { Text } from './typography'

export function CronogramaHeader() {
  const diasSemana = [
    { name: 'Segunda', date: '20/10' },
    { name: 'Terça', date: '21/10' },
    { name: 'Quarta', date: '22/10' },
    { name: 'Quinta', date: '23/10' },
    { name: 'Sexta', date: '24/10' },
  ]

  return (
    <SCCarousel
      items={diasSemana}
      className="w-fit"
      renderItem={(dia) => (
        <div className="flex flex-col items-center justify-center">
          <SCButton className="px-[32px] py-[24px] mb-2">{dia.name}</SCButton>
          <Text className="text-sc-2025-contrast text-2xl">{dia.date}</Text>
        </div>
      )}
    />
  )
}
