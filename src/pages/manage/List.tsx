import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import styles from './common.module.scss'
import QuestionCard from '../../components/QuestionCard'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import classNames from 'classnames'
import { Typography, Spin, Empty } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../../services/question'
import { LIST_SEARCH_PARAMS_KEY, LIST_PAGE_NUMBER } from '../../constant'
const { Title } = Typography

const List: FC = () => {
  useTitle('搭搭问-我的问卷')
  const [searchParams] = useSearchParams()
  const [list, setList] = useState([]) //已经加载的数据列表
  const [page, setPage] = useState(1) //当前加载的页数,不在url中体现
  const [total, setTotal] = useState(0) //数据总数
  const [started, setStarted] = useState(false) //标记是否已经开始加载（防抖有1s的延迟时间）

  const haveMore = list.length < total
  const keyword = searchParams.get(LIST_SEARCH_PARAMS_KEY) || ''
  //关键字变化，重新设置数据
  useEffect(() => {
    setList([]) //累计的问卷数量
    setTotal(0)
    setPage(1)
    setStarted(false)
  }, [keyword])

  //真正加载数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = getQuestionListService({
        keyword,
        page,
        pageSize: LIST_PAGE_NUMBER,
      })
      return data
    },
    {
      manual: true,
      onSuccess: result => {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l)) //累计的问卷数量
        setTotal(total)
        setPage(page + 1) //成功加载一次，页面page+1
      },
    }
  )
  //根据‘加载更多是否显示在页面中来判断是否需要加载’
  const contentRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  async function tryLoadMore() {
    if (!loadMoreRef.current || !contentRef.current) return
    const loadMoreRect = loadMoreRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()
    if (!loadMoreRect || !contentRect) return
    if (loadMoreRect.bottom <= contentRect.bottom) {
      load()
      setStarted(true)
    }
  }
  //防抖处理：使用ahooks
  const { run: debouncedTryLoadMore } = useDebounceFn(tryLoadMore, { wait: 1000 })

  //页面一挂载就加载一次数据，搜索关键字变化也加载数据（配合清空操作）
  useEffect(() => {
    debouncedTryLoadMore()
  }, [searchParams])

  //搜索关键字变化且页面滚动时加载更多
  useEffect(() => {
    haveMore &&
      contentRef.current &&
      contentRef.current.addEventListener('scroll', debouncedTryLoadMore)

    return () => {
      contentRef.current && contentRef.current.removeEventListener('scroll', debouncedTryLoadMore)
    }
  }, [searchParams, haveMore])

  const loadMoreEle = useMemo(() => {
    if (!started || loading) return <Spin></Spin>
    if (total == 0) return <Empty description="暂无数据"></Empty>
    if (!haveMore) return <p>没有更多了</p>
    return <p>开始加载下一页</p>
  }, [started, loading, total, haveMore])
  const contentClass = classNames({
    [styles.content]: true,
    [styles.listContent]: true,
  })
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={contentClass} ref={contentRef}>
        {list.map((q: any) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
        <div className={styles.footer}>
          <div ref={loadMoreRef}>{loadMoreEle}</div>
        </div>
      </div>
    </>
  )
}
export default List
