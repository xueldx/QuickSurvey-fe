import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
const Logo: FC = () => {
  return (
    <Link to="/">
      <div className={styles.container}>
        <div>
          <FormOutlined />
        </div>
        <div>小慕问卷</div>
      </div>
    </Link>
  )
}
export default Logo
