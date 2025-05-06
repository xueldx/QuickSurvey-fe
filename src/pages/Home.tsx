import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import styles from './Home.module.scss'
const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>一站式问卷调查与在线投票解决方案，助力精准数据收集与分析！</Paragraph>
        <Button
          type="primary"
          onClick={() => {
            nav('/manage/list')
          }}
        >
          开始使用
        </Button>
      </div>
    </div>
  )
}
export default Home
