export type QuestionInfoPropsType = {
  title?: string
  desc?: string
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const questionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述……',
}
