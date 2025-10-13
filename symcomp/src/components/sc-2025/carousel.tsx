'use client'

import Image from 'next/image'
import * as React from 'react'
import { ReactNode } from 'react'

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

interface ReusableCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  prevIcon?: string
  nextIcon?: string
  className?: string
}

export function SCCarousel<T>({
  items,
  renderItem,
  prevIcon = '/sc-2025/previous-icon.svg',
  nextIcon = '/sc-2025/next-icon.svg',
  className,
}: ReusableCarouselProps<T>) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', onSelect)

    return () => {
      if (api) api.off('select', onSelect)
    }
  }, [api])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 w-3 transition-colors ${
              current === index + 1 ? 'bg-white' : 'bg-sc-2025-contrast'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => api?.scrollPrev()} className="disabled:opacity-50">
          <Image src={prevIcon} alt="Previous" width={64} height={64} />
        </button>

        <Carousel className={className} setApi={setApi}>
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem key={index}>{renderItem(item, index)}</CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <button onClick={() => api?.scrollNext()} className="disabled:opacity-50">
          <Image src={nextIcon} alt="Next" width={64} height={64} />
        </button>
      </div>
    </div>
  )
}
