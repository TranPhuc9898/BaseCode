import { TimeType } from '@/utils/types'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

interface TimeState {
  TimeList: Record<string, TimeType>
}

const initialState: TimeState = {
  TimeList: {}
}

export const TimeSlice = createSlice({
  name: 'timeSlice',
  initialState: initialState,
  reducers: {
    addTimetoList: (state, action: PayloadAction<TimeType>) => {
      const newTime: any = {
        id: action.payload.id,
        date: action.payload.date,
        day: action.payload.day
      }
      state.TimeList = newTime
      console.log('TCL: newTime', newTime)
    }
  }
})

export const { addTimetoList } = TimeSlice.actions
export default TimeSlice.reducer
