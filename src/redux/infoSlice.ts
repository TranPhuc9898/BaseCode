import { InfoType } from '@/utils/types'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

interface InfoState {
  InfoList: Record<string, InfoType>
}

const initialState: InfoState = {
  InfoList: {}
}

export const InfoSlice = createSlice({
  name: 'infoSlice',
  initialState: initialState,
  reducers: {
    addInfoToList: (state, action: PayloadAction<InfoType>) => {
      const newInfo: any = {
        id: nanoid(),
        address: action.payload.address,
        city: action.payload.city,
        district: action.payload.district,
        text: action.payload.text,
        money: action.payload.money
      }
      state.InfoList = newInfo
      console.log('newInfo', newInfo)
    }
  }
})

export const { addInfoToList } = InfoSlice.actions

export default InfoSlice.reducer
