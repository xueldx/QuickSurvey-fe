import React, { ChangeEvent, FC, useState, useEffect } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAMS_KEY } from '../constant'
const { Search } = Input
const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')

  //保持搜索框内容刷新不丢失
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
    setValue(curVal)
  }, [searchParams])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAMS_KEY}=${value}`,
    })
  }
  return (
    <Search
      placeholder="输入关键字搜索"
      allowClear
      style={{ width: '200px' }}
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    ></Search>
  )
}

export default ListSearch
