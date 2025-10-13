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

// Representa os campos do formulário.
const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
})

export default function CadastroPage() {
  const router = useRouter()

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
      console.error('Erro no cadastro:', error)
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border rounded-2xl p-6 shadow-sm bg-white grid gap-4"
        >
          <Image
            alt="Logo da Symcomp"
            src="/logo/symcomp.png"
            width={80}
            height={80}
            className="mx-auto"
          />

          <h2 className="text-xl font-semibold">Cadastrar</h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={isPending}
            className={`bg-rose-600 text-white rounded px-4 py-2 mt-2 ${isPending ? 'hover:bg-rose-700' : 'opacity-80'}`}
          >
            Registrar
          </button>
        </form>
      </Form>
    </div>
  )
}
