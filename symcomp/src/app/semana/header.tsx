import { TypographyH1 } from '@/components/sc-2025/typography'
import { Menu } from 'lucide-react'
import Image from 'next/image'

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
      <Menu size={32} />
    </div>
  )
}
