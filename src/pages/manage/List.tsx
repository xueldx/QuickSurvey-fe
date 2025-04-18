import React, { FC } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import { Typography, Spin, Divider, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const List: FC = () => {
  useTitle('小慕问卷-我的问卷')
  const { data = {}, loading } = useLoadQuestionListData({})
  const { list = [], total = 0 } = data //类型报错可以用给默认值的方式解决
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
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据"></Empty>}

        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
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
