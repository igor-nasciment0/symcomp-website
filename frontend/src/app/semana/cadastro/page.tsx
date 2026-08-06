'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SCButton } from '@/components/sc-2025/button'
import { SCFormMessage } from '@/components/sc-2025/form-message'
import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'
import { TypographyH1, TypographyH2 } from '@/components/sc-2025/typography'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import registerUser from '@/lib/http/register-user'
import { semanaLogin } from '@/lib/routes'

import SemanaHeader from '../header'

const formSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  email: z.string().nonempty('O email é obrigatório').email('Informe um e-mail válido.'),
  password: z
    .string()
    .nonempty('A senha é obrigatória.')
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .max(255, 'A senha deve ter menos de 256 caracteres.')
    .refine((val) => /[a-z]/.test(val), {
      message: 'A senha deve conter pelo menos uma letra minúscula.',
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'A senha deve conter pelo menos uma letra maiúscula.',
    })
    .refine((val) => /\d/.test(val), {
      message: 'A senha deve conter pelo menos um número.',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/.test(val), {
      message: 'A senha deve conter pelo menos um caractere especial.',
    }),
})

type FormSchema = z.infer<typeof formSchema>

export default function CadastroPage() {
  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => registerUser(values),
    onSuccess: () => {
      router.push(semanaLogin)
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
          <TypographyH1>Cadastrar</TypographyH1>
          <TypographyH2 className="text-sc-2025-contrast">
            Preencha suas informações para concluir o cadastro:
          </TypographyH2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 grid gap-4 w-full max-w-sm"
          >
            {/* Campo Nome */}
            <FormField
              control={form.control}
              name="name"
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

            {/* Campo Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <SCLabel>Email</SCLabel>
                  <FormControl>
                    <SCInput
                      type="email"
                      placeholder="Ex.: grace.hopper@ime.usp.br"
                      {...field}
                    />
                  </FormControl>
                  <SCFormMessage />
                </FormItem>
              )}
            />

            {/* Campo Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <SCLabel>Senha</SCLabel>
                  <FormControl>
                    <SCInput placeholder="Digite uma senha" type="password" {...field} />
                  </FormControl>
                  <SCFormMessage />
                </FormItem>
              )}
            />

            <SCButton type="submit" disabled={isPending}>
              {isPending ? 'Cadastrando...' : 'Finalizar'}
            </SCButton>
          </form>
        </Form>
      </div>
    </div>
  )
}
