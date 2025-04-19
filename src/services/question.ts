import axios, { ResDataType } from './ajax'

type SearchOps = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}
//获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
//创建问卷
export async function creatQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}
//获取问卷列表
export async function getQuestionListService(ops: Partial<SearchOps> = {}): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: ops })) as ResDataType
  return data
}
//修改单个问卷信息
export async function updateQuestionService(
  id: any,
  ops: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, { ops })) as ResDataType
  return data
}
//复制问卷
export async function duplicateQuestionService(id: any): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}

//批量删除问卷
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType
  return data
}
