import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './questionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './questionTitle'

//统一，各个组件的prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

//统一，组件的配置type
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  // PropComponent,
  defaultProps: ComponentPropsType
}

// 全部的组件配置的列表
const ComponentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

//组件分组
export const ComponentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

export function getComponentConfByType(type: string) {
  return ComponentConfList.find(component => component.type === type)
}
