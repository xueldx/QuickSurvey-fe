import React, { FC, MouseEvent } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import styles from './EditCanvas.module.scss'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponentList,
} from '../../../store/componentsReducer'
import { getComponentConfByType, ComponentConfType } from '../../../components/questionComponents'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

type PropsType = {
  loading: boolean
}
//根据redux中每个组件的信息生成对应组件
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type) as ComponentConfType
  const { Component } = componentConf
  return <Component {...props}></Component>
}
//画布组件
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  useBindCanvasKeyPress()

  //改变默认选中id
  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation() //阻止冒泡，否则如果冒泡了，外层main也相当于被点击（清空了selectedId）
    dispatch(changeSelectedId(id))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    )
  }
  //渲染可见的组件
  const componentListFilterd = componentList.filter(c => !c.isHidden)
  //加上id用于SortableContainer的items属性
  const componentListFilterdWithId = componentListFilterd.map(c => {
    return { ...c, id: c.fe_id }
  })

  //拖拽完毕后改变redux中的componnetsList
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponentList({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListFilterdWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {/* 根据redux store 中的问卷组件列表信息生成真正的对应组件 */}
        {componentListFilterd.map(c => {
          const { fe_id, isLocked } = c
          //判断是否为选中的组件，是则加上蓝色边框
          const wrapperDefaultClassName = styles['component-wrapper']
          const selectedClassNames = styles.selected
          const lockedClassNames = styles.locked
          const wrapperClassNames = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassNames]: selectedId === fe_id,
            [lockedClassNames]: isLocked,
          })
          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div
                className={wrapperClassNames}
                onClick={e => {
                  handleClick(e, fe_id)
                }}
              >
                <div className={styles.component}>{genComponent(c)}</div>
              </div>
            </SortableItem>
          )
        })}
      </div>
    </SortableContainer>
  )
}
export default EditCanvas
