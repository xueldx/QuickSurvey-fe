import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { ComponentPropsType } from '../../components/questionComponents'

//单个组件的类型信息
export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  props: ComponentPropsType
}
//组件列表的类型信息
export type ComponentsStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentsStateType = { selectedId: '', componentList: [] }
//组件列表的分模块store
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload
    },
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        const { selectedId, componentList } = draft
        const index = componentList.findIndex(c => c.fe_id === selectedId)
        if (index < 0) {
          //没有选中任何一个组件,直接添加到最末尾
          componentList.push(newComponent)
        } else {
          // 选中了组件，放在该组件的下面
          componentList.splice(index + 1, 0, newComponent)
        }
        draft.selectedId = newComponent.fe_id
      }
    ),
  },
})

export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions
export default componentsSlice.reducer
