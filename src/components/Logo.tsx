import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index'
import useGetUserInfo from '../hooks/useGetUserInfo'
const Logo: FC = () => {
  const [pathname, setPathname] = useState(HOME_PATHNAME)
  const { username } = useGetUserInfo()
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])
  return (
    <Link to={pathname}>
      <div className={styles.container}>
        <div>
          <FormOutlined />
        </div>
        <div>搭搭问</div>
      </div>
    </Link>
  )
}
export default Logo
