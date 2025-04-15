import React, { FC } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, createdAt, answerCount, isStar } = props
  const nav = useNavigate()
  const { confirm } = Modal
  const duplicate = () => {
    message.success('复制成功')
  }
  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        message.success('删除成功')
      },
    })
  }
  return (
    <div className={styles.container}>
      {/* title部分：上 */}
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStar && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}

            <span>答卷:&nbsp;{answerCount}</span>
            {createdAt}
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '10px 0' }} />
      {/*按钮部分：下 */}
      <div className={styles.button}>
        <div className={styles.left}>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => {
              nav(`/question/edit/${_id}`)
            }}
          >
            编辑问卷
          </Button>
          <Button
            type="text"
            size="small"
            icon={<LineChartOutlined />}
            disabled={!isPublished}
            onClick={() => {
              nav(`/question/stat/${_id}`)
            }}
          >
            问卷统计
          </Button>
        </div>
        <div className={styles.right}>
          <Button type="text" size="small" icon={<StarOutlined />}>
            {isStar ? '取消标星' : '标星'}
          </Button>
          <Popconfirm title="确定复制问卷？" okText="确定" cancelText="取消" onConfirm={duplicate}>
            <Button type="text" size="small" icon={<CopyOutlined />}>
              复制
            </Button>
          </Popconfirm>
          <Button type="text" size="small" icon={<DeleteOutlined />} onClick={del}>
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
