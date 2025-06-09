import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Space, Row, Col } from 'antd'
import { ArrowRightOutlined, BarChartOutlined, FormOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  const features = [
    {
      icon: <FormOutlined style={{ fontSize: '36px' }} />,
      title: '专业问卷设计',
      desc: '丰富的题型支持，灵活的表单配置',
    },
    {
      icon: <TeamOutlined style={{ fontSize: '36px' }} />,
      title: '高效数据收集',
      desc: '多渠道分享，快速获取反馈',
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '36px' }} />,
      title: '智能数据分析',
      desc: '可视化报表，深度洞察数据',
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Space direction="vertical" size="large" align="center">
          <Title level={1} className={styles.mainTitle}>
            问卷调查 | 在线投票
          </Title>
          <Paragraph className={styles.subtitle}>
            一站式问卷调查与在线投票解决方案，助力精准数据收集与分析！
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className={styles.ctaButton}
            onClick={() => nav('/manage/list')}
          >
            开始使用 <ArrowRightOutlined />
          </Button>
        </Space>
      </div>

      <Row className={styles.features} gutter={[48, 48]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={8} key={index}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <Title level={3}>{feature.title}</Title>
              <Paragraph>{feature.desc}</Paragraph>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home
