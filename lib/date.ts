//  当前日期
export const getNowDate: () => string = (): string => {
  const date = new Date()
  const year: number = date.getFullYear()
  const month: number = date.getMonth() + 1
  const day: number = date.getDate()

  return `${year}-${month}-${day}`
}
