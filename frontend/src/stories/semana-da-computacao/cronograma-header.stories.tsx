import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CronogramaHeader } from '@/components/sc-2025/cronograma-header'

const meta: Meta<typeof CronogramaHeader> = {
  title: 'Components/CronogramaHeader',
  component: CronogramaHeader,
}

export default meta

type Story = StoryObj<typeof CronogramaHeader>

export const Primary: Story = {}
