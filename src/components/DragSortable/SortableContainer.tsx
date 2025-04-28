import React, { FC } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  //   arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element | JSX.Element[] //类似vue的slot
  items: Array<{ id: string; [key: string]: any }> //数据，必须要有id属性
  onDragEnd: (oldIndex: number, newIndex: number) => void //拖拽结束后，把更新后的index通过函数调用的方式传递给外层组件
}

const DragSortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children = [], items = [], onDragEnd } = props
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //超过8像素点拖转才会认为要执行拖拽
      },
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over == null) return

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.fe_id === active.id)
      const newIndex = items.findIndex(c => c.fe_id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default DragSortableContainer
