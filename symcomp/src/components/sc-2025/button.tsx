import { ReactNode } from 'react'

import { silkscreen } from '@/lib/font'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface SCButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function SCButton({
  children,
  className,
  onClick,
  type = 'button',
  disabled,
}: SCButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'bg-white border-sc-2025-contrast hover:bg-sc-2025-accent border-8 flex flex-col justify-center items-center py-[24px] px-[32px] rounded-[1px] subpixel-antialiased',
        silkscreen.className,
        className,
      )}
    >
      <span className="text-sc-2025-contrast text-2xl">{children}</span>
    </Button>
  )
}
