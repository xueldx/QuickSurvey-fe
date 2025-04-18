import React, { FC, useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_NUMBER, LIST_PAGE_PARAMS_KEY, LIST_PAGE_SIZE_PARAMS_KEY } from '../constant'

type PropsType = {
  total: number
}
const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [searchParams] = useSearchParams()
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_NUMBER)
  //从urL参数中找到page pagesize,并且同步到Pagination组件中
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAMS_KEY) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAMS_KEY) || '') || LIST_PAGE_NUMBER
    setPageSize(pageSize)
  }, [searchParams])

  //当点击分页器，触发页面更新（修改url参数）
  const nav = useNavigate()
  const { pathname } = useLocation()
  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAMS_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAMS_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
  )
}
export default ListPage
