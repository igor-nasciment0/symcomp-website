import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SCButton } from '@/components/sc-2025/button'

const meta: Meta<typeof SCButton> = {
  title: 'Components/SCButton',
  component: SCButton,
}

export default meta

type Story = StoryObj<typeof SCButton>

export const Primary: Story = {
  args: {
    children: <>Clique aqui</>,
  },
}
