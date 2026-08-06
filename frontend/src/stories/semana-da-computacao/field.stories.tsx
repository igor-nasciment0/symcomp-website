import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SCField } from '@/components/sc-2025/field'
import { SCInput } from '@/components/sc-2025/input'
import { SCLabel } from '@/components/sc-2025/label'

const meta: Meta<typeof SCField> = {
  title: 'Components/SCField',
  component: SCField,
}

export default meta

type Story = StoryObj<typeof SCField>

export const Primary: Story = {
  render: (args) => (
    <SCField {...args}>
      <SCLabel>Email:</SCLabel>
      <SCInput placeholder="Digite seu email" />
    </SCField>
  ),
}
