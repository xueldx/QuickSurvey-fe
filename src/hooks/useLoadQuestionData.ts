import { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { getQuestionService } from '../services/question'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  //发请求加载问卷信息
  const { loading, data, error, run } = useRequest(
    async id => {
      if (!id) throw new Error('没有问卷id，无法加载问卷信息')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  //得到数据存储到redux中
  useEffect(() => {
    if (!data) return
    const {
      title = '',
      desc = '',
      css = '',
      js = '',
      isPublished = false,
      componentList = [],
    } = data
    let selectedId = ''
    //默认选中第一个组件
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
    dispatch(resetPageInfo({ title, desc, css, js, isPublished }))
  }, [data])

  //id变化就加载对应的问卷数据
  useEffect(() => {
    run(id)
  }, [id])
  return { loading, error }
}

export default useLoadQuestionData
