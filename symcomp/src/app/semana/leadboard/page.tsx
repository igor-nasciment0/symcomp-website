import { Text, TypographyH1 } from '@/components/sc-2025/typography'
import SemanaHeader from '../header'

export default function LeadboardPage() {
  return (
    <div className="flex-1 bg-symcomp-secondary w-full flex flex-col h-full">
      <SemanaHeader />
      <div className="p-4 flex flex-col items-center flex-1 w-full h-full justify-center gap-8">
        <TypographyH1>Top 10 no desafio da semana</TypographyH1>
        <div className="flex flex-col gap-4">
          <div className="w-[300px] bg-symcomp-primary p-4">
            <div className="flex flex-row justify-between">
              <Text>1. Jonathas</Text>
              <Text>200</Text>
            </div>
          </div>

          <div className="w-[300px] bg-symcomp-primary p-4">
            <div className="flex flex-row justify-between">
              <Text>1. Jonathas</Text>
              <Text>200</Text>
            </div>
          </div>

          <div className="w-[300px] bg-symcomp-primary p-4">
            <div className="flex flex-row justify-between">
              <Text>1. Jonathas</Text>
              <Text>200</Text>
            </div>
          </div>

          <div className="w-[300px] bg-symcomp-primary p-4">
            <div className="flex flex-row justify-between">
              <Text>1. Jonathas</Text>
              <Text>200</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
