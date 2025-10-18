import { TypographyH1, TypographyH2 } from '@/components/sc-2025/typography'

import SemanaHeader from '../header'
import { CronogramaCarousel } from './cronograma-carrousel'

export default function CronogramaPage() {
  return (
    <div className="w-full flex justify-center bg-sc-2025-secondary min-h-svh">
      <div className="max-w-[1024px] w-full">
        <SemanaHeader />
        <main className="flex-1 flex flex-col w-full items-stretch justify-stretch pb-10">
          <TypographyH1>CRONOGRAMA</TypographyH1>
          <TypographyH2 className="text-sc-2025-contrast mb-10">
            Veja todas as palestras do evento!
          </TypographyH2>
          <CronogramaCarousel />
        </main>
      </div>
    </div>
  )
}
