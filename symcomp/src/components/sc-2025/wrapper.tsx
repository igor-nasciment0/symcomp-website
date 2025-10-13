import { ReactNode } from 'react'

interface SCWrapperProps {
  children: ReactNode
}

export function SCWrapper({ children }: SCWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center w-fit">
      <div className="border-[8px] border-white flex flex-col">{children}</div>
      <div className="px-1 w-full">
        <div className="bg-sc-2025-contrast h-[10px] w-full" />
      </div>
    </div>
  )
}

export function SCWrapperFooter({ children }: SCWrapperProps) {
  return (
    <div className="w-full p-2 bg-sc-2025-contrast border-white border-t-[8px]">
      {children}
    </div>
  )
}
