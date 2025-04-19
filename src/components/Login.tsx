import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { getUserInfoService } from '../services/user'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import styles from './Login.module.scss'
import { removeToken } from '../utils/user-token'

const Login: FC = () => {
  const { data } = useRequest(getUserInfoService)
  const { username, nickname } = data || {}
  const nav = useNavigate()
  function logout() {
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const userInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const loginInfo = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div className={styles.userInfo}>{nickname ? userInfo : loginInfo}</div>
}
export default Login
