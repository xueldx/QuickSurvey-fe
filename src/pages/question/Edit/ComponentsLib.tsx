import React, { FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { ComponentConfGroup, ComponentConfType } from '../../../components/questionComponents'
import styles from './ComponentsLib.module.scss'
const { Title } = Typography

const Lib: FC = () => {
  const dispatch = useDispatch()

  //根据组件配置生成对应组件
  function genComponent(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c

    //把当前点击的组件添加到store中，闭包特性使得内层handleClick函数能访问到外层当前被点击组件的各个属性
    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid().toString(),
          title,
          isHidden: false,
          isLocked: false,
          type,
          props: defaultProps,
        })
      )
    }
    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component></Component>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* 根据组件类别分组渲染组件 */}
      {ComponentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '' }}>
              {groupName}
            </Title>
            {/* 渲染每组的各个组件 */}
            {components.map(c => genComponent(c))}
          </div>
        )
      })}
    </div>
  )
}

export default Lib
