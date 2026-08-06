import { MenuIcon } from 'lucide-react'
import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Navigation } from '@/components/ui/navigation'
import { cn, getContrastColor } from '@/lib/utils'
import { Color } from '@/types/color'
import { Logo } from '@/types/logo'
import { NavigationItem } from '@/types/navigation-item'

interface HeaderProps {
  sections: NavigationItem[]
  logo: Logo
  color: Color
  backgroundColor: string
}

export const SiteHeader = ({ sections, logo, color, backgroundColor }: HeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-row min-h-[100px] px-6 gap-2 items-center justify-between w-full',
        backgroundColor,
      )}
    >
      <a href="#home">
        <Image
          alt={logo.alt}
          src={logo.src}
          width={logo.width}
          height={logo.height}
          className={logo.className ?? 'size-[60px]'}
        />
      </a>
      <DropdownMenu>
        <DropdownMenuTrigger className="sm:hidden">
          <MenuIcon size={32} color={getContrastColor(color.contrast)} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6 p-8">
          <Navigation navItem={sections} color={color} />
        </DropdownMenuContent>
      </DropdownMenu>
      <Navigation className="hidden sm:flex" navItem={sections} color={color} />
    </div>
  )
}
