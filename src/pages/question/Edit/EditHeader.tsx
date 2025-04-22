import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'

import EditToolBar from './EditToolBar'
const { Title } = Typography
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Button
            type="link"
            onClick={() => {
              nav(-1)
            }}
          >
            <LeftOutlined />
            返回
          </Button>
          <Title>问卷标题</Title>
        </div>
        <div className={styles.main}>
          <EditToolBar></EditToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
