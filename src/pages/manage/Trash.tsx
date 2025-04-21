import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { useTitle, useRequest } from 'ahooks'
import classNames from 'classnames'
import { Typography, Table, Empty, Tag, Space, Button, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { updateQuestionService, deleteQuestionService } from '../../services/question'

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
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  //恢复问卷
  const { run: recover, loading: recoverLoading } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('恢复成功,请到问卷列表页查看')
        refresh() //恢复成功后手动刷新列表
        setSelectedIds([])
      },
    }
  )
  //删除问卷
  const { run: deleteQuestion, loading: deleteLoading } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success('删除成功')
        refresh()
        setSelectedIds([])
      },
    }
  )
  function del() {
    confirm({
      title: '确认删除问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法找回',
      okText: '确认',
      cancelText: '取消',
      onOk: deleteQuestion,
    })
  }
  const tableClass = classNames({
    [styles.content]: true,
    [styles.tableContent]: true,
  })
  const tableElement = (
    <>
      <Space style={{ marginBottom: '10px' }}>
        <Button
          type="primary"
          disabled={selectedIds.length === 0 || recoverLoading}
          onClick={recover}
        >
          恢复
        </Button>
        <Button danger disabled={selectedIds.length === 0 || deleteLoading} onClick={del}>
          彻底删除
        </Button>
      </Space>
      <Table
        sticky
        className={tableClass}
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
      <div className={(styles.content, styles.trashContent)}>
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
