import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  const {
    componentList = [],
    selectedId = '',
    copiedComponent = null,
  } = useSelector<StateType>(state => state.components.present) as ComponentsStateType

  //当前选中的组件信息
  const selectedComponent = componentList.find(c => c.fe_id === selectedId)

  return { componentList, selectedId, selectedComponent, copiedComponent }
}

export default useGetComponentInfo
