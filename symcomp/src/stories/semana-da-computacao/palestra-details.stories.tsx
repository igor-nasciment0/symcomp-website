import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CronogramaDetail } from '@/app/semana/cronograma/cronograma-detail'

const meta: Meta<typeof CronogramaDetail> = {
  title: 'Components/CronogramaDetail',
  component: CronogramaDetail,
}

export default meta

type Story = StoryObj<typeof CronogramaDetail>

export const Primary: Story = {
  args: {
    palestra: {
      horario: '12:00 - 13:00',
      titulo:
        'Entre bugs e boss fights: os desafios reais de criar jogos mobile para milhões de pessoas.',
      descricao:
        'Uma conversa sobre os bastidores do desenvolvimento de jogos mobile — dos desafios técnicos às decisões criativas — e o que realmente acontece por trás das telas que entretêm milhões de jogadores.',
      palestrante: 'Victor Domiciano (Wildlife)',
      sobre:
        'Victor é um desenvolvedor de jogos formado em \nCiência da Computação pelo IME-USP, \ncom mais de 6 anos de experiência \nprofissional no desenvolvimento \nde jogos 2D e 3D para plataformas móveis \nAndroid e iOS. Hoje trabalha como Game Engineer\nna Wildlife Studios.',
      foto: '',
      contato:
        ' https://www.linkedin.com/in/victor-domiciano/ e Odair tem o número do Gustavo Futanaka',
      status: 'Quase Ok',
      linkCalendar:
        'https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NHBkZzVuOGpvbWJnMzRoMGo1M2l1MThqMXAgY18yOTc5YWExMmMyYjRjOGJhZTUwZjM0YTNiNGQzYWMzNGQ5NGI2YzY0MDZhZmM2N2JjMjc1NTg0ZGE3YjYzZDc3QGc&tmsrc=c_2979aa12c2b4c8bae50f34a3b4d3ac34d94b6c6406afc67bc275584da7b63d77%40group.calendar.google.com',
    },
  },
}
