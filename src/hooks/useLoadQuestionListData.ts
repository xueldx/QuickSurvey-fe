import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../services/question'
import {
  LIST_PAGE_NUMBER,
  LIST_SEARCH_PARAMS_KEY,
  LIST_PAGE_PARAMS_KEY,
  LIST_PAGE_SIZE_PARAMS_KEY,
} from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}
function useLoadQuestionListData(ops: Partial<OptionType>) {
  const [searchParams] = useSearchParams()
  const { isStar, isDeleted } = ops

  const { data, error, loading } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAMS_KEY) || '') || 1
      const pageSize =
        parseInt(searchParams.get(LIST_PAGE_SIZE_PARAMS_KEY) || '') || LIST_PAGE_NUMBER
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )

  return { data, error, loading }
}

export default useLoadQuestionListData
