import React, { FC, useState } from 'react'
import { Typography, Spin, Table, Pagination } from 'antd'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionStatListService } from '../../../services/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './pageStat.module.scss'
import { STAT_LIST_PAGE_NUMBER } from '../../../constant'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
const PageStat: FC<PropsType> = props => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { componentList } = useGetComponentInfo()

  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_LIST_PAGE_NUMBER)

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      },
    }
  )

  const column = componentList.map(c => {
    const { fe_id, title, props, type } = c
    const colTitle = props!.title || title
    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id), setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })

  const dataSource = list.map((item: any) => ({ ...item, key: item._id }))
  const TableEle = (
    <>
      <div className={styles.tableContainer}>
        <Table
          size="middle"
          dataSource={dataSource}
          columns={column}
          scroll={{ x: 'max-content' }}
          pagination={false}
        ></Table>
      </div>
      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(page, pageSize) => {
            setPage(page), setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={4} style={{ textAlign: 'left' }}>
        答卷数量：{!loading && total}
      </Title>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin></Spin>
        </div>
      )}
      {!loading && TableEle}
    </div>
  )
}

export default PageStat
