import { TabsContent } from '@radix-ui/react-tabs'
import { Link } from 'lucide-react'

import { SCButton } from '@/components/sc-2025/button'
import { Text, TypographyH2 } from '@/components/sc-2025/typography'
import { SCWrapper } from '@/components/sc-2025/wrapper'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palestra } from '@/types/palestra'

interface PatrocinadoresDetailProps {
  palestra: Palestra
}

export function PatrocinadoresDetail({ palestra }: PatrocinadoresDetailProps) {
  const { start, end } = parseHorarioToICS(palestra)

  const googleCalendarUrl = new URL('https://www.google.com/calendar/render')
  googleCalendarUrl.searchParams.set('action', 'TEMPLATE')
  googleCalendarUrl.searchParams.set('text', palestra.titulo || '')
  googleCalendarUrl.searchParams.set('details', palestra.descricao || '')
  googleCalendarUrl.searchParams.set('dates', `${start}/${end}`)

  const fotoUrl = palestra.foto ? `/sc-2025/patrocinadores/${palestra.foto}` : ''
  const sponsorName = (palestra as any).sponsorName || ''
  const horarioFormatado = palestra.horario.replace(/:/g, 'h').substring(0, 5)

  return (
    <SCWrapper>
      <div className="bg-[#1D1D1D] max-w-[300px] flex flex-col items-center max-h-[600px]">
        <div className="p-4 mb-8 flex flex-row items-center gap-4 w-full">
          {fotoUrl && (
            <div className="w-20 h-20 bg-black p-1 flex-shrink-0 border-8 border-white rounded-none">
              <img src={fotoUrl} alt="Foto" className="w-full h-full object-contain" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <Text className="text-left font-bold text-xl text-white break-words">
              {sponsorName}
            </Text>
            {palestra.contato && (
              <a
                href={palestra.contato}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center gap-2 bg-sc-2025-tertiary text-white px-3 py-1 w-fit rounded-none"
              >
                <Link className="h-4 w-4" />
                <Text className="font-bold text-sm">SITE</Text>
              </a>
            )}
          </div>
        </div>
        <Tabs defaultValue="palestra" className="w-full">
          <TabsList className="w-full rounded-none border-y-8 bg-[#1D1D1D] p-0 border-white flex flex-row justify-around">
            <TabsTrigger
              value="palestra"
              className="p-0 m-0 data-[state=active]:bg-sc-2025-tertiary text-sc-2025-tertiary data-[state=active]:!text-white -z-0 w-full"
            >
              <TypographyH2 variant="secondary" className="font-bold">
                PALESTRA
              </TypographyH2>
            </TabsTrigger>
            <TabsTrigger
              value="palestrante"
              className="p-0 m-0 data-[state=active]:bg-sc-2025-tertiary text-sc-2025-tertiary data-[state=active]:!text-white -z-0 w-full"
            >
              <TypographyH2 variant="secondary" className="font-bold">
                PALESTRANTE
              </TypographyH2>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="palestra"
            className="p-4 max-h-[200px] overflow-y-auto flex flex-col"
          >
            <TypographyH2 className="text-left font-bold text-xl text-white mb-2 break-words">
              {palestra.titulo}
            </TypographyH2>
            <TypographyH2 className="text-left text-sc-2025-tertiary mb-2 break-words">
              {palestra.data} às {horarioFormatado}
            </TypographyH2>
            <Text variant="secondary" className="text-lg text-white break-words">
              {palestra.descricao}
            </Text>
            <a
              href={googleCalendarUrl.toString()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center mt-2"
            >
              <SCButton className="scale-75">Salvar na agenda</SCButton>
            </a>
          </TabsContent>

          <TabsContent
            value="palestrante"
            className="p-4 max-h-[200px] overflow-y-auto flex flex-col"
          >
            <TypographyH2 className="text-left text-sc-2025-tertiary font-bold mb-2 break-words">
              {palestra.palestrante}
            </TypographyH2>
            <Text variant="secondary" className="text-lg text-white break-words">
              {palestra.sobre}
            </Text>
          </TabsContent>
        </Tabs>
      </div>
    </SCWrapper>
  )
}

export function parseHorarioToICS(palestra: Palestra) {
  const dias = {
    SEG: '2025-10-20',
    TER: '2025-10-21',
    QUA: '2025-10-22',
    QUI: '2025-10-23',
    SEX: '2025-10-24',
  }

  const baseDateStr = dias[palestra.data as keyof typeof dias] || '2025-10-20'
  const [startStr, endStr] = palestra.horario.split('-').map((s) => s.trim())

  function toICSDate(dateStr: string, timeStr: string) {
    const [hour, minute] = timeStr.split(':').map(Number)
    const d = new Date(
      `${dateStr}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`,
    )
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  return {
    start: toICSDate(baseDateStr, startStr),
    end: toICSDate(baseDateStr, endStr),
  }
}
