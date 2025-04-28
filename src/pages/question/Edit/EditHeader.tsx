import React, { ChangeEvent, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { useDispatch } from 'react-redux'
import { Button, Typography, Space, Input, message } from 'antd'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from './EditHeader.module.scss'
import EditToolBar from './EditToolBar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { changeTitle } from '../../../store/pageInfoReducer'
import { updateQuestionService } from '../../../services/question'
const { Title } = Typography

//标题组件
const TitleEle: FC = () => {
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  const [isEditting, setIsEditting] = useState(false)
  //保存
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value
    dispatch(changeTitle(newTitle))
  }

  if (isEditting) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setIsEditting(false)}
        onBlur={() => setIsEditting(false)}
      ></Input>
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setIsEditting(true)} />
    </Space>
  )
}

//保存按钮组件
const SaveButton: FC = () => {
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentInfo()
  const { loading, run: save } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      debounceWait: 500,
    }
  )
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!loading) save()
  })

  //自动保存,ahooks实现防抖效果
  useDebounceEffect(
    () => {
      save()
    },
    [pageInfo, componentList],
    {
      wait: 2000,
    }
  )
  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : ''}>
      保存
    </Button>
  )
}
//发布按钮组件
const PubButton: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const pageInfo = useGetPageInfo()
  const { componentList } = useGetComponentInfo()
  const { loading, run: pub } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav(`/question/stat/${id}`)
      },
    }
  )

  return (
    <Button
      onClick={pub}
      type="primary"
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : ''}
    >
      发布
    </Button>
  )
}

//编辑器头部
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
          <TitleEle></TitleEle>
        </div>
        <div className={styles.main}>
          <EditToolBar></EditToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PubButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
