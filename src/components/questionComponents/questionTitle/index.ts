/**
 * @description 问卷 标题
 */

import Component from './component'
// import PropComponent from './PropComponent'
import { questionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  // PropComponent,
  defaultProps: questionTitleDefaultProps,
}
