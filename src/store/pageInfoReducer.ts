import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'

export type PageInfoStateType = {
  title: string
  desc: string
  css: string
  js: string
}

const INIT_STATE = {
  title: '',
  desc: '',
  css: '',
  js: '',
}

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo(state: PageInfoStateType, action: PayloadAction<PageInfoStateType>) {
      return action.payload
    },
    changeTitle: produce((draft: PageInfoStateType, action: PayloadAction<string>) => {
      const newTitle = action.payload
      draft.title = newTitle
    }),
  },
})
export const { resetPageInfo, changeTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
