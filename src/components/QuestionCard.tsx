import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

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
  isDeleted: boolean
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isPublished, createdAt, answerCount, isStar, isDeleted } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const nav = useNavigate()
  // 修改问卷标星状态
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      const data = updateQuestionService(_id, {
        isStar: !isStarState,
      })
      return data
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('更新成功')
      },
    }
  )

  const { confirm } = Modal
  //复制问卷
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        nav(`/question/edit/${result.id}`)
        message.success('复制成功')
      },
    }
  )
  //删除问卷
  const [isDeletedState, setIsDeletedState] = useState(isDeleted)
  const { loading: deletedLoading, run: deletedQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        setIsDeletedState(true)
        message.success('删除成功')
      },
    }
  )
  function del() {
    confirm({
      title: '确定删除该问卷？',
      okText: '确定',
      cancelText: '取消',
      icon: <ExclamationCircleOutlined />,
      onOk: deletedQuestion,
    })
  }
  //如果卡片被（假）删除，则不在list页渲染
  if (isDeletedState) return null
  return (
    <div className={styles.container}>
      {/* title部分：上 */}
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
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
          <Button
            type="text"
            size="small"
            icon={<StarOutlined />}
            onClick={changeStar}
            disabled={changeStarLoading}
          >
            {isStarState ? '取消标星' : '标星'}
          </Button>
          <Popconfirm title="确定复制问卷？" okText="确定" cancelText="取消" onConfirm={duplicate}>
            <Button type="text" size="small" icon={<CopyOutlined />} disabled={duplicateLoading}>
              复制
            </Button>
          </Popconfirm>
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={del}
            disabled={deletedLoading}
          >
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}
export default QuestionCard
