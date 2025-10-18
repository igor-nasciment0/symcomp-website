'use client'

import {
  Calendar,
  CalendarPlus,
  Coffee,
  Gamepad,
  LockIcon,
  Microscope,
  MonitorSmartphone,
  Sparkles,
  Store,
} from 'lucide-react'

import { SCButton } from '@/components/sc-2025/button'
import { SCCarousel } from '@/components/sc-2025/carousel'
import { Text, TypographyH2 } from '@/components/sc-2025/typography'
import { SCWrapper, SCWrapperFooter } from '@/components/sc-2025/wrapper'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { barlowCondensed } from '@/lib/font'

import cronograma from './cronograma.json'
import { CronogramaDetail } from './cronograma-detail'
import { Palestra } from '@/types/palestra'

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
              (atividade) =>
                atividade.titulo &&
                (atividade.keyWord === 'break' ? (
                  <BreakCard palestra={atividade} />
                ) : (
                  <AtividadeCard palestra={atividade} />
                )),
            )}
          </div>
        </div>
      )}
    />
  )
}

function BreakCard({ palestra }: { palestra: Palestra }) {
  return (
    <SCWrapper key={palestra.horario}>
      <div className="p-4 w-[340px] flex flex-row gap-4 items-center bg-bc-brown">
        <IconDictionary keyWord={palestra.keyWord} />
        <TypographyH2 className="text-left text-2xl text-white font-semibold">
          {palestra.titulo}
        </TypographyH2>
      </div>
      <SCWrapperFooter>
        <div className="px-4 bg-white py-2 flex flex-row gap-4 w-full">
          <Text variant="secondary" className="text-sc-2025-contrast font-bold">
            {palestra.horario}
          </Text>
        </div>
      </SCWrapperFooter>
    </SCWrapper>
  )
}

function AtividadeCard({ palestra }: { palestra: Palestra }) {
  return (
    <SCWrapper key={palestra.horario}>
      <div className="p-4 w-[340px] flex flex-row items-center gap-4">
        <IconDictionary keyWord={palestra.keyWord} />
        <div className="flex flex-col gap-4 w-[242px]">
          <TypographyH2 className="text-left text-2xl text-sc-2025-contrast font-semibold">
            {palestra.titulo}
          </TypographyH2>
          <Text variant="secondary">{palestra.palestrante}</Text>
        </div>
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
              <CronogramaDetail palestra={palestra} />
            </DialogContent>
          </Dialog>
          <div className="px-4 bg-white py-2 flex flex-row gap-4">
            <Text variant="secondary" className="text-sc-2025-contrast font-bold">
              {palestra.horario}
            </Text>
            <a
              target="_blank"
              href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=M3M5bGYzYWZzbWdwNXBiaGxlbzBmYXEwZzUgY18yOTc5YWExMmMyYjRjOGJhZTUwZjM0YTNiNGQzYWMzNGQ5NGI2YzY0MDZhZmM2N2JjMjc1NTg0ZGE3YjYzZDc3QGc&amp;tmsrc=c_2979aa12c2b4c8bae50f34a3b4d3ac34d94b6c6406afc67bc275584da7b63d77%40group.calendar.google.com"
            >
              <CalendarPlus color="black" />
            </a>
          </div>
        </div>
      </SCWrapperFooter>
    </SCWrapper>
  )
}

function IconDictionary({ keyWord }: { keyWord: string }) {
  if (keyWord === 'break')
    return (
      <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
        <Coffee color="black" />
      </div>
    )

  if (keyWord === 'games')
    return (
      <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
        <Gamepad color="black" />
      </div>
    )

  if (keyWord === 'research')
    return (
      <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
        <Microscope color="black" />
      </div>
    )

  if (keyWord === 'ai')
    return (
      <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
        <Sparkles color="black" />
      </div>
    )

  if (keyWord === 'market')
    return (
      <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
        <Store color="black" />
      </div>
    )

  if (keyWord === 'cybersecurity')
    return (
      <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
        <LockIcon color="black" />
      </div>
    )

  if (keyWord === 'systems')
    return (
      <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
        <MonitorSmartphone color="black" />
      </div>
    )

  return (
    <div className="size-[50px] flex items-center justify-center rounded-full bg-white">
      <Calendar color="black" />
    </div>
  )
}
