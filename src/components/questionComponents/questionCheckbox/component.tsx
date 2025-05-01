import React, { FC } from 'react'
import { nanoid } from 'nanoid'
import { Typography, Space, Checkbox } from 'antd'
import { QuestionCheckboxPropsType, questionCheckboxDefaultProps } from './interface'
const { Paragraph } = Typography

const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const {
    title = '',
    isVertical = false,
    list = [],
  } = { ...questionCheckboxDefaultProps, ...props }
  const textArr = title.split('\n') //以换行符拆分字符为字符数组

  return (
    <>
      <Paragraph
        strong
        style={{
          marginBottom: '12px',
        }}
      >
        {textArr.map((t, index) => {
          return (
            <span key={index}>
              {/* 第二段开始有换行符 */}
              {index > 0 && <br />}
              {t}
            </span>
          )
        })}
      </Paragraph>
      <>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {list.map(({ value, text, checked }) => {
            return (
              <Checkbox key={value + nanoid()} checked={checked} value={value}>
                {text}
              </Checkbox>
            )
          })}
        </Space>
      </>
    </>
  )
}

export default QuestionCheckbox
