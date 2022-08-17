export interface IData {
  icon?: string
  nameData: string
}

export interface IData2 {
  icon?: string
  nameData: string
  nameSup: string
}
export interface IData3 {
  id?: number
  time: number
  description: string
  mo?: number
  // isChoice: boolean
}

export interface InfoType {
  id?: string
  address?: string
  city?: string | undefined
  district?: string | undefined
  text?: string | undefined
  money?: number
}
export interface ChoiceType {
  id: number
  nameChoice?: string
}

export interface TimeType {
  id?: number
  date?: any | undefined
  day?: string | undefined
  month?: any | undefined
  year?: any | undefined
}

export interface IconType {
  id?: number
  iconName: string
}

// const dates = eachWeekOfInterval(
//   {
//     start: subDays(new Date(), 0),
//     end: addDays(new Date(), 0)
//   },
//   {
//     weekStartsOn: 0
//   }
// ).reduce((acc: Date[][], cur) => {
//   const allDays = eachDayOfInterval({
//     start: cur,
//     end: addDays(cur, 6)
//   })
//   // console.log('TCL: CleanHouseScreen:React.FC -> allDays', allDays)

//   acc.push(allDays)
//   // console.log('TCL: CleanHouseScreen:React.FCCC -> ', acc)
//   return acc
// }, [])
//  <View>
//                 {dates.map((week, i) => {
//                   console.log('TCL: i', i)
//                   return (
//                     <View key={i}>
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           justifyContent: 'space-around',
//                           paddingTop: 15
//                         }}
//                       >
//                         {week.map((day, i) => {
//                           console.log('TCL: i2', i)
//                           const txt = format(day, 'EEEEE')
//                           const weekday = [
//                             'CN',
//                             'T2',
//                             'T3',
//                             'T4',
//                             'T5',
//                             'T6',
//                             'T7'
//                           ]
//                           const d = new Date()
//                           let days = weekday[day.getDay()]
//                           console.log('TCL: days()', days)
//                           return (
//                             <>
//                               {(day.getDate() === d.getDate()) === true ? (
//                                 <View
//                                   style={{
//                                     backgroundColor: bTaskee,
//                                     paddingVertical: 10,
//                                     paddingHorizontal: 10,
//                                     borderRadius: 5
//                                   }}
//                                 >
//                                   <TouchableOpacity key={i}>
//                                     <Text style={styles.textChoice}>
//                                       {days}
//                                     </Text>

//                                     <View style={{ marginTop: 10 }}>
//                                       {day.getDate() < 10 ? (
//                                         <Text style={styles.textChoice}>
//                                           0{day.getDate()}
//                                         </Text>
//                                       ) : (
//                                         <Text style={styles.textChoice}>
//                                           {day.getDate()}
//                                         </Text>
//                                       )}
//                                     </View>
//                                   </TouchableOpacity>
//                                 </View>
//                               ) : (
//                                 <View
//                                   style={{
//                                     shadowColor: '#b0acac',
//                                     borderColor: '#b0acac',
//                                     borderWidth: 1,
//                                     paddingVertical: 10,
//                                     paddingHorizontal: 10,
//                                     borderRadius: 5
//                                   }}
//                                 >
//                                   <TouchableOpacity onPress={() => {}}>
//                                     <Text style={styles.text}>{days}</Text>

//                                     <View style={{ marginTop: 10 }}>
//                                       {day.getDate() < 10 ? (
//                                         <Text>0{day.getDate()} </Text>
//                                       ) : (
//                                         <Text>{day.getDate()}</Text>
//                                       )}
//                                     </View>
//                                   </TouchableOpacity>
//                                 </View>
//                               )}
//                             </>
//                           )
//                         })}
//                       </View>
//                     </View>
//                   )
//                 })}
//               </View>
