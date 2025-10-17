import { Text, TypographyH1, TypographyH2 } from '@/components/sc-2025/typography'
import SemanaHeader from '../header'
import { SCCarousel } from '@/components/sc-2025/carousel'
import { SCButton } from '@/components/sc-2025/button'
import { CronogramaCarrousel } from './cronograma-carrousel'

export default function CronogramaPage() {
  return (
    <div className="w-full flex justify-center bg-sc-2025-secondary min-h-svh">
      <div className="max-w-[1024px] w-full">
        <SemanaHeader />
        <main className="flex-1 flex flex-col w-full items-stretch justify-stretch">
          <TypographyH1>CRONOGRAMA</TypographyH1>
          <TypographyH2 className="text-sc-2025-contrast">
            Veja todas as palestras do evento!
          </TypographyH2>
          <CronogramaCarrousel />
        </main>
      </div>
    </div>
  )
}
