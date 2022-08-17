// import {
//   Alert,
//   Button,
//   Modal,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native'
// import React, { useState } from 'react'
// import { DarkButton, gradientEnd, gray, green } from '@/themes/color'
// import LinearGradient from 'react-native-linear-gradient'

// import HapticFeedback from 'react-native-haptic-feedback'
// import { useCallback } from 'react'

// interface ISelectorTime {
//   limit?: any
//   defaultOffsetHour?: any
// }

// const Hours = [
//   '00',
//   '01',
//   '02',
//   '03',
//   '04',
//   '05',
//   '06',
//   '07',
//   '08',
//   '09',
//   '10',
//   '11',
//   '12',
//   '13',
//   '14',
//   '15',
//   '16',
//   '17',
//   '18',
//   '19',
//   '20',
//   '21',
//   '22',
//   '23'
// ]
// const Minutes = [
//   '00',
//   '01',
//   '02',
//   '03',
//   '04',
//   '05',
//   '06',
//   '07',
//   '08',
//   '09',
//   '10',
//   '11',
//   '12',
//   '13',
//   '14',
//   '15',
//   '16',
//   '17',
//   '18',
//   '19',
//   '20',
//   '21',
//   '22',
//   '23',
//   '24',
//   '25',
//   '26',
//   '27',
//   '28',
//   '29',
//   '30',
//   '31',
//   '32',
//   '33',
//   '34',
//   '35',
//   '36',
//   '37',
//   '38',
//   '39',
//   '40',
//   '41',
//   '42',
//   '43',
//   '44',
//   '45',
//   '46',
//   '47',
//   '48',
//   '49',
//   '50',
//   '51',
//   '52',
//   '53',
//   '54',
//   '55',
//   '56',
//   '57',
//   '58',
//   '59'
// ]

// let HoursYScroll
// let MinutesYScroll
// const SelectorTime: React.FC<ISelectorTime> = ({
//   limit,
//   defaultOffsetHour
// }) => {
//   const [selectedHour, setSelectedHour] = useState(
//     defaultOffsetHour.toString().padStart(2, '0')
//   )

//   const [shown, setShown] = useState(false)
//   const defaultOffset = limit * defaultOffsetHour
//   console.log('TCL: defaultOffset', defaultOffset)

//   const openSelectedHour = () => {
//     setShown(!shown)
//   }
//   const handleSelectedHour = useCallback((event: any) => {
//     HoursYScroll = event.nativeEvent.contentOffset.y
//     console.log('TCL: handleSelectedHour -> HoursYScroll', HoursYScroll)
//     if (HoursYScroll < 0) {
//       setSelectedHour('00')
//       return
//     }
//     if (HoursYScroll > limit * 24) {
//       setSelectedHour('23')
//       return
//     }
//     for (let i = 0; i < 24; i++) {
//       let a = i * limit
//       console.log('TCL: handleSelectedHour -> a', a)
//       let b = (i + 1) * limit
//       if (HoursYScroll > a && HoursYScroll < b) {
//         if (selectedHour !== Hours[i]) {
//           setSelectedHour(Hours[i])
//           //   Haptics.selectionAsync()
//           HapticFeedback.trigger('impactLight')
//           return
//         }
//       }
//     }
//   }, [])

//   // const handleSelectedMinutes = (event: any) => {
//   //   MinutesYScroll = event.nativeEvent.contentOffset.y
//   //   if (MinutesYScroll < 0) {
//   //     setSelectedMinute('00')
//   //     return
//   //   }
//   //   if (MinutesYScroll > limit * 60) {
//   //     setSelectedMinute('59')
//   //     return
//   //   }
//   //   for (let i = 0; i < 60; i++) {
//   //     let a = i * limit
//   //     let b = (i + 1) * limit
//   //     if (MinutesYScroll > a && MinutesYScroll < b) {
//   //       if (selectedMinute !== Minutes[i]) {
//   //         setSelectedMinute(Minutes[i])
//   //         //   Haptics.selectionAsync()
//   //         HapticFeedback.trigger('impactLight')
//   //         return
//   //       }
//   //     }
//   //   }
//   // }

//   return (
//     <View
//       style={{
//         backgroundColor: gradientEnd,

//         marginRight: 15
//       }}
//     >
//       <View style={styles.pickerConatiner}>
//         <View style={styles.selectedView}>
//           <Pressable onPress={openSelectedHour} style={{}}>
//             <Text style={styles.selectedText}>{selectedHour}</Text>
//           </Pressable>
//         </View>

//         <View style={styles.scrollContainer}>
//           {/* <LinearGradient
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               width: '100%',
//               height: 200,
//               zIndex: 99
//             }}
//             colors={[gradientEnd, 'rgba(40, 50, 54, 0)', 'rgba(0, 0, 0, 0)']}
//             pointerEvents={'none'}
//           /> */}

