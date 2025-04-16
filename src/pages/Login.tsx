import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '../router'
import Password from 'antd/es/input/Password'

const { Title } = Typography
const Login: FC = () => {
  const USERNAME_KEY = 'USERNAME',
    PASSWORD_KEY = 'PASSWORD'
  //记住我
  function rememberUser(userName: string, password: string) {
    localStorage.setItem(USERNAME_KEY, userName)
    localStorage.setItem(PASSWORD_KEY, password)
  }
  //删除用户登录信息
  function deleteUserFormData() {
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
  }
  //获取用户信息实现记住我
  function getUserInfoFormData() {
    return {
      userName: localStorage.getItem(USERNAME_KEY),
      password: localStorage.getItem(PASSWORD_KEY),
    }
  }
  const [form] = Form.useForm() //表单实例对象

  useEffect(() => {
    const { userName, password } = getUserInfoFormData()
    form.setFieldsValue({ userName, password })
  }, [])

  function onFinish(values: any) {
    const { remember, userName, password } = values || {}
    console.log(values)

    if (remember) {
      rememberUser(userName, password)
    } else {
      deleteUserFormData()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
              {
                pattern: /^\w+$/,
                message: '请输入字母、数字、下划线',
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
