import { ReactNode } from 'react'

import { Label } from '@/components/ui/label'
import { barlowCondensed } from '@/lib/font'
import { cn } from '@/lib/utils'

interface LabelProps {
  children: ReactNode
}

export function SCLabel({ children }: LabelProps) {
  return (
    <div className="w-fit">
      <Label
        className={cn(
          barlowCondensed.className,
          'inline-block text-white bg-sc-2025-contrast text-2xl p-2 pr-8 rounded-tr-full',
        )}
      >
        {children}
      </Label>
    </div>
  )
}
