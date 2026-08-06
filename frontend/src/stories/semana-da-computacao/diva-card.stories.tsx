import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DivaCard } from '@/app/semana/divas/diva-card'

const meta: Meta<typeof DivaCard> = {
  title: 'Components/DivaCard',
  component: DivaCard,
}

export default meta

type Story = StoryObj<typeof DivaCard>

export const Primary: Story = {
  args: {
    diva: {
      fullName: 'Ada Lovelace',
      firstName: 'Ada',
      lastName: 'Lovelace',
      description:
        'Matemática e escritora britânica, considerada a primeira programadora de computadores. Trabalhou com Charles Babbage no projeto da máquina analítica e escreveu notas que descreviam um algoritmo para calcular números de Bernoulli, sendo reconhecida como a primeira pessoa a conceber um algoritmo destinado a ser processado por uma máquina.',
    },
  },
}
