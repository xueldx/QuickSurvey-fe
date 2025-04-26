import React, { FC, useEffect } from 'react'
import { Form, Input, Typography } from 'antd'
import { QuestionInfoPropsType } from './interface'

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  const { TextArea } = Input
  //当切换画布同类组件，还是共用同一个属性组件，但是传入不同的props，此时这个组件也要切换显示内容
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  //属性变化，触发自定义事件传递新的值到父组件，由父组件统一同步到redux-store中，从而引起页面变化
  function handleValuesChange() {
    if (onChange) onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题内容' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="描述" name="desc" rules={[{ required: true, message: '请输入描述内容' }]}>
        <TextArea style={{ height: '200px' }}></TextArea>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
