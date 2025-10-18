'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Text } from '@/components/sc-2025/typography'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { semanaCadastro, semanaCrongorama, semanaHome, semanaLogin } from '@/lib/routes'

export default function SemanaHeader() {
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
          <div className="flex flex-row gap-4 items-center justify-center">
            <Link href={semanaLogin} className="bg-white w-fit p-2">
              <Text>Entrar</Text>
            </Link>
            <Link href={semanaCadastro} className="bg-sc-2025-primary w-fit p-2">
              <Text>Cadastrar</Text>
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <Link href={semanaHome}>
              <Text className="text-sc-2025-background text-xl">Página inicial</Text>
            </Link>
            <Link href={semanaCrongorama}>
              <Text className="text-sc-2025-secondary text-xl">Cronograma</Text>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
