import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, questionData } = useLoadQuestionData()
  return (
    <>
      问卷统计
      {loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p>}
    </>
  )
}
export default Stat
