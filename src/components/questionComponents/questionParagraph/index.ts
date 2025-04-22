/**
 * @description 问卷 段落
 */

import Component from './component'
import PropComponent from './PropComponent'
import { questionParagraphDefaultProps } from './interface'

export * from './interface'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: questionParagraphDefaultProps,
}
