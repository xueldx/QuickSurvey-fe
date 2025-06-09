import React, { FC } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle } from 'ahooks'
import classNamas from 'classnames'

import { Typography, Empty, Spin } from 'antd'
import ListSearch from '../../components/ListSearch'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'

const { Title } = Typography

const Star: FC = () => {
  useTitle('问卷小筑-星标问卷')
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

  const contentClass = classNamas({
    [styles.content]: true,
    [styles.starContent]: true,
  })

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={contentClass}>
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

      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  )
}
export default Star
