/**
 * @description 问卷 多选框
 */

import Component from './component'
import PropComponent from './PropComponent'
import { questionCheckboxDefaultProps } from './interface'

export * from './interface'

// Checkbox 组件的配置
export default {
  title: '单选框',
  type: 'questionCheckbox', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: questionCheckboxDefaultProps,
}
