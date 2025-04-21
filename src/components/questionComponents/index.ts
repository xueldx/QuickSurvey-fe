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

export function getComponentConfByType(type: string) {
  return ComponentConfList.find(component => component.type === type)
}
