import React, { FC } from 'react'
import styles from './ComponentList.module.scss'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentInfoType } from '../../../store/componentsReducer'
import { getComponentConfByType, ComponentConfType } from '../../../components/questionComponents'

//根据redux中每个组件的信息生成对应组件
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type) as ComponentConfType
  if (componentConf == null) return
  const { Component } = componentConf
  return <Component {...props}></Component>
}

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
//画布组件
const ComponentList: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useGetComponentInfo()

  //渲染可见的组件
  const componentListFilterd = componentList.filter(c => !c.isHidden)

  return (
    <div className={styles.canvas}>
      {/* 根据redux store 中的问卷组件列表信息生成真正的对应组件 */}
      {componentListFilterd.map(c => {
        const { fe_id, type } = c
        //判断是否为选中的组件，是则加上蓝色边框
        const wrapperDefaultClassName = styles['component-wrapper']
        const selectedClassNames = styles.selected
        const wrapperClassNames = classNames({
          [wrapperDefaultClassName]: true,
          [selectedClassNames]: selectedComponentId === fe_id,
        })
        return (
          <div
            key={fe_id}
            className={wrapperClassNames}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            }}
          >
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        )
      })}
    </div>
  )
}
export default ComponentList
