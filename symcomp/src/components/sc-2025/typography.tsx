import { ReactNode } from 'react'

import { barlowCondensed, silkscreen } from '@/lib/font'
import { cn } from '@/lib/utils'

interface TypographyProps {
  children: ReactNode
  className?: string
  variant?: 'secondary' | undefined
}

export function Text({ children, className, variant }: TypographyProps) {
  return (
    <span
      className={cn(
        variant === 'secondary' ? barlowCondensed.className : silkscreen.className,
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        silkscreen.className,
        'text-center text-4xl font-extrabold tracking-tight',
        className,
      )}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(barlowCondensed.className, 'text-center text-lg', className)}>
      {children}
    </h2>
  )
}

export function Highlight({ children, className }: TypographyProps) {
  return <div className={cn('p-2 bg-sc-2025-contrast w-fit', className)}>{children}</div>
}
