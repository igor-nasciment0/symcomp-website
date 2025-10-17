import Image from 'next/image'

import ParticleBackground from './particles'
import { HeroPage } from './hero-page'

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
    <div className="w-full h-full flex flex-col items-center">
      <HeroPage />
    </div>
  )
}
