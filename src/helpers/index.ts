import moment from 'moment'

export function currencyFormat(num: number) {
  if (num === undefined) {
    return null
  }

  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + 'VND'
}

// export function forrmatDay(data: Array<[]>) {
//   for (let i = 0; i <= 6; i++) {
//     let b = moment().add(i, 'days').toDate()
//   }
// }

export const getWeekDays = () => {
  const final = []
  for (let i = 0; i < 7; i++) {
    let b = moment().add(i, 'days').toDate()
    final.push(b)
  }
  return final
}

export const formatLetter = (data: string) => {
  if (data == null) return 'Nothing'
  const a: string = data.split('')
  console.log(a[1], 'a[1]')
  if (a[0] === 'T') {
    const b: string = a[0].replace('T', 'Thứ')
    return b + ' ' + a[1]
  }
  data === 'CN'
  const c: string = data.replace('CN', 'Chủ nhật')
  return c
}
