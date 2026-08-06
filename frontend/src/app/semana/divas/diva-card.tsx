import Image from 'next/image'

import { Text } from '@/components/sc-2025/typography'
import { peaceSans } from '@/lib/font'
import { cn, slugfy } from '@/lib/utils'

type Diva = {
  fullName: string
  firstName: string
  lastName: string
  description: string
}

interface DivaCardProps {
  diva: Diva
}

export function DivaCard({ diva }: DivaCardProps) {
  return (
    <div className="w-[300px] h-fit bg-sc-2025-contrast">
      <Image
        src={`/sc-2025/divas/${slugfy(diva.lastName)}.png`}
        height={300}
        width={300}
        alt=""
      />
      <div className="p-4">
        <h1 className={cn(peaceSans.className, 'font-bold text-4xl mb-2 text-white')}>
          {diva.fullName}
        </h1>
        <Text variant="secondary" className="text-white">
          {diva.description}
        </Text>
      </div>
    </div>
  )
}
