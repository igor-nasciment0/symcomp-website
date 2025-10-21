'use client'

import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'

import SemanaHeader from '../header'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { getDesafios } from '@/lib/http/get-desafios'
import { getQuestions } from '@/lib/http/get-questions'
import { SCWrapper } from '@/components/sc-2025/wrapper'
import { Text } from '@/components/sc-2025/typography'
import { SCInput } from '@/components/sc-2025/input'
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form'
import { SCButton } from '@/components/sc-2025/button'
import { sendAnswers } from '@/lib/http/send-answers'
import { submitForm } from '@/lib/http/submit-form'
import { semanaDashboard } from '@/lib/routes'

const schema = z.object({
  respostas: z.record(z.string(), z.string()),
})

export default function EnigmaPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: user, isLoading: userLoading } = useCurrentUser()

  const { data: desafios, isLoading: desafiosLoading } = useQuery({
    queryKey: ['desafio-list'],
    queryFn: getDesafios,
  })

  const primeiroDesafioId = useMemo(() => desafios?.[0]?.id, [desafios])

  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ['questions-desafio', primeiroDesafioId],
    queryFn: () => getQuestions({ desafioId: String(primeiroDesafioId) }),
    enabled: Boolean(primeiroDesafioId),
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { respostas: {} },
    mode: 'onSubmit',
  })

  const saveMutation = useMutation({
    mutationFn: (payload: { desafioId: string; answers: Record<string, string> }) =>
      sendAnswers({ desafioId: payload.desafioId, answers: payload.answers }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions-desafio', primeiroDesafioId],
      })
    },
  })

  const submitMutation = useMutation({
    mutationFn: (desafioId: string) => submitForm({ desafioId }),
  })

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (!primeiroDesafioId) return
    saveMutation.mutate({
      desafioId: String(primeiroDesafioId),
      answers: values.respostas,
    })
  }

  const saveAndSubmit = async () => {
    if (!primeiroDesafioId) return

    await new Promise<void>((resolve, reject) => {
      saveMutation.mutate(
        {
          desafioId: String(primeiroDesafioId),
          answers: form.getValues().respostas,
        },
        {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        },
      )
    })

    submitMutation.mutate(String(primeiroDesafioId))
    router.push(semanaDashboard)
  }

  useEffect(() => {
    if (questions && questions.length > 0) {
      if ('detail' in questions && questions.detail === 'Respostas já validadas.') {
        form.reset({ respostas: {} })
        return
      }

      const respostasIniciais: Record<string, string> = {}
      for (const q of questions) {
        respostasIniciais[q.id] = q.respostaSalva || ''
      }
      form.reset({ respostas: respostasIniciais })
    }
  }, [questions, form])

  if (userLoading || desafiosLoading || questionsLoading) return null
  if (
    !questions?.length ||
    ('detail' in questions && questions.detail === 'Respostas já validadas.')
  ) {
    return (
      <div className="flex-1 bg-sc-2025-contrast w-full flex flex-col h-full items-center">
        <SemanaHeader />
        <Text>Respostas já foram validadas.</Text>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-sc-2025-contrast w-full flex flex-col h-full items-center">
      <SemanaHeader />
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 flex flex-col gap-4 w-full items-center"
          >
            {questions.map((question, index) => (
              <SCWrapper key={question.id}>
                <div className="flex flex-col w-[300px]">
                  <Text className="bg-white text-black p-4">
                    <strong className="text-xl">{index + 1}</strong> - {question.pergunta}
                  </Text>
                  <FormField
                    control={form.control}
                    name={`respostas.${question.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SCInput {...field} placeholder="Digite sua resposta" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </SCWrapper>
            ))}

            <div className="flex flex-col gap-3 items-center mt-4">
              <SCButton
                type="submit"
                className="w-[300px]"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Salvando...' : 'Salvar respostas'}
              </SCButton>

              <SCButton
                type="button"
                className="w-[300px]"
                onClick={() => {
                  const confirmacao = window.confirm(
                    'Você tem certeza que deseja enviar suas respostas? Uma vez enviado você não poderá mais acessar essa página',
                  )
                  if (confirmacao) {
                    saveAndSubmit()
                  }
                }}
                disabled={submitMutation.isPending || saveMutation.isPending}
              >
                {submitMutation.isPending || saveMutation.isPending
                  ? 'Enviando...'
                  : 'Enviar respostas'}
              </SCButton>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  )
}
