'use client'

import cronograma from './cronograma.json'
import { SCCarousel } from '@/components/sc-2025/carousel'
import { SCButton } from '@/components/sc-2025/button'
import { Text, TypographyH2 } from '@/components/sc-2025/typography'
import { SCWrapper, SCWrapperFooter } from '@/components/sc-2025/wrapper'
import { barlowCondensed } from '@/lib/font'
import { CalendarPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CronogramaDetail } from './cronograma-detail'

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
                    <div className="p-4 w-[340px] flex flex-col gap-4">
                      <TypographyH2 className="text-left text-2xl text-sc-2025-contrast font-semibold">
                        {a.titulo}
                      </TypographyH2>
                      <Text variant="secondary">{a.palestrante}</Text>
                    </div>
                    <SCWrapperFooter>
                      <div className="flex flex-row items-center justify-between">
                        <Dialog>
                          <DialogTrigger>
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
                          </DialogTrigger>
                          <DialogContent className="bg-[#1D1D1D] w-fit p-0 m-0 border-none flex flex-col items-center justify-center">
                            <CronogramaDetail palestra={a} />
                          </DialogContent>
                        </Dialog>
                        <div className="px-4 bg-white py-2 flex flex-row gap-4">
                          <Text
                            variant="secondary"
                            className="text-sc-2025-contrast font-bold"
                          >
                            {a.horario}
                          </Text>
                          <a
                            href={a.linkCalendar}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Adicionar ao Google Calendar"
                          >
                            <CalendarPlus color="black" />
                          </a>
                        </div>
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
