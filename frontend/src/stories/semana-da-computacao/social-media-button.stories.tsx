import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SocialMediaButton } from '@/components/sc-2025/social-media-button'

const meta: Meta<typeof SocialMediaButton> = {
  title: 'Components/SocialMediaButton',
  component: SocialMediaButton,
}

export default meta

type Story = StoryObj<typeof SocialMediaButton>

export const Primary: Story = {
  args: {
    domain: 'instagram',
  },
}

export const Secondary: Story = {
  args: {
    domain: 'instagram',
    variant: 'secondary',
  },
}
