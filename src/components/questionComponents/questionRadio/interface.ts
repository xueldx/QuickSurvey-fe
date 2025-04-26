export type optionType = {
  text: string
  value: string
}
export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: optionType[]
  value?: string
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const questionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { text: '选项1', value: '1' },
    { text: '选项2', value: '2' },
    { text: '选项3', value: '3' },
  ],
  value: '',
}
