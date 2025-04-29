import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionComponentStatService } from '../../../services/stat'
import { getComponentConfByType } from '../../../components/questionComponents'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}
const ComponentChart: FC<PropsType> = props => {
  const { selectedComponentId, selectedComponentType } = props
  const { id } = useParams()
  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) =>
      await getQuestionComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        const { stat } = res
        setStat(stat)
      },
    }
  )
  //当点击的组件变化时就要请求对应的统计数据
  useEffect(() => {
    run(id, selectedComponentId)
  }, [selectedComponentId, id])

  function genComponent() {
    if (!selectedComponentId) return <div>没有选中组件</div>
    const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
    if (!StatComponent) return <div>该组件无统计信息</div>
    return <StatComponent stat={stat}></StatComponent>
  }

  return (
    <div>
      <Title level={4} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
        图表统计
      </Title>
      <div style={{ marginTop: '50px' }}>{genComponent()}</div>
    </div>
  )
}

export default ComponentChart
