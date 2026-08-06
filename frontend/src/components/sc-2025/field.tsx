import { ReactNode } from 'react'

import { Field } from '../ui/field'

interface SCFieldProps {
  children: ReactNode
}

export function SCField({ children }: SCFieldProps) {
  return <Field className="flex flex-col gap-0 w-full">{children}</Field>
}
