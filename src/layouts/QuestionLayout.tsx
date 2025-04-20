import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingLoadUserData } = useLoadUserData()
  useNavPage(waitingLoadUserData)

  return (
    <div style={{ height: '100vh' }}>
      {waitingLoadUserData ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Spin></Spin>
        </div>
      ) : (
        <Outlet></Outlet>
      )}
    </div>
  )
}
export default QuestionLayout
