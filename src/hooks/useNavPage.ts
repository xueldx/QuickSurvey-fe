//路由鉴权
/*
（1）已经登录-输入登录或注册的路径，直接导航到问卷列表
（2）未登录且输入不需要登录的页面路径，不用做其他操做，直接让router跳转对应页面
（3）未登录但输入需要登录的页面路径，导航到登录页
*/

import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  isLoginOrRegister,
  isNONeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from '../router'
import { useEffect } from 'react'

function useNavPage(waitingLoadUserData: boolean) {
  const { pathname } = useLocation()
  const { username } = useGetUserInfo()
  const nav = useNavigate()

  useEffect(() => {
    //如果还在获取用户信息（不能确定是否有username），就先不执行后续判断
    if (waitingLoadUserData) return
    //已经登录-且输入登录或注册的路径，直接导航到问卷列表
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    //未登录
    //   未登录且输入不需要登录的页面路径，不用做其他操做，直接让router跳转对应页面
    if (isNONeedUserInfo(pathname)) {
      return
    } else {
      //未登录但输入需要登录的页面路径，导航到登录页
      nav(LOGIN_PATHNAME)
      return
    }
  }, [waitingLoadUserData, pathname, username])
}

export default useNavPage
