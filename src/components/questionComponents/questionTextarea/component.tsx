import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionTextareaPropsType, questionTextareaDefaultProps } from './interface'
const { Paragraph } = Typography
const { TextArea } = Input

const QuestionInput: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder } = { ...questionTextareaDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder}></TextArea>
      </div>
    </div>
  )
}

export default QuestionInput
