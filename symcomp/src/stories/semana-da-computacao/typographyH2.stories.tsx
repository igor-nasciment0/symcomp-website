import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TypographyH2 } from '@/components/sc-2025/typography'

const meta: Meta<typeof TypographyH2> = {
  title: 'Components/TypographyH2',
  component: TypographyH2,
}

export default meta

type Story = StoryObj<typeof TypographyH2>

export const Primary: Story = {
  args: {
    children: <>Título 1</>,
  },
}
