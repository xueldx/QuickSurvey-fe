import React, { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { QuestionRadioPropsType, optionType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const { TextArea } = Input

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value, onChange, disabled } = props
  const [form] = Form.useForm()
  //当切换画布同类组件，还是共用同一个属性组件，但是传入不同的props，此时这个组件也要切换显示内容
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value])

  //属性变化，触发自定义事件传递新的值到父组件，由父组件统一同步到redux-store中，从而引起页面变化
  function handleValuesChange() {
    if (!onChange) return
    const newVal = form.getFieldsValue() as QuestionRadioPropsType

    //清除没有值（text==undefine）的选项再同步到redux中，否则属性面板会删不了空选项
    if (newVal.options) {
      newVal.options = newVal.options.filter(opt => opt.text != null)
    }
    const { options = [] } = newVal
    options.forEach(opt => {
      if (!opt.value) opt.value = nanoid(5) //没有value的选项，增加独一无二的value
    })

    onChange(newVal)
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入单选框标题' }]}
      >
        <TextArea style={{ width: '240px', minHeight: '30px' }}></TextArea>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => {
            //fields= [{"isListField":true,"fieldKey":0,"name":0,"key":0},……] 是一个数组
            return (
              <>
                {/*遍历所有的选项（可删除）*/}
                {fields.map(({ name, key }, index) => (
                  <Space key={key} align="baseline">
                    {/*  当前选项的输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        {
                          validator: (_, text) => {
                            if (!text || !text.trim()) return Promise.reject('请输入选项名称')
                            return Promise.resolve()
                          },
                        },
                        {
                          validator: (_, text) => {
                            if (!text.trim()) return Promise.resolve()
                            const { options } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: optionType) => {
                              if (opt.text === text) num++ //记录和当前选项重复的选项个数，预期只有1个（就是当前选项本身）
                            })
                            if (num == 1) return Promise.resolve()
                            return Promise.reject('和其他选项重复了')
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项"></Input>
                    </Form.Item>
                    {/* 当前选项的删除按钮,从第三个可以删，最少保留两个 */}
                    {index >= 2 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                ))}
                {/*添加新选项*/}
                <Form.Item>
                  <Button
                    block
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => add({ text: '', value: '' })}
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options
            .map(({ text, value }) => ({ value, label: text || '' }))
            .concat([{ value: '', label: '无默认选中' }])}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
