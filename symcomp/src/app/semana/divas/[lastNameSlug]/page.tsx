import { DivaCard } from '../diva-card'
import { getDivaByLastNameSlug } from './divas-util'

interface DivaDetailPageProps {
  params: { lastNameSlug: string }
}

export default function DivaDetailPage({
  params: { lastNameSlug },
}: DivaDetailPageProps) {
  const diva = getDivaByLastNameSlug(lastNameSlug)

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
      {diva && <DivaCard diva={diva} />}
    </div>
  )
}
