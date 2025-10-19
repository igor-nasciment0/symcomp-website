'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'
import { SCButton } from '@/components/sc-2025/button'
import { TypographyH1, TypographyH2 } from '@/components/sc-2025/typography'

import RegisterUser from '@/lib/http/register-user'
import { SCFormMessage } from '@/components/sc-2025/form-message'
import SemanaHeader from '../../header'
import VerifyCode from '@/lib/http/verify-code'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { semanaDashboard } from '@/lib/routes'

const formSchema = z.object({
  code: z.string().length(6),
})

type FormSchema = z.infer<typeof formSchema>

export default function ValidarPage() {
  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: FormSchema) => VerifyCode({ code: values.code }),
    onSuccess: () => {
      router.push(semanaDashboard)
    },
  })

  function onSubmit(values: FormSchema) {
    mutate(values)
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full bg-sc-2025-background">
      <SemanaHeader />
      <div className="flex flex-col flex-1 items-center justify-start pt-8 w-full">
        <div className="p-8">
          <TypographyH1>Validar</TypographyH1>
          <TypographyH2 className="text-sc-2025-contrast">
            Verifique seu email e cole o código de validação
          </TypographyH2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 grid gap-4 w-full max-w-sm"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <SCLabel>Nome</SCLabel>
                  <FormControl>
                    <SCInput placeholder="Ex.: Grace Hopper" {...field} />
                  </FormControl>
                  <SCFormMessage />
                </FormItem>
              )}
            />

            <SCButton type="submit" disabled={isPending}>
              {isPending ? 'Validando...' : 'Validar'}
            </SCButton>
          </form>
        </Form>
      </div>
    </div>
  )
}
