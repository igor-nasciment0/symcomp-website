import { SCButton } from '@/components/sc-2025/button'
import { Text, TypographyH2 } from '@/components/sc-2025/typography'
import { SCWrapper } from '@/components/sc-2025/wrapper'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { barlowCondensed } from '@/lib/font'
import { Atividade } from '@/types/atividade'
import { TabsContent } from '@radix-ui/react-tabs'

interface CronogramaDetailProps {
  palestra: Atividade
}

export function CronogramaDetail({ palestra }: CronogramaDetailProps) {
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
          <TabsList className="w-full rounded-none border-y-8 bg-[#1D1D1D] p-0  border-white flex flex-row justify-around">
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
        <SCButton className="scale-75 mt-2">Salvar na agenda</SCButton>
      </div>
    </SCWrapper>
  )
}
