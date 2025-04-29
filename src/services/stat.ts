import axios, { ResDataType } from './ajax'

//获取单个问卷统计信息
export async function getQuestionStatListService(
  id: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/api/stat/${id}`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}
//获取单个问卷统计信息
export async function getQuestionComponentStatService(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
