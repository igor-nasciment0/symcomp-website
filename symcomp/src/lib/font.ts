import { Barlow_Semi_Condensed, Silkscreen } from 'next/font/google'
import localFont from 'next/font/local'

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

export const peaceSans = localFont({
  src: [
    {
      path: '../../public/fonts/peace-sans.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-peace-sans',
  display: 'swap',
})
