import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const { TextArea } = Input

const PageSetting: FC = () => {
  const dispatch = useDispatch()
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function changePageInfo() {
    const newVal = form.getFieldsValue()
    dispatch(resetPageInfo(newVal))
  }

  return (
    <Form layout="vertical" initialValues={pageInfo} onChange={changePageInfo} form={form}>
      <Form.Item
        name="title"
        label="问卷标题"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入问卷标题"></Input>
      </Form.Item>
      <Form.Item name="desc" label="问卷描述">
        <TextArea placeholder="问卷描述……"></TextArea>
      </Form.Item>
      <Form.Item name="css" label="样式代码">
        <TextArea placeholder="输入css样式代码……"></TextArea>
      </Form.Item>
      <Form.Item name="js" label="脚本代码">
        <TextArea placeholder="输入js脚本代码……"></TextArea>
      </Form.Item>
    </Form>
  )
}
export default PageSetting
