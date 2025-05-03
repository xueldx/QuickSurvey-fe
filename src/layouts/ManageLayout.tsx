import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Divider, Space, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { creatQuestionService } from '../services/question'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { loading, run: handlerCreatQuestion } = useRequest(creatQuestionService, {
    manual: true,
    onSuccess: result => {
      nav(`/question/edit/${result.id || result._id}`)
      message.success('创建成功')
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handlerCreatQuestion}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav('/manage/list')
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav('/manage/star')
            }}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              nav('/manage/trash')
            }}
          >
            回收站&nbsp;&nbsp;&nbsp;
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}
export default ManageLayout
