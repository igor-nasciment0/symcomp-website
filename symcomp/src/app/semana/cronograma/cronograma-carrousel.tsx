'use client'

import cronograma from './cronograma.json'
import { SCCarousel } from '@/components/sc-2025/carousel'
import { SCButton } from '@/components/sc-2025/button'
import { Text, TypographyH1, TypographyH2 } from '@/components/sc-2025/typography'
import { SCWrapper, SCWrapperFooter } from '@/components/sc-2025/wrapper'
import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { barlowCondensed } from '@/lib/font'

export function CronogramaCarousel() {
  return (
    <SCCarousel
      items={cronograma}
      renderItem={(dia) => (
        <div className="flex flex-col items-center">
          <SCButton className="px-[32px] py-[24px] mb-2">{dia.name}</SCButton>
          <Text className="text-sc-2025-contrast text-2xl">{dia.date}</Text>

          <div className="mt-4 flex flex-col gap-4">
            {dia.atividades.map(
              (a) =>
                a.titulo && (
                  <SCWrapper key={a.horario}>
                    <div className="p-4 w-[340px]">
                      <TypographyH2 className="text-left text-xl text-sc-2025-contrast font-semibold">
                        {a.titulo}
                      </TypographyH2>
                      <Text variant="secondary">{a.palestrante}</Text>
                    </div>
                    <SCWrapperFooter>
                      <div className="flex flex-row items-center justify-between">
                        <SCButton className="bg-transparent p-2">
                          <div className="flex flex-row gap-4 items-center">
                            <Text
                              variant="secondary"
                              className={`text-lg text-white font-semibold ${barlowCondensed.className} hover:text-black`}
                            >
                              SABER MAIS +
                            </Text>
                          </div>
                        </SCButton>
                        <Text
                          variant="secondary"
                          className="bg-white font-bold px-4 text-sc-2025-contrast py-2"
                        >
                          {a.horario}
                        </Text>
                      </div>
                    </SCWrapperFooter>
                  </SCWrapper>
                ),
            )}
          </div>
        </div>
      )}
    />
  )
}
