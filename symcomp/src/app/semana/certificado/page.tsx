'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import { SCButton } from '@/components/sc-2025/button'
import { SCField } from '@/components/sc-2025/field'
import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'
import { FieldGroup } from '@/components/ui/field'

const Scanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then((mod) => mod.Scanner),
  { ssr: false },
)

export default function Certificado() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [etapa, setEtapa] = useState<'form' | 'scan' | 'done'>('form')
  const [mensagem, setMensagem] = useState('')

  async function enviarPresenca(token: string) {
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, token }),
    })
    const data = await res.json()
    setMensagem(data.mensagem)
    setEtapa('done')
  }

  if (etapa === 'scan') {
    return (
      <div className="w-full h-full flex-1 flex flex-col justify-center items-center bg-sc-2025-background">
        <p className="text-lg font-semibold">Aponte a câmera para o QR da palestra</p>
        <div className="w-[300px]">
          <Scanner
            onScan={(result) => {
              if (result) {
                const text = result.join()
                enviarPresenca(text)
              }
            }}
          />
        </div>
      </div>
    )
  }

  if (etapa === 'done') {
    return (
      <div className="w-full h-full flex-1 flex justify-center items-center bg-sc-2025-background">
        <p className="text-xl">{mensagem}</p>
        <SCButton onClick={() => setEtapa('form')} className="mt-4">
          Registrar outra presença
        </SCButton>
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
