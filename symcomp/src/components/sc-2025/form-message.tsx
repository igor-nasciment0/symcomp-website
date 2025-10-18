import { FormMessage, useFormField } from '../ui/form'
import { Highlight } from './typography'

export function SCFormMessage() {
  const { error } = useFormField()
  if (!error) return null
  return (
    <Highlight className="bg-red-600">
      <FormMessage className="text-white" />
    </Highlight>
  )
}
