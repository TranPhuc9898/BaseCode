import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-eva-icons'
import { bTaskee } from '../themes/color'

type Props = {
  Name: any
  isCurrent?: boolean
  iconNumber?: any
}

export const BottomMenuItem = ({ Name, isCurrent, iconNumber }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'column'
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 6
        }}
      >
        {
          <Icon
            name={iconNumber}
            fill={isCurrent ? bTaskee : '#000'}
            width={25}
            height={25}
          />
        }
      </View>
      <View style={{}}>
        <Text
          style={{
            color: isCurrent ? bTaskee : '#50555C',
            textAlign: 'center'
          }}
        >
          {Name.toString()}
        </Text>
      </View>
    </View>
  )
}
