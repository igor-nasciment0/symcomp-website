import Image from 'next/image'

export default function SemanaHeader() {
  return (
    <div className="p-4 w-full flex flex-row justify-between">
      <Image src="sc-2025/ime-usp.svg" alt="" width={52} height={59} />
      <Image src="sc-2025/logo-symcomp.svg" alt="" width={50} height={50} />
      <Image src="sc-2025/2025.svg" alt="" width={38} height={52} />
    </div>
  )
}
