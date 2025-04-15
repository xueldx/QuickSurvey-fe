import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Register.module.scss'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'

const { Title } = Typography
const Register: FC = () => {
  function onFinish(values: any) {
    console.log(values)
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onFinish}>
          <Form.Item label="用户名" name="userName">
            <Input></Input>
          </Form.Item>
          <Form.Item label="昵称" name="nickName">
            <Input></Input>
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label="确认密码" name="confirm">
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户？请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register
