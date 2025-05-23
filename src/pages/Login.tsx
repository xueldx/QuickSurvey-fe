import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styles from './Login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { setToken } from '../utils/user-token'
import { loginService } from '../services/user'
import { loginReducer } from '../store/userReducer'
import { useDispatch } from 'react-redux'
import { getUserInfoService } from '../services/user'

const { Title } = Typography
const Login: FC = () => {
  const USERNAME_KEY = 'USERNAME'
  const PASSWORD_KEY = 'PASSWORD'
  const nav = useNavigate()
  const dispatch = useDispatch()

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

  //登录后获取用户信息
  async function getUserInfo() {
    const { username, nickname } = await getUserInfoService()
    dispatch(loginReducer({ username, nickname })) //成功后把用户信息存到redux中
  }
  //用户登录
  const { run } = useRequest(
    async (userName: string, password: string) => {
      const data = await loginService(userName, password)
      return data
    },
    {
      manual: true,
      async onSuccess(result) {
        const { token = '' } = result
        setToken(token)
        await getUserInfo()
        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )
  function onFinish(values: any) {
    const { remember, userName, password } = values || {}
    run(userName, password)
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
