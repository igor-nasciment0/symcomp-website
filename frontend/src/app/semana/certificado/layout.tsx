import { ReactNode } from 'react'

import SemanaHeader from '../header'

interface CertificadoLayoutProps {
  children: ReactNode
}

export default function CertificadoLayout({ children }: CertificadoLayoutProps) {
  return (
    <div className="flex flex-col flex-1 w-full h-full bg-[#414141] items-center">
      <SemanaHeader />
      <div className="w-full h-full flex justify-center items-center flex-1">
        {children}
      </div>
    </div>
  )
}
