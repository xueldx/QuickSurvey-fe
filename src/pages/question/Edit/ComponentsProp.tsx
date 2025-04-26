import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/questionComponents'
import { ComponentPropsType } from '../../../components/questionComponents/index'
import { changeComponentProps } from '../../../store/componentsReducer'
import styles from './ComponentsProp.module.scss'

const NoProps: FC = () => {
  return <div style={{ textAlign: 'center' }}>没有选中组件</div>
}
const ComponentsProp: FC = () => {
  const dispatch = useDispatch()
  //获取当前选中的组件信息
  const { selectedComponent } = useGetComponentInfo()
  if (selectedComponent == null) return <NoProps></NoProps>

  //从组件信息中获取type，根据type找到对应的属性组件并渲染返回
  const { type, props, isLocked, isHidden } = selectedComponent
  const ComponentConf = getComponentConfByType(type)
  if (ComponentConf == null) return <NoProps></NoProps>
  const { PropComponent } = ComponentConf

  //子组件触发绑定的自定义事件并传递新值，父组件在这统一接收新值并同步到redux-store中
  function changeProps(newProps: ComponentPropsType) {
    //把当前选中组件的fe_id 和新属性传给redux对应的action
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  return (
    <div className={styles.container}>
      <PropComponent
        {...props}
        onChange={changeProps}
        disabled={isLocked || isHidden}
      ></PropComponent>
    </div>
  )
}

export default ComponentsProp
