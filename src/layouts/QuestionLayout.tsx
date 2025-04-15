import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <>
      <div>QuestionLayoutr</div>
      <div>
        <Outlet />
      </div>
    </>
  )
}
export default QuestionLayout
