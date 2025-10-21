'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SCButton } from '@/components/sc-2025/button'
import { SCFormMessage } from '@/components/sc-2025/form-message'
import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'
import { Text, TypographyH1, TypographyH2 } from '@/components/sc-2025/typography'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import createLoginToken from '@/lib/http/create-logn-token'
import { semanaCadastro, semanaLogin, semanaValidar } from '@/lib/routes'

import SemanaHeader from '../header'

const formSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.').nonempty(),
  password: z.string().nonempty('A senha é obrigatória.'),
})

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => createLoginToken(values),
    onSuccess: () => router.push(semanaValidar),
    onError: (error) => console.error('Erro no login:', error),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center w-full bg-sc-2025-background">
      <SemanaHeader />
      <div className="flex flex-col flex-1 items-center justify-start pt-8 w-full">
        <div className="p-8">
          <TypographyH1>Login</TypographyH1>
          <TypographyH2 variant="secondary" className="text-sc-2025-contrast">
            Faça login no seu perfil:
          </TypographyH2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 grid gap-4 w-full max-w-sm"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <SCLabel>Email</SCLabel>
                  <FormControl>
                    <SCInput placeholder="Ex.: grace.hopper@ime.usp.br" {...field} />
                  </FormControl>
                  <SCFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <SCLabel>Senha</SCLabel>
                  <FormControl>
                    <SCInput type="password" placeholder="Insira sua senha" {...field} />
                  </FormControl>
                  <SCFormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-8 w-full">
              <SCButton type="submit" disabled={isPending}>
                {isPending ? 'Entrando...' : 'Entrar'}
              </SCButton>
              <Text className="text-center">OU</Text>
              <Link href={semanaCadastro}>
                <SCButton className="w-full">Cadastarar</SCButton>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
