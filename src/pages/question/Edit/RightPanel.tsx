import React, { FC } from 'react'
import { Tabs } from 'antd'
import { FileTextFilled, SettingOutlined } from '@ant-design/icons'
import ComponentsProp from './ComponentsProp'

const RightPanel: FC = () => {
  const TabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextFilled></FileTextFilled>属性
        </span>
      ),
      children: <ComponentsProp></ComponentsProp>,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined></SettingOutlined>页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ]

  return <Tabs items={TabsItems} defaultActiveKey="prop"></Tabs>
}
export default RightPanel
