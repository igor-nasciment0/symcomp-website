'use client'

import Image from 'next/image'

import { SCButton } from '@/components/sc-2025/button'
import { Highlight } from '@/components/sc-2025/typography'
import { TypographyH1 } from '@/components/sc-2025/typography'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCurrentUser } from '@/hooks/useCurrentUser'

import SemanaHeader from '../header'

interface Stats {
  pontos: number
  presencas: number
}

export default function PerfilPage() {
  const { data: currentUser, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <div className="w-full h-full mx-auto justify-center bg-sc-2025-background min-h-svh">
        <SemanaHeader />
        <TypographyH1 className="py-10">Perfil do Usuário</TypographyH1>
        <div className="h-full">
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="w-full h-full mx-auto justify-center bg-sc-2025-background min-h-svh">
        <SemanaHeader />
        <TypographyH1 className="py-10">Perfil do Usuário</TypographyH1>
        <div className="h-full">
          <p>
            Você precisa estar logado para ver seu perfil. <a href="/login">Login</a>
          </p>
        </div>
      </div>
    )
  }

  const userProfile = {
    name: currentUser.user.name,
    email: currentUser.user.email,
    stats: {
      pontos: Number(currentUser.jogador?.pontos) || 0,
      presencas: 0,
    } as Stats,
    role: currentUser.perfil.papel,
    photo: '/sc-2025/symcompinho.svg',
  }

  return (
    <div className="w-full h-full mx-auto justify-center bg-sc-2025-background min-h-svh">
      <SemanaHeader />
      <TypographyH1 className="flex-1 flex flex-col w-full items-stretch justify-stretch pb-10">
        Perfil do Usuário
      </TypographyH1>

      <div className="h-full">
        <div className="flex flex-col items-center md:flex-row items-start gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image
              src={userProfile.photo}
              alt="Foto de perfil"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-sc-2025-foreground">
              {userProfile.name}
            </h2>
            <p className="text-sc-2025-foreground">{userProfile.email}</p>
            <Highlight className="bg-sc-2025-primary text-sc-2025-contrast mt-2 rounded-none px-3 py-1 text-sm font-semibold border-2 border-black">
              {userProfile.role}
            </Highlight>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Highlight className="ml-4 bg-sc-2025-primary p-6 rounded-none border-sc-2025-contrast shadow-md text-center border-2 border-black">
            <h3 className="text-sm font-semibold text-sc-2025-contrast">
              Pontos Acumulados
            </h3>
            <p className="text-2xl font-bold text-sc-2025-contrast mt-2">
              {userProfile.stats.pontos}
            </p>
          </Highlight>

          <Highlight className="mr-4 bg-sc-2025-primary p-6 rounded-none border-5 border-sc-2025-contrast shadow-md text-center border-2 border-black">
            <h3 className="text-base font-semibold text-sc-2025-contrast">Presenças</h3>
            <p className="text-2xl font-bold text-sc-2025-contrast mt-2">
              {userProfile.stats.presencas}
            </p>
          </Highlight>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="activities">
            <TabsList className="flex gap-1 bg-transparent">
              {/*
              <TabsTrigger value="activities">
                <SCButton className="flex-1 bg-sc-2025-secondary text-white data-[state=active]:bg-sc-2025-accent py-2 px-4 text-lg">
                  Presenças
                </SCButton>
              </TabsTrigger>
              */}

              <TabsTrigger value="certificate">
                <SCButton className="flex-1 bg-sc-2025-secondary text-white data-[state=active]:bg-sc-2025-accent py-2 px-4 text-lg">
                  Certificado
                </SCButton>
              </TabsTrigger>
            </TabsList>

            {/*
              <TabsContent value="activities" className="mt-4">
              <div className="space-y-4">
                <p className="text-sc-2025-foreground">
                  Nenhuma presença registrada ainda.
                </p>
              </div>
            </TabsContent>
            */}

            <TabsContent value="certificate" className="mt-4">
              <div className="space-y-4 px-4">
                <p className="text-sc-2025-foreground">
                  O seu certificado final aparecerá aqui.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
