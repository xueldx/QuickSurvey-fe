import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Table, Empty, Tag, Space, Button, Modal, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'

const { Title } = Typography
const { confirm } = Modal

const col = [
  {
    title: '问卷标题',
    dataIndex: 'title',
  },
  {
    title: '发布状态',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    },
  },
  {
    title: '星标问卷',
    dataIndex: 'isStar',
    render: (isStar: boolean) => {
      return isStar ? <Tag color="processing">是</Tag> : <Tag>否</Tag>
    },
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
]

const Trash: FC = () => {
  useTitle('小慕问卷-回收站')
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  function del() {
    confirm({
      title: '确认删除问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法找回',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        alert(`已删除${selectedIds}`)
      },
    })
  }
  const tableElement = (
    <>
      <Space style={{ marginBottom: '10px' }}>
        <Button type="primary" disabled={selectedIds.length === 0}>
          恢复
        </Button>
        <Button danger disabled={selectedIds.length === 0} onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        dataSource={list}
        columns={col}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      ></Table>
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据"></Empty>}

        {!loading && list.length > 0 && tableElement}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  )
}
export default Trash
