'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Text } from '@/components/sc-2025/typography'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  semanaCadastro,
  semanaCrongorama,
  semanaDashboard,
  semanaHome,
  semanaLogin,
  semanaRegistrarPresenca,
} from '@/lib/routes'

export default function SemanaHeader() {
  const { data } = useCurrentUser()

  return (
    <div className="p-4 w-full flex flex-row justify-between items-start bg-transparent">
      <Image src="/sc-2025/ime-usp-branca.svg" alt="" width={52} height={59} />
      <Image
        src="/sc-2025/logo-horizontal.svg"
        alt=""
        className="w-fit pt-4"
        width={45}
        height={200}
      />
      <Sheet>
        <SheetTrigger asChild>
          <Menu size={32} />
        </SheetTrigger>
        <SheetContent className="bg-sc-2025-contrast border-none">
          {data?.user ? (
            <div className="pb-10 flex flex-col gap-4">
              <div className="flex flex-row">
                <Text className="text-white">
                  $ {data.user.name.split(' ')[0]}
                  {data.jogador && `@${data.jogador.username}`}
                </Text>
                <div className="h-[24px] w-[10px] bg-white animate-blink-fast" />
              </div>
              <Link href={semanaDashboard}>
                <Text className="text-white opacity-50 text-sm">{`>`} Dashboard</Text>
              </Link>
              <Text className="text-white opacity-50 text-sm">{`>`} perfil</Text>
            </div>
          ) : (
            <div className="flex flex-row gap-4 items-center justify-center">
              <Link href={semanaLogin} className="bg-white w-fit p-2">
                <Text>Entrar</Text>
              </Link>
              <Link href={semanaCadastro} className="bg-sc-2025-primary w-fit p-2">
                <Text>Cadastrar</Text>
              </Link>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <Link href={semanaRegistrarPresenca}>
              <Text className="text-[#414141] text-xl">{`/`} Certificado</Text>
            </Link>
            <Link href={semanaHome}>
              <Text className="text-sc-2025-background text-xl">
                {`/`} Página inicial
              </Text>
            </Link>
            <Link href={semanaCrongorama}>
              <Text className="text-sc-2025-secondary text-xl">{`/`} Cronograma</Text>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
