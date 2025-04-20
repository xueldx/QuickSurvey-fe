import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import QuestionTitle from '../../../components/questionComponents/questionTitle/component'
import QuestionInput from '../../../components/questionComponents/questionInput/component'

const EditCanvas: FC = () => {
  return (
    <div className={styles.canvas}>
      <div className={styles['component-wrapper']}>
        <QuestionTitle></QuestionTitle>
      </div>
      <div className={styles['component-wrapper']}>
        <QuestionInput></QuestionInput>
      </div>
    </div>
  )
}
export default EditCanvas
