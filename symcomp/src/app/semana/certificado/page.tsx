'use client'

import { CheckCheck } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { SCButton } from '@/components/sc-2025/button'
import { SCField } from '@/components/sc-2025/field'
import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'
import { Text } from '@/components/sc-2025/typography'
import { FieldGroup } from '@/components/ui/field'

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  { ssr: false },
)

export default function Certificado() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [etapa, setEtapa] = useState<'form' | 'scan' | 'done'>('form')
  // const [mensagem, setMensagem] = useState('')

  async function enviarPresenca(token: string) {
    setEtapa('done')
    console.log(token)
  }

  if (etapa === 'scan') {
    return (
      <div className="relative w-full h-screen bg-black">
        <Scanner
          styles={{ video: { width: '100%', height: '100%' } }}
          constraints={{ facingMode: 'environment' }}
          onScan={(result) => {
            if (result) {
              const text = Array.isArray(result) ? result.join() : result
              enviarPresenca(text)
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
      <div className="w-full h-full flex-1 flex justify-center items-center bg-sc-2025-background">
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
    <div className="w-full h-full flex-1 flex justify-center items-center bg-sc-2025-background">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setEtapa('scan')
        }}
        className="w-[300px] flex flex-col h-full gap-4"
      >
        <FieldGroup>
          <SCField>
            <SCLabel>Nome completo:</SCLabel>
            <SCInput
              placeholder="Digite o seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </SCField>
          <SCField>
            <SCLabel>Email:</SCLabel>
            <SCInput
              placeholder="Não precisa ser @usp.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </SCField>
        </FieldGroup>
        <SCButton type="submit">Registrar</SCButton>
      </form>
    </div>
  )
}
