import { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SCWrapper, SCWrapperFooter } from '@/components/sc-2025/wrapper'

const meta: Meta<typeof SCWrapper> = {
  title: 'Components/SCWrapper',
  component: SCWrapper,
}

export default meta

type Story = StoryObj<typeof SCWrapper>

export const Primary: Story = {
  args: {
    children: <div className="w-[100px] h-[100px] bg-red-500" />,
  },
}

export const PrimaryFooter: Story = {
  args: {
    children: (
      <>
        <div className="w-[100px] h-[100px] bg-red-500" />
        <SCWrapperFooter>
          <div>Button</div>
        </SCWrapperFooter>
      </>
    ),
  },
}
