export default function convertISODateToDate(isoDate: string): string {
  const date = new Date(isoDate)
  const year = date.getFullYear()
  // 月份从 0 开始计数，所以要加 1
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
