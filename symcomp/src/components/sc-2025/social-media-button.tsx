import { ComponentType, ReactNode } from 'react'
import { BsInstagram, BsLink, BsLinkedin, BsYoutube } from 'react-icons/bs'

import { cn } from '@/lib/utils'

type SocialMediaDomain = 'instagram' | 'linkedin' | 'youtube' | 'custom'

interface SocialMediaButtonProps {
  href: string
  domain: SocialMediaDomain
  variant?: 'secondary'
  icon?: ComponentType<{ size?: number }> | ReactNode
}

export function SocialMediaButton({
  href,
  domain,
  icon,
  variant,
}: SocialMediaButtonProps) {
  const Icon = icon ?? inferSocialMediaIcon(domain)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center p-2 rounded-full',
        variant === 'secondary' ? 'bg-sc-2025-secondary' : 'bg-white',
      )}
    >
      {typeof Icon === 'function' ? (
        <Icon color={variant === 'secondary' ? 'white' : 'black'} size={24} />
      ) : (
        Icon
      )}
    </a>
  )
}

function inferSocialMediaIcon(domain: SocialMediaDomain) {
  switch (domain) {
    case 'instagram':
      return BsInstagram
    case 'linkedin':
      return BsLinkedin
    case 'youtube':
      return BsYoutube
    case 'custom':
    default:
      return BsLink
  }
}
