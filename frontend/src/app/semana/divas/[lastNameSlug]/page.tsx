import { DivaCard } from '../diva-card'
import { getDivaByLastNameSlug } from './divas-util'

interface DivaDetailPageProps {
  params: Promise<{ lastNameSlug: string }>
}

export default async function DivaDetailPage({ params }: DivaDetailPageProps) {
  const { lastNameSlug } = await params
  const diva = getDivaByLastNameSlug(lastNameSlug)

  return (
    <div className="flex bg-[#1D1D1D] flex-col items-center justify-center flex-1 w-full h-full">
      {diva && <DivaCard diva={diva} />}
    </div>
  )
}
