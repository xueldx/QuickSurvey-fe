export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
}

export const questionTitleDefaultProps: QuestionTitlePropsType = {
  text: '标题内容',
  level: 1,
  isCenter: false,
}
