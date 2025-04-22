import React, { FC } from 'react'
import { Typography } from 'antd'
import { questionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'
const { Paragraph } = Typography

const questionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...questionParagraphDefaultProps, ...props }
  const textArr = text.split('\n') //以换行符拆分字符为字符数组
  //尽量不要用dangerouslySetInnerHtml,危险（广告，攻击……）
  return (
    <Paragraph
      style={{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: '0',
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
  )
}

export default questionParagraph
