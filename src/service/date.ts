export function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`
}

export function format(value: Date): string {
  const year = value.getFullYear()
  const month = padZero(value.getMonth() + 1)
  const day = padZero(value.getDate())
  const hour = padZero(value.getHours())
  const minute = padZero(value.getMinutes())
  const second = padZero(value.getSeconds())

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
