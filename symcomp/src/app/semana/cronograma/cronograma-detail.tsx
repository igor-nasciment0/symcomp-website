import { TabsContent } from '@radix-ui/react-tabs'
import { SCButton } from '@/components/sc-2025/button'
import { Text, TypographyH2 } from '@/components/sc-2025/typography'
import { SCWrapper } from '@/components/sc-2025/wrapper'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palestra } from '@/types/palestra'

interface CronogramaDetailProps {
  palestra: Palestra
}

export function CronogramaDetail({ palestra }: CronogramaDetailProps) {
  const { start, end } = parseHorarioToICS(palestra)

  const googleCalendarUrl = new URL('https://www.google.com/calendar/render')
  googleCalendarUrl.searchParams.set('action', 'TEMPLATE')
  googleCalendarUrl.searchParams.set('text', palestra.titulo || '')
  googleCalendarUrl.searchParams.set('details', palestra.descricao || '')
  googleCalendarUrl.searchParams.set('dates', `${start}/${end}`)

  return (
    <SCWrapper>
      <div className="bg-[#1D1D1D] max-w-[300px] flex flex-col items-center max-h-[600px]">
        <div className="p-4 mb-8">
          <TypographyH2 className="text-left font-bold text-2xl text-white">
            {palestra.titulo}
          </TypographyH2>
          <TypographyH2 className="text-left text-sc-2025-secondary font-bold">
            {palestra.palestrante}
          </TypographyH2>
        </div>
        <Tabs defaultValue="palestra">
          <TabsList className="w-full rounded-none border-y-8 bg-[#1D1D1D] p-0 border-white flex flex-row justify-around">
            <TabsTrigger
              value="palestra"
              className="p-0 m-0 data-[state=active]:bg-sc-2025-secondary text-sc-2025-secondary data-[state=active]:!text-white -z-0 w-full"
            >
              <TypographyH2 variant="secondary" className="font-bold">
                PALESTRA
              </TypographyH2>
            </TabsTrigger>
            <TabsTrigger
              value="palestrante"
              className="p-0 m-0 data-[state=active]:bg-sc-2025-secondary text-sc-2025-secondary data-[state=active]:text-white -z-0 w-full h-full"
            >
              <TypographyH2 variant="secondary" className="font-bold">
                PALESTRANTE
              </TypographyH2>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="palestra" className="p-4 max-h-[200px] overflow-y-scroll">
            <Text variant="secondary" className="text-lg text-white">
              {palestra.descricao}
            </Text>
          </TabsContent>
          <TabsContent
            value="palestrante"
            className="p-4 max-h-[200px] overflow-y-scroll"
          >
            <Text variant="secondary" className="text-lg text-white">
              {palestra.sobre}
            </Text>
          </TabsContent>
        </Tabs>

        <a href={googleCalendarUrl.toString()} target="_blank" rel="noopener noreferrer">
          <SCButton className="scale-75 mt-2">Salvar na agenda</SCButton>
        </a>
      </div>
    </SCWrapper>
  )
}

function parseHorarioToICS(palestra: Palestra) {
  const dias = {
    SEG: '2025-10-20',
    TER: '2025-10-21',
    QUA: '2025-10-22',
    QUI: '2025-10-23',
    SEX: '2025-10-24',
  }

  const baseDateStr = dias[palestra.data] || '2025-10-20'
  const [startStr, endStr] = palestra.horario.split('-').map((s) => s.trim())

  function toICSDate(dateStr: string, timeStr: string) {
    const [hour, minute] = timeStr.split(':').map(Number)
    const d = new Date(
      `${dateStr}T${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}:00`,
    )
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  return {
    start: toICSDate(baseDateStr, startStr),
    end: toICSDate(baseDateStr, endStr),
  }
}
