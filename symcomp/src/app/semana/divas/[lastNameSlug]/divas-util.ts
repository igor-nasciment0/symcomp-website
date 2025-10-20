import { slugfy } from '@/lib/utils'

import { divas } from './divas'

export function getDivaByLastNameSlug(slug: string) {
  return divas.find((diva) => slugfy(diva.lastName) === slug)
}

export function getRandomDiva() {
  const randomIndex = Math.floor(Math.random() * divas.length)
  return divas[randomIndex]
}
