import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import classNames from 'classnames'
import { message, Input, Button, Space } from 'antd'
import { useDispatch } from 'react-redux'
import styles from './Layers.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  toggleComponentLocked,
  moveComponentList,
} from '../../../store/componentsReducer'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

const Layers: FC = () => {
  const dispatch = useDispatch()
  const { componentList = [], selectedId = '' } = useGetComponentInfo()
  const [changingTitleId, setChangingTitleId] = useState('')

  //selectedId变化，取消所有组件的选中编辑状态
  useEffect(() => {
    setChangingTitleId('')
  }, [selectedId])

  function handlerClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏图层')
      return
    }
    //当前组件未被选中，改变当前选中的id
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id)) //执行选中
      //useEffect中取消其他组件的选中编辑状态
      return
    }
    //在当前组件已被选中时再次点击，则出现编辑状态
    // fe_id === selectedId
    setChangingTitleId(fe_id)
  }

  //修改标题
  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }

  //修改显示/隐藏
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  //切换锁定
  function toggleLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
  }

  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  //拖拽完毕后改变redux中的componnetsList
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponentList({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        {componentList.map(c => {
          const { fe_id, title, isHidden, isLocked } = c

          const titleDefaultClass = styles.title
          const titleSelectedClass = styles.selected
          const titleClassName = classNames({
            [titleDefaultClass]: true,
            [titleSelectedClass]: fe_id === selectedId,
          })

          return (
            <SortableItem key={fe_id} id={fe_id}>
              <div className={styles.wrapper}>
                <div
                  className={titleClassName}
                  onClick={() => {
                    handlerClick(fe_id)
                  }}
                >
                  {fe_id === changingTitleId ? (
                    <Input
                      value={title}
                      onPressEnter={() => setChangingTitleId('')}
                      onChange={changeTitle}
                    ></Input>
                  ) : (
                    title
                  )}
                </div>
                <div className={styles.handler}>
                  <Space>
                    <Button
                      size="small"
                      shape="circle"
                      className={!isHidden ? styles.btn : ''}
                      type={isHidden ? 'primary' : 'text'}
                      icon={<EyeInvisibleOutlined />}
                      onClick={() => {
                        changeHidden(fe_id, !isHidden)
                      }}
                    ></Button>
                    <Button
                      size="small"
                      shape="circle"
                      className={!isLocked ? styles.btn : ''}
                      type={isLocked ? 'primary' : 'text'}
                      icon={<LockOutlined />}
                      onClick={() => {
                        toggleLocked(fe_id)
                      }}
                    ></Button>
                  </Space>
                </div>
              </div>
            </SortableItem>
          )
        })}
      </div>
    </SortableContainer>
  )
}

export default Layers
