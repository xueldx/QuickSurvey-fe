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
  },
})

export const { resetComponents, changeSelectedId } = componentsSlice.actions
export default componentsSlice.reducer
