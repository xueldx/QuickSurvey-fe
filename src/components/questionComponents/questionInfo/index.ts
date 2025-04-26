/**
 * @description 问卷 段落
 */

import Component from './component'
import PropComponent from './PropComponent'
import { questionInfoDefaultProps } from './interface'

export * from './interface'

// Paragraph 组件的配置
export default {
  title: '描述',
  type: 'questionInfo', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: questionInfoDefaultProps,
}
