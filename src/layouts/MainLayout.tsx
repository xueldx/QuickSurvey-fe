import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import Login from '../components/Login'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <Login />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet></Outlet>
      </Content>
      <Footer className={styles.footer}>小慕问卷©2025-present.Created by xue</Footer>
    </Layout>
  )
}
export default MainLayout
