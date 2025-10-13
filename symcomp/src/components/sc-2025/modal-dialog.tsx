'use client'

import { ReactNode } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface ModalDialogProps {
  children: ReactNode
  trigger: ReactNode
}

export function ModalDialog({ children, trigger }: ModalDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[90vw] max-w-3xl">{children}</DialogContent>
    </Dialog>
  )
}
