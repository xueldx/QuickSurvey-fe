import React, { FC } from 'react'
import { Tabs } from 'antd'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'

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
      children: <div>组件库</div>,
    },
    {
      key: 'layers',
      label: (
        <div>
          <BarsOutlined></BarsOutlined>
          图层
        </div>
      ),
      children: <div>图层</div>,
    },
  ]
  return <Tabs defaultActiveKey="components" items={Items}></Tabs>
}

export default LeftPanel
