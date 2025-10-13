import { ReactNode } from 'react'

import { silkscreen } from '@/lib/font'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface SCButtonProps {
  children: ReactNode
  className?: string
}

export function SCButton({ children, className }: SCButtonProps) {
  return (
    <Button
      className={cn(
        'bg-white border-sc-2025-contrast hover:bg-sc-2025-accent border-8 flex flex-col justify-center items-center py-[36px]  px-[56px] rounded-[1px] subpixel-antialiased shadow-[0px_12px_0px_0px_#0E0A47]',
        silkscreen.className,
        className,
      )}
    >
      <span className="text-sc-2025-contrast text-4xl ">{children}</span>
    </Button>
  )
}
