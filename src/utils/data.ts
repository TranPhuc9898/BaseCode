import { AriaAttributes } from 'react'
import { ChoiceType, IconType, IData, IData3 } from '../utils/types'
import { IData2 } from '../utils/types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { nanoid } from '@reduxjs/toolkit'

export const LIST_DATA: Array<IData> = [
  {
    icon: '../assets/icon/images.jpeg',
    nameData: 'Giúp việc nhà theo giờ'
  },
  {
    icon: '../assets/icon/images.jpeg',
    nameData: 'Chăm sóc người bệnh, người cao tuổi'
  },
  {
    icon: '../assets/icon/images.jpeg',
    nameData: 'Trông trẻ'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Tổng vệ sinh'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Vệ sinh máy lạnh'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Nấu ăn gia đình'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Giặt ủi'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Dọn dẹp buồng phòng'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Khử khuẩn'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Vệ sinh sofa, rèm, nệm'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'bTaskee cho doanh nghiệp'
  }
]

export const LIST_DATA2: Array<IData2> = [
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'bRewards',
    nameSup: '- Tích điểm đổi quà'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'bPay',
    nameSup: '- Thanh toán nhanh chóng, tiện lợi'
  },
  {
    icon: require('../assets/icon/images.jpeg'),
    nameData: 'Chat/Call',
    nameSup: '- Trao đổi trực tiếp với người làm'
  }
]

export const LIST_DATA3: Array<IData3> = [
  {
    id: 0,
    time: 2,
    description: '55m² / 2 phòng',
    mo: 280000
    // isChoice: false
  },
  {
    id: 1,
    time: 3,
    description: '85m² / 3 phòng',
    mo: 320000
    // isChoice: true
  },
  {
    id: 2,
    time: 4,
    description: '105m² / 4 phòng',
    mo: 520000

    // isChoice: false
  }
]
export const LIST_DATA4: Array<ChoiceType> = [
  {
    id: 0,
    nameChoice: 'Nhà/nhà phố'
    // isChoice: false
  },
  {
    id: 1,
    nameChoice: 'Căn hộ'
    // isChoice: false
  },
  {
    id: 2,
    nameChoice: 'Biệt thự'
    // isChoice: false
  }
]

// minutes
export const MINUTES_ARRAY = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
]

export const ICON: Array<IconType> = [
  {
    id: 0,
    iconName: 'home-outline'
    // active: true
  },
  {
    id: 1,
    iconName: 'file-text-outline'
  },
  {
    id: 2,
    iconName: 'person-outline'
  },
  {
    id: 3,
    iconName: 'headphones-outline'
  }
]
