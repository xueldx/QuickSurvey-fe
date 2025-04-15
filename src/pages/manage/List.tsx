import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'

const { Title } = Typography
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
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
    isStar: true,
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
const List: FC = () => {
  useTitle('小慕问卷-我的问卷')
  const [questionList, setQuestionList] = useState(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      {/* TODO */}
      <div className={styles.footer}>上滑加载更多……</div>
    </>
  )
}
export default List
