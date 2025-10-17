'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import RegisterUser from '@/lib/http/register-user'

import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'
import { SCField } from '@/components/sc-2025/field'
import { SCButton } from '@/components/sc-2025/button'
import { TypographyH1 } from '@/components/sc-2025/typography'
import { TypographyH2 } from '@/components/sc-2025/typography'
import { useState } from 'react'

// Representa os campos do formulário.
const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

export default function CadastroPage() {
  const router = useRouter()
  const [errors, setErrors] = useState({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await RegisterUser(values)
    },
    onSuccess: (data) => {
      console.log('Cadastro realizado com sucesso:', data)
      // Salva o email no localStorage.
      // localStorage.setItem('email', fields.email)
      localStorage.setItem('email', form.getValues().email)

      // Redireciona para a página de verificação.
      router.push('/semana/cadastro/verificar')
    },
    onError: (error) => {
      //console.error('Erro no cadastro:', error.response.data)
      setErrors(error.response.data);
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6 bg-red-500">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-6 grid gap-4"
        >

          <TypographyH1>Cadastrar</TypographyH1>
          <div className='text-[#0E0A47]'>
            <TypographyH2>Preencha suas informações para concluir o cadastro:</TypographyH2>
          </div>

          <div className='text-[#0E0A47]'>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <SCField>
                  <SCLabel>Nome</SCLabel>
                  <SCInput placeholder="Ex.: Grace Hopper" {...field} required></SCInput>
                  {
                    errors.name && errors.name.map((e : string, index : number) => {
                      return (
                        <TypographyH2 key={index}>{e}</TypographyH2>
                      )
                    })
                  }
                </SCField>
              )}
            />
          </div>

          <div className='text-[#0E0A47]'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <SCField>
                  <SCLabel>Email</SCLabel>
                  <SCInput placeholder="Ex.: grace.hopper@ime.usp.br" {...field} required></SCInput>
                  {
                    errors.email && errors.email.map((e : string, index : number) => {
                      return (
                        <TypographyH2 key={index}>{e}</TypographyH2>
                      )
                    })
                  }
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
                  <SCInput placeholder="Ex.: &S3m4n4D@C0mpUT4c@0" {...field} required type='password'></SCInput>
                  {
                    errors.password && errors.password.map((e : string, index : number) => {
                      return (
                        <TypographyH2 key={index}>{e}</TypographyH2>
                      )
                    })
                  }
                </SCField>
              )}
            />
          </div>

          <SCButton type='submit'>Finalizar</SCButton>
        </form>
      </Form>
    </div>
  )
}
