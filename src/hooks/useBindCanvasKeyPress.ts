import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer'

//判断当前鼠标活动元素是不是合法可以被删除的
function isValidActiveElement() {
  const activeEle = document.activeElement
  //没有选中input等用户输入组件，则是合法的可以被删除的元素
  if (activeEle == document.body) return true
  return false
}
function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  //删除的快捷键
  useKeyPress(['Backspace', 'delete'], () => {
    if (!isValidActiveElement()) return //如果是输入框等用户输入元素，则正常执行原环境的删除操作
    dispatch(removeSelectedComponent()) //否则删除选中组件
  })
  //复制的快捷键
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isValidActiveElement()) return //如果是输入框等用户输入元素，则正常执行原环境的复制操作
    dispatch(copySelectedComponent()) //否则复制选中组件
  })
  //粘贴的快捷键
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isValidActiveElement()) return //如果是输入框等用户输入元素，则正常执行原环境的粘贴操作
    dispatch(pasteCopiedComponent()) //否则粘贴组件
  })
  //选中上一个
  useKeyPress('uparrow', () => {
    if (!isValidActiveElement()) return
    dispatch(selectPrevComponent())
  })
  //选中上一个
  useKeyPress('downarrow', () => {
    if (!isValidActiveElement()) return
    dispatch(selectNextComponent())
  })
}

export default useBindCanvasKeyPress
