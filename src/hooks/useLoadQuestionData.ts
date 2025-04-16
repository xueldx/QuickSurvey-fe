import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'

function useLoadQuestionData() {
  const [loading, setLoading] = useState(true)
  const [questionData, setQuestionData] = useState({})
  const { id = '' } = useParams()
  useEffect(() => {
    async function fn() {
      const data = await getQuestionService(id)
      setQuestionData(data)
      setLoading(false)
    }
    fn()
  }, [])
  return { loading, questionData }
}

export default useLoadQuestionData
