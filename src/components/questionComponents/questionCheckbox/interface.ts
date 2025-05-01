export type optionType = {
  text: string
  value: string
  checked: boolean
}
export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: optionType[]
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const questionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { text: '选项1', value: 'i1', checked: false },
    { text: '选项2', value: 'i2', checked: false },
    { text: '选项3', value: 'i3', checked: false },
  ],
}

export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
