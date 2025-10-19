'use client'

import { CheckCheck, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SCButton } from '@/components/sc-2025/button'
import { SCInput } from '@/components/sc-2025/input'
import { Highlight, Text } from '@/components/sc-2025/typography'
import { FieldGroup } from '@/components/ui/field'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import registerPresence from '@/lib/http/register-presence'
import { SCLabel } from '@/components/sc-2025/label'
import { SCFormMessage } from '@/components/sc-2025/form-message'
import { useMutation } from '@tanstack/react-query'
import { Checkbox } from '@/components/ui/checkbox'

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  { ssr: false },
)

const formSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  email: z.string().email('E-mail inválido'),
  allowSponsors: z.boolean().optional(),
})

type FormData = z.infer<typeof formSchema>
type QRResult = { rawValue: string }

export default function Certificado() {
  const [etapa, setEtapa] = useState<'form' | 'scan' | 'done' | 'error'>('form')

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', allowSponsors: false },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: registerPresence,
    onSuccess: () => setEtapa('done'),
    onError: () => setEtapa('error'),
  })

  if (etapa === 'error') {
    return (
      <div className="w-full h-full flex-1 flex justify-center items-center ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="border-white border-4 p-8 rounded-full">
            <X size={50} />
          </div>
          <Highlight className="bg-red-600 text-center">
            <Text className="text-4xl text-center p-4 text-white">
              Erro ao registrar a presença
            </Text>
          </Highlight>
          <Text variant="secondary" className="text-xl text-center">
            Converse com alguém da organização para registrar manualmente.
          </Text>
        </div>
      </div>
    )
  }

  if (etapa === 'scan') {
    const data = form.getValues()
    return (
      <div className="relative w-full h-screen bg-black">
        <Scanner
          styles={{ video: { width: '100%', height: '100%' } }}
          constraints={{ facingMode: 'environment' }}
          onScan={(result: QRResult | QRResult[] | null) => {
            if (!result) return

            const data = form.getValues()

            let token: string = ''

            if (Array.isArray(result)) {
              token = result[0]?.rawValue ?? ''
            } else if (
              typeof result === 'object' &&
              result !== null &&
              'rawValue' in result
            ) {
              token = (result as QRResult).rawValue
            }

            if (token) {
              mutate({
                email: data.email,
                name: data.name,
                compartilhar: data.allowSponsors || false,
                token,
              })
            }
          }}
          sound={false}
        />

        <p className="absolute top-[150px] w-full text-center text-white text-lg font-semibold bg-black/40 p-8">
          Aponte a câmera para o QR da palestra
        </p>
      </div>
    )
  }

  if (etapa === 'done') {
    return (
      <div className="w-full h-full flex-1 flex justify-center items-center ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="border-white border-4 p-8 rounded-full">
            <CheckCheck size={50} />
          </div>
          <Text className="text-4xl text-center p-4">
            Presença registrada com sucesso
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex-1 flex justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setEtapa('scan'))}
          className="w-[300px] flex flex-col h-full gap-4"
        >
          <FieldGroup>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <SCLabel>Nome completo:</SCLabel>
                  <FormControl>
                    <SCInput placeholder="Digite o seu nome completo" {...field} />
                  </FormControl>
                  <SCFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <SCLabel>Email:</SCLabel>
                  <FormControl>
                    <SCInput placeholder="Não precisa ser @usp.br" {...field} />
                  </FormControl>
                  <SCFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allowSponsors"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="border-4 p-2 border-sc-2025-contrast"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Text className="!m-0" variant="secondary">
                    Permito compartilhar meu email.
                  </Text>
                </FormItem>
              )}
            />
          </FieldGroup>

          <SCButton type="submit" disabled={isPending}>
            {isPending ? 'Carregando...' : 'Registrar'}
          </SCButton>
        </form>
      </Form>
    </div>
  )
}
