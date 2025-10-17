import Image from 'next/image'
import Link from 'next/link'

import { SCButton } from '@/components/sc-2025/button'
import { SocialMediaButton } from '@/components/sc-2025/social-media-button'
import { Highlight, TypographyH1 } from '@/components/sc-2025/typography'
import { semanaCrongorama } from '@/lib/routes'

import SemanaHeader from './header'

export function HeroPage() {
  return (
    <div className="w-full flex justify-center bg-sc-2025-background min-h-svh">
      <div className="max-w-[1024px] w-full">
        <SemanaHeader />
        <main className="flex-1 flex flex-col w-full items-stretch justify-stretch">
          <div className="relative w-full flex flex-col items-center">
            <Image
              height={98.7}
              width={240}
              alt=""
              src={'/sc-2025/sc-xv-display.svg'}
              className="my-[32px] z-10"
            />
            <Image
              height={515}
              width={610}
              alt=""
              src={'/sc-2025/symcompinho.svg'}
              className="absolute right-0 top-1/3 translate-x-1/3 -translate-y-1/3  z-0"
            />
            <div className="w-full flex flex-col gap-8 z-10 px-4 lg:w-[300px]">
              <div className="flex flex-col items-start mt-[40px] lg:items-center lg:scale-150 lg:py-[50px]">
                <TypographyH1>2025</TypographyH1>
                <TypographyH1 className="font-normal text-sc-2025-contrast">
                  OUTUBRO
                </TypographyH1>
                <TypographyH1 className="text-2xl font-normal">DIAS 20 A 24</TypographyH1>
                <TypographyH1 className="font-normal text-sc-2025-contrast text-3xl">
                  12H - 18H
                </TypographyH1>
                <Highlight>
                  <TypographyH1 className="font-normal text-lg">
                    SP - BUTANTÃ
                  </TypographyH1>
                </Highlight>
              </div>
              <div className="flex flex-col gap-4 w-fit">
                <SocialMediaButton
                  domain="instagram"
                  href="https://www.instagram.com/symcomp.imeusp/"
                />
                <SocialMediaButton
                  domain="youtube"
                  href="https://www.youtube.com/@semanadacomputacaoime-usp"
                />
                <SocialMediaButton
                  domain="linkedin"
                  href="https://www.linkedin.com/company/symcompimeusp/"
                />
              </div>
            </div>
            <Link href={semanaCrongorama} className="mt-[40px]">
              <SCButton className="mt-[24px] w-fit z-10">Cronograma</SCButton>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
