import { getRandomDiva } from './[lastNameSlug]/divas-util'
import { DivaCard } from './diva-card'

export default async function DivaPage() {
  const diva = getRandomDiva()

  return (
    <div className="flex bg-[#1D1D1D] flex-col items-center justify-center flex-1 w-full h-full">
      {diva && <DivaCard diva={diva} />}
    </div>
  )
}
