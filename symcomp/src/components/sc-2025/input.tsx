import { barlowCondensed } from '@/lib/font'
import { cn } from '@/lib/utils'

import { Input } from '../ui/input'

interface SCInputProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  required?: boolean
  type?: string
}

export function SCInput({
  placeholder,
  value,
  onChange,
  required,
  type,
  onBlur,
}: SCInputProps) {
  return (
    <Input
      type={type}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      className={cn(
        barlowCondensed.className,
        'placeholder:font-normal placeholder:opacity-70 border-sc-2025-contrast border-[8px] rounded-none px-4 py-6 !text-lg !text-sc-2025-contrast',
      )}
      placeholder={placeholder}
      required={required}
    />
  )
}
