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
import { Palestra } from '@/types/palestra'

import cronograma from './cronograma.json'
import { CronogramaDetail, parseHorarioToICS } from './cronograma-detail'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ColoredAvatarFallback } from './colored-avatar-fallback'

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
                  <BreakCard palestra={atividade as Palestra} />
                ) : (
                  <AtividadeCard palestra={atividade as Palestra} />
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
  const { start, end } = parseHorarioToICS(palestra)

  const googleCalendarUrl = new URL('https://www.google.com/calendar/render')
  googleCalendarUrl.searchParams.set('action', 'TEMPLATE')
  googleCalendarUrl.searchParams.set('text', palestra.titulo || '')
  googleCalendarUrl.searchParams.set('details', palestra.descricao || '')
  googleCalendarUrl.searchParams.set('dates', `${start}/${end}`)

  const palestrantes = palestra.palestrante?.split(',')

  return (
    <SCWrapper key={palestra.horario}>
      <div className="p-4 w-[340px] flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4 ">
          <IconDictionary keyWord={palestra.keyWord} />
          <TypographyH2 className="text-left text-2xl text-sc-2025-contrast font-semibold w-[242px]">
            {palestra.titulo}
          </TypographyH2>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            {palestrantes?.map((palestrante) => (
              <Avatar className="size-[30px]" key={palestrante}>
                <ColoredAvatarFallback nome={palestrante} />
              </Avatar>
            ))}
          </div>
          <Text variant="secondary" className="w-[242px]">
            {palestra.palestrante}
          </Text>
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
              href={googleCalendarUrl.toString()}
              target="_blank"
              rel="noopener noreferrer"
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
