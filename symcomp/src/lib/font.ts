import { Barlow_Semi_Condensed, Silkscreen } from 'next/font/google'

export const barlowCondensed = Barlow_Semi_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
  weight: ['400', '700'],
})

export const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
})
