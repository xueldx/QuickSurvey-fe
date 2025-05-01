export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: QuestionTextareaPropsType) => void
  disabled?: boolean
}

export const questionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '输入框标题',
  placeholder: '请输入...',
}
