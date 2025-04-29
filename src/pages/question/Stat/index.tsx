import React, { FC, useState } from 'react'
import { Spin, Result, Button } from 'antd'
import { useTitle } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import styles from './index.module.scss'
import ComponentList from './ComponentList'
import PageStat from './pageStat'
import ComponentChart from './ComponentChart'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()

  //状态提升 统一管理下发给旗下的左中右三个组件的变量
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  useTitle(`问卷统计--${title}`)
  const LoadingEle = <Spin style={{ textAlign: 'center', marginTop: '20px' }}></Spin>
  function genContent() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该问卷尚未发布"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  nav(-1)
                }}
              >
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></ComponentList>
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></PageStat>
        </div>
        <div className={styles.right}>
          <ComponentChart
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          ></ComponentChart>
        </div>
      </>
    )
  }

  return (
    <div className={styles.container}>
      <StatHeader></StatHeader>
      <div className={styles['content-wrapper']}>
        {loading && LoadingEle}
        {!loading && <div className={styles.content}>{genContent()} </div>}
      </div>
    </div>
  )
}
export default Stat
