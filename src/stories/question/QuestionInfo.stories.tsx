import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Component from '../../components/questionComponents/questionInfo/component'

export default {
  title: 'Question/QuestionInfo',
  component: Component,
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => <Component {...args} />

export const Default = Template.bind({})
Default.args = {}

export const SetProps = Template.bind({})
SetProps.args = {
  title: 'hello',
  desc: 'world',
}

export const DescBreakLine = Template.bind({})
DescBreakLine.args = {
  title: 'hello',
  desc: 'world\nworld\nworld', // 换行
}
