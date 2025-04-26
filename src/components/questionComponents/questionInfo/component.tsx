import React, { FC } from 'react'
import { Typography } from 'antd'
import { questionInfoDefaultProps, QuestionInfoPropsType } from './interface'
const { Title, Paragraph } = Typography

const questionParagraph: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '' } = { ...questionInfoDefaultProps, ...props }
  const descArr = desc.split('\n') //以换行符拆分字符为字符数组
  //尽量不要用dangerouslySetInnerHtml,危险（广告，攻击……）
  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={3}>{title}</Title>
      <Paragraph
        style={{
          textAlign: 'center',
          marginBottom: '0',
        }}
      >
        {descArr.map((desc, index) => {
          return (
            <span key={index}>
              {/* 第二段开始有换行符 */}
              {index > 0 && <br />}
              {desc}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}

export default questionParagraph
