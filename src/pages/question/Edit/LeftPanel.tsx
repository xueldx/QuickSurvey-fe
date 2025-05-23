import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentsLib from './ComponentsLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const Items = [
    {
      key: 'components',
      label: (
        <div>
          <AppstoreAddOutlined></AppstoreAddOutlined>
          组件库
        </div>
      ),
      children: <ComponentsLib></ComponentsLib>,
    },
    {
      key: 'layers',
      label: (
        <div>
          <BarsOutlined></BarsOutlined>
          图层
        </div>
      ),
      children: <Layers></Layers>,
    },
  ]

  return <Tabs defaultActiveKey="components" items={Items}></Tabs>
}

export default LeftPanel
