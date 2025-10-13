import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Highlight, Text } from '@/components/sc-2025/typography'

const meta: Meta<typeof Highlight> = {
  title: 'Components/Highlight',
  component: Highlight,
}

export default meta

type Story = StoryObj<typeof Highlight>

export const Primary: Story = {
  args: {
    children: <Text className="text-white">Texto primário</Text>,
  },
}
