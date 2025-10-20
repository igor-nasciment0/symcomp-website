'use client'

import { SCButton } from '@/components/sc-2025/button'
import { SCCarousel } from '@/components/sc-2025/carousel'
import { Text } from '@/components/sc-2025/typography'
import { SCWrapper, SCWrapperFooter } from '@/components/sc-2025/wrapper'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { barlowCondensed } from '@/lib/font'
import { Palestra } from '@/types/palestra'
import { useMemo } from 'react'

import patrocinadores from './patrocinadores.json'
import { PatrocinadoresDetail } from './patrocinadores-detail'

export function PatrocinadoresCarousel() {
  const allAtividades = useMemo(() => {
    return patrocinadores.flatMap((sponsor) =>
      sponsor.atividades
        .filter((atividade) => atividade.titulo)
        .map((atividade) => ({
          ...atividade,
          sponsorName: sponsor.name,
          sponsorTier: sponsor.tier,
        })),
    )
  }, [])

  return (
    <SCCarousel
      items={allAtividades}
      renderItem={(atividade) => (
        <div className="flex justify-center w-full">
          <AtividadeCard
            key={atividade.titulo}
            palestra={atividade as Palestra}
            sponsorName={atividade.sponsorName}
            sponsorTier={atividade.sponsorTier}
          />
        </div>
      )}
    />
  )
}

function AtividadeCard({
  palestra,
  sponsorName,
  sponsorTier,
}: {
  palestra: Palestra
  sponsorName: string
  sponsorTier: string
}) {
  const fotoUrl = palestra.foto ? `/sc-2025/patrocinadores/${palestra.foto}` : ''

  return (
    <div className="relative w-[340px]">
      <div className="absolute top-3 right-2 px-2 py-1 bg-[#1D1D1D] border-8 border-white rounded-none z-10">
        <Text className="text-white text-xs">{sponsorTier}</Text>
      </div>

      <SCWrapper>
        <div className="p-4 w-full flex flex-row justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-4 w-[242px]">
            {fotoUrl && (
              <div className="w-27 h-27 bg-black border-8 border-white rounded-none p-1 flex justify-center items-center overflow-hidden">
                <img
                  src={fotoUrl}
                  alt={palestra.palestrante || 'Foto do Palestrante'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <Text className="text-sc-2025-contrast text-center text-xl font-bold leading-tight">
              {sponsorName}
            </Text>
          </div>
        </div>
        <SCWrapperFooter>
          <div className="flex flex-row items-center justify-center">
            <Dialog>
              <DialogTrigger>
                <SCButton className="bg-transparent p-2">
                  <div className="flex flex-row gap-4 items-center">
                    <Text
                      variant="secondary"
                      className={`text-lg text-white font-semibold ${barlowCondensed.className} hover:text-black`}
                    >
                      SABER MAIS +
                    </Text>
                  </div>
                </SCButton>
              </DialogTrigger>
              <DialogContent className="bg-[#1D1D1D] w-fit p-0 m-0 border-none flex flex-col items-center justify-center">
                <PatrocinadoresDetail palestra={palestra} />
              </DialogContent>
            </Dialog>
          </div>
        </SCWrapperFooter>
      </SCWrapper>
    </div>
  )
}
