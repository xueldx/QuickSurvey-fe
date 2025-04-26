import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { QuestionParagraphPropsType } from './interface'

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  const { TextArea } = Input
  //当切换画布同类组件，还是共用同一个属性组件，但是传入不同的props，此时这个组件也要切换显示内容=>非必要（redux自动获取新数据然后更新页面），但以防万一
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])
  //属性变化，触发自定义事件传递新的值到父组件，由父组件统一同步到redux-store中，从而引起页面变化
  function handleValuesChange() {
    if (onChange) onChange(form.getFieldsValue())
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea style={{ height: '200px' }}></TextArea>
      </Form.Item>

      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
