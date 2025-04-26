import React, { FC } from 'react'
import { nanoid } from 'nanoid'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioPropsType, questionRadioDefaultProps } from './interface'
const { Paragraph } = Typography

const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const {
    title = '',
    isVertical = false,
    options = [],
    value,
  } = { ...questionRadioDefaultProps, ...props }
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
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(({ value, text }) => {
            return (
              <Radio key={value + nanoid()} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </>
  )
}

export default QuestionRadio
