import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitingLoadUserData } = useLoadUserData()

  useNavPage(waitingLoadUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingLoadUserData ? <Spin></Spin> : <Outlet></Outlet>}
      </Content>
      <Footer className={styles.footer}>小慕问卷©2025-present.Created by xue</Footer>
    </Layout>
  )
}
export default MainLayout
