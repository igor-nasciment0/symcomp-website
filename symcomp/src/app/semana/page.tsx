import Image from 'next/image'

import ParticleBackground from './particles'

export default function Semana() {
  let patrocinadores = [
    { nome: 'Alura', imgSrc: 'alura.svg', height: 121, width: 262 },
    { nome: 'Banco Pine', imgSrc: 'banco-pine.svg', height: 121, width: 344 },
    { nome: 'Irya Solutions', imgSrc: 'irya-solutions.png', height: 864, width: 290 },
    { nome: 'Murabei', imgSrc: 'murabei.png', height: 800, width: 800 },
    { nome: 'Opus', imgSrc: 'opus.png', height: 800, width: 800 },
    { nome: 'Rocketseat', imgSrc: 'rocket-seat.svg', height: 608, width: 867 },
    { nome: 'Thomson Reuters', imgSrc: 'thomson-reuters.svg', height: 57, width: 152 },
    { nome: 'Nic.br', imgSrc: 'nic-br.svg', height: 50, width: 92 },
  ]

  patrocinadores = [
    ...patrocinadores,
    ...patrocinadores,
    ...patrocinadores,
    ...patrocinadores,
    ...patrocinadores,
    ...patrocinadores,
    ...patrocinadores,
  ]

  return (
    <div className="w-full overflow-hidden h-full flex flex-col items-center">
      <ParticleBackground />
      <div className="p-10">
        <div className="flex flex-col items-center">
          <h2 className="text-5xl">SYMCOMP</h2>
          <span className="text-xl">APRESENTA</span>
        </div>
        <div className="flex w-full py-[48px] flex-col justify-center items-center">
          <Image
            src="sc-2025/logo-colorida-symcomp.svg"
            alt="Logo Symcomp"
            width={223}
            height={223}
            className="size-[150px] lg:size-[223px]"
          />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xl animate-pulse">CARREGANDO...</span>
          <Image
            src="sc-2025/barra-carregamento.svg"
            alt="Barra de carregamento"
            width={227.65}
            height={40}
          />
        </div>
      </div>

      <span className="text-lg text-sc-2025-background w-[200px] text-center mt-[32px]">
        UM EVENTO PATROCINADO POR:
      </span>
      <div>
        <div className="relative w-full overflow-hidden mt-2">
          <div className="flex animate-marquee">
            {[...patrocinadores, ...patrocinadores].map((patrocinador, index) => (
              <div
                key={index}
                className="flex justify-center items-center mx-[50px] lg:mx-[100px] shrink-0 size-[100px]"
              >
                <Image
                  src={`/sc-2025/patrocinadores/${patrocinador.imgSrc}`}
                  alt={`Logo do patrocinador ${patrocinador.nome}`}
                  width={150}
                  height={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
