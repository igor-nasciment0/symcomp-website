import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TypographyH1 } from '@/components/sc-2025/typography'

const meta: Meta<typeof TypographyH1> = {
  title: 'Components/TypographyH1',
  component: TypographyH1,
}

export default meta

type Story = StoryObj<typeof TypographyH1>

export const Primary: Story = {
  args: {
    children: <>Título 1</>,
  },
}