//           <LinearGradient
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               width: '100%',
//               height: 200,
//               zIndex: 99
//             }}
//             colors={['rgba(0, 0, 0, 0)', 'rgba(40, 50, 54, 0)', gradientEnd]}
//             pointerEvents={'none'}
//           />

//           {shown && (
//             <Modal transparent visible={shown} animationType={'fade'}>
//               <SafeAreaView style={styles.modalBackGround}>
//                 <View style={styles.modalContainer}>
//                   <ScrollView
//                     contentContainerStyle={styles.contentContainer}
//                     contentOffset={{
//                       x: 0,
//                       y: defaultOffset
//                     }}
//                     scrollEventThrottle={16}
//                     onScroll={handleSelectedHour}
//                     showsVerticalScrollIndicator={false}
//                     style={styles.modalView}
//                   >
//                     <View style={{ paddingVertical: Hours.length }}>
//                       {Hours.map((item, index) => {
//                         return (
//                           <View style={styles.timeView} key={item}>
//                             <Text style={styles.timeText}>{item}</Text>
//                           </View>
//                         )
//                       })}
//                       <Text style={styles.selectedLabel}>Giờ</Text>
//                     </View>
//                   </ScrollView>
//                 </View>
//               </SafeAreaView>
//             </Modal>
//           )}
//         </View>
//         <View style={styles.scrollContainer}>
//           {/* <LinearGradient
//                 style={{
//                   position: 'absolute',
//                   bottom: 0,
//                   width: '100%',
//                   height: 200,
//                   zIndex: 99,
//                   bottom: 150
//                 }}
//                 colors={[gradientEnd, 'rgba(40, 50, 54, 0)', 'rgba(0, 0, 0, 0)']}
//                 pointerEvents={'none'}
//               /> */}
//           {/* <View style={styles.selectedView}>
//             <Text style={styles.selectedText}>{selectedMinute}</Text>
//             <Text style={styles.selectedLabel}>M</Text>
//           </View>
//           <LinearGradient
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               width: '100%',
//               height: 200,
//               zIndex: 99
//             }}
//             colors={['rgba(0, 0, 0, 0)', 'rgba(40, 50, 54, 0)', gradientEnd]}
//             pointerEvents={'none'}
//           /> */}
//           {/* <ScrollView
//             scrollEventThrottle={60}
//             onScroll={handleSelectedMinutes}
//             showsVerticalScrollIndicator={false}
//           >
//             <View style={{ paddingVertical: 170 }}>
//               {Minutes.map((item, index) => {
//                 return (
//                   <View style={styles.timeView} key={item}>
//                     <Text style={styles.timeText}>{item}</Text>
//                   </View>
//                 )
//               })}
//             </View>
//           </ScrollView> */}
//         </View>
//       </View>
//       <View style={styles.button}>
//         <Button
//           title={'Press here'}
//           color={'white'}
//           onPress={() => {
//             Alert.alert(`${selectedHour} : ${selectedMinute}`)
//           }}
//         />
//       </View>
//     </View>
//   )
// }

// export default SelectorTime

// const styles = StyleSheet.create({
//   pickerConatiner: {
//     alignSelf: 'center',
//     width: '75%',
//     height: 350,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   scrollContainer: {
//     width: '49%',
//     height: 350
//     // borderWidth: 1
//   },
//   timeView: {
//     width: '100%'
//   },
//   timeText: {
//     fontSize: 32,
//     color: 'white',
//     alignSelf: 'center',
//     paddingVertical: 12
//   },
//   selectedView: {
//     height: 45,
//     backgroundColor: gray,
//     borderRadius: 10,
//     padding: 10,
//     marginTop: 120,
//     width: 50
//   },
//   selectedText: {
//     fontSize: 22,
//     fontWeight: '400',

//     color: 'white',
//     textAlign: 'center'
//   },
//   selectedLabel: {
//     color: green,
//     alignSelf: 'flex-end',
//     top: 35,
//     right: 10
//   },
//   button: {
//     width: 200,
//     height: 50,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginTop: 30,
//     borderRadius: 20,
//     borderColor: 'white'
//   },
//   buttonText: {
//     fontSize: 20,
//     alignSelf: 'center',
//     color: 'white'
//   },
//   modalView: {
//     // paddingVertical: 30,
//     // backgroundColor: '#fedee1',
//     // borderRadius: 30,
//     // shadowColor: '#fedee1',
//     // shadowOffset: {
//     //   width: 1,
//     //   height: 1
//     // },
//     // shadowOpacity: 0.2
//   },
//   modalBackGround: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   modalContainer: {
//     width: 120,
//     height: '20%',
//     backgroundColor: gray,

//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   contentContainer: {
//     paddingVertical: -20,
//     marginTop: 20
//   }
// })
