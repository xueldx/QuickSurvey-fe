/**
 * @description 问卷 Radio
 */

import Component from './component'
import PropComponent from './PropComponent'
import { questionRadioDefaultProps } from './interface'

export * from './interface'

// Radio 组件的配置
export default {
  title: '单选框',
  type: 'questionRadio', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: questionRadioDefaultProps,
}
