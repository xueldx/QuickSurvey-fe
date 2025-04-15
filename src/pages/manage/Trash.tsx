import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Table, Empty, Tag, Space, Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography
const { confirm } = Modal
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createdAt: '3月10日 13:33',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: '3月14日 13:33',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 45,
    createdAt: '3月16日 13:33',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 20,
    createdAt: '3月19日 13:33',
  },
]
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
  const [questionList, setQuestionList] = useState(rawQuestionList)
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
        dataSource={questionList}
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
        {questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {questionList.length > 0 && tableElement}
      </div>
      {/* TODO */}
      {/* <div className={styles.footer}>上滑加载更多……</div> */}
    </>
  )
}
export default Trash
