import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { changeSelectedId } from '../../../store/componentsReducer'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import EditHeader from './EditHeader'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const Edit: FC = () => {
  const { title } = useGetPageInfo()
  useTitle(`问卷编辑--${title}`)
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={styles.container}>
      <EditHeader></EditHeader>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel></LeftPanel>
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading}></EditCanvas>
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel></RightPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Edit
