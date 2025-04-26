import React, { FC, useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { FileTextFilled, SettingOutlined } from '@ant-design/icons'
import ComponentsProp from './ComponentsProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

enum TAB_KEYS {
  PROPS_KEY = 'prop',
  SETTING_KEY = 'setting',
}
const RightPanel: FC = () => {
  const { selectedId } = useGetComponentInfo()
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROPS_KEY)

  //动态切换当前tabs页面
  useEffect(() => {
    if (!selectedId) setActiveKey(TAB_KEYS.SETTING_KEY) //没选中组件，切换到页面设置
    else setActiveKey(TAB_KEYS.PROPS_KEY) //否则切换到属性设置
  }, [selectedId])

  const TabsItems = [
    {
      key: TAB_KEYS.PROPS_KEY,
      label: (
        <span>
          <FileTextFilled></FileTextFilled>属性
        </span>
      ),
      children: <ComponentsProp></ComponentsProp>,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined></SettingOutlined>页面设置
        </span>
      ),
      children: <PageSetting></PageSetting>,
    },
  ]

  return <Tabs items={TabsItems} activeKey={activeKey}></Tabs>
}
export default RightPanel
