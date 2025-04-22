export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean
  onChange?: (newProps: QuestionParagraphPropsType) => void
  disabled?: boolean
}

export const questionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '段落内容',
  isCenter: false,
}
