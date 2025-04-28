import { useSelector } from 'react-redux'
import type { StateType } from '../store'
import { PageInfoStateType } from '../store/pageInfoReducer'

function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoStateType
  return pageInfo
}
export default useGetPageInfo
