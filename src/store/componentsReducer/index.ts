import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import { nanoid } from 'nanoid'
import { ComponentPropsType } from '../../components/questionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

//单个组件的类型信息
export type ComponentInfoType = {
  fe_id: string
  title: string
  type: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}
//组件列表的类型信息
export type ComponentsStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = { selectedId: '', componentList: [], copiedComponent: null }
//组件列表的分模块store
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置组件列表
    resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload
    },
    //改变当前被选中组件
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),
    //插入新组件信息
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
      }
    ),
    //改变组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        const { fe_id, newProps } = action.payload
        //找到当前要修改属性的组件
        const curComponent = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComponent == null) return
        curComponent.props = { ...curComponent.props, ...newProps }
      }
    ),
    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removedId, componentList = [] } = draft

      draft.selectedId = getNextSelectedId(removedId, componentList)

      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
    }),
    //切换当前被选中组件的显示与隐藏
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList = [] } = draft
        const { isHidden, fe_id } = action.payload

        // 重新计算 selectedId
        let newSelectedId = ''
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          // 要显示
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),
    //切换组件锁定状态
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList = [] } = draft
        const { fe_id } = action.payload
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
    //复制当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const curComp = componentList.find(c => c.fe_id === selectedId)
      if (curComp == null) return
      draft.copiedComponent = JSON.parse(JSON.stringify(curComp)) //深拷贝
    }),
    //粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return
      copiedComponent.fe_id = nanoid() //每个id都不一样
      insertNewComponent(draft, copiedComponent)
    }),
    //选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (selectedIndex < 0) return //未选中组件
      if (selectedIndex <= 0) return //选中的就是第一个，无法再向上选
      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),
    //选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
      if (selectedIndex < 0) return //未选中组件
      if (selectedIndex + 1 == componentList.length) return //选中的是最后一个，无法再向下选
      draft.selectedId = componentList[selectedIndex + 1].fe_id
    }),
    //修改标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { title, fe_id } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (!curComp) return
        curComp.title = title
      }
    ),
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = componentsSlice.actions
export default componentsSlice.reducer
