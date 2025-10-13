import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Text } from '@/components/sc-2025/typography'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
}

export default meta

type Story = StoryObj<typeof Text>

export const Primary: Story = {
  args: {
    children: <>Texto primário</>,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: <>Texto secundário</>,
  },
}
