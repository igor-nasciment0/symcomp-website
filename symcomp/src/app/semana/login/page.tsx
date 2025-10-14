'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SCButton } from '@/components/sc-2025/button'
import { SCField } from '@/components/sc-2025/field'
import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'
import { TypographyH1, TypographyH2 } from '@/components/sc-2025/typography'

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form'
import CreateLoginToken from '@/lib/http/create-logn-token'

const formSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
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

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await CreateLoginToken(values)
    },
    onSuccess: (data) => {
      console.log('Login realizado com sucesso:', data.message)

	  router.push('/semana/dashboard')
    },
    onError: (error) => {
      console.error('Erro no login:', error)

	  const errorMessage = 
		  error.response?.data?.detail ||
		  'Email ou senha inválidos. Tente novamente.'
	  form.setError('root', {
		  message: errorMessage,
	  })
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
     <div className="max-w-5xl mx-auto p-6 bg-red-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-6 grid gap-4"
        >
          <TypographyH1>Login</TypographyH1>
          <div className="text-[#0E0A47]">
            <TypographyH2>Faça login no seu perfil:</TypographyH2>
          </div>

          <div className="text-[#0E0A47]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <SCField>
                  <SCLabel>Email</SCLabel>
                  <SCInput
                    placeholder="Ex.: grace.hopper@ime.usp.br"
                    {...field}
                  />
                  <FormMessage />
                </SCField>
              )}
            />
          </div>

          <div className="text-[#0E0A47]">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <SCField>
                  <SCLabel>Senha</SCLabel>
                  <SCInput
                    type="password"
                    placeholder="Insira sua senha"
                    {...field}
                  />
                  <FormMessage />
                </SCField>
              )}
            />
          </div>

          {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          
          <FormControl>
             <SCButton type="submit" disabled={isPending}>
                {isPending ? 'Entrando...' : 'Entrar'}
             </SCButton>
          </FormControl>
        </form>
      </Form>
    </div>
  )
}
