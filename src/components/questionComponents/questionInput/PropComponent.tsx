import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputPropsType } from './interface'

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()
  //当切换画布同类组件，还是共用同一个属性组件，但是传入不同的props，此时这个组件也要切换显示内容
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])
  //属性变化，触发自定义事件传递新的值到父组件，由父组件统一同步到redux-store中，从而引起页面变化
  function handleValuesChange() {
    if (onChange) onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="输入框标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input></Input>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
