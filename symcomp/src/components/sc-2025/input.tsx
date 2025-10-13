import { barlowCondensed } from '@/lib/font'
import { cn } from '@/lib/utils'

import { Input } from '../ui/input'

interface SCInputProps {
  placeholder?: string
}

export function SCInput({ placeholder }: SCInputProps) {
  return (
    <Input
      className={cn(
        barlowCondensed.className,
        'placeholder:font-normal placeholder:opacity-70 border-sc-2025-contrast border-[8px] rounded-none px-4 py-6 !text-lg',
      )}
      placeholder={placeholder}
    />
  )
}
