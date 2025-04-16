import axios, { ResDataType } from './ajax'

export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}
export async function creatQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}
