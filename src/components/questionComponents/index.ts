import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './questionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './questionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './questionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './questionTextarea'
import QuestionRadioConf, { QuestionRadioPropsType } from './questionRadio'
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './questionCheckbox'

//统一，各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

//统一，组件的配置type
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置的列表
const ComponentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

//组件分组
export const ComponentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'selectGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

export function getComponentConfByType(type: string) {
  return ComponentConfList.find(component => component.type === type)
}
