import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfoService } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const [waitingLoadUserData, setWaitingLoadUserData] = useState(true)
  const { username } = useGetUserInfo()
  const dispatch = useDispatch()
  //向服务端请求用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname })) //成功后把用户信息存到redux中
    },
    onFinally() {
      setWaitingLoadUserData(false) //设置等待状态
    },
  })
  //尝试获取用户信息
  useEffect(() => {
    if (username) {
      setWaitingLoadUserData(false)
      return
    }
    run()
  }, [username])

  return { waitingLoadUserData }
}
export default useLoadUserData
