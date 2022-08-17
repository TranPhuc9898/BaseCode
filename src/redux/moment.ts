import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { hoursToMilliseconds } from 'date-fns'
import { Moment } from 'moment'

interface MomentState {
  timeData?: number
}

const initialState: MomentState = {
  timeData: undefined
}

export const MomentSlice = createSlice({
  name: 'momentSlice',
  initialState: initialState,
  reducers: {
    addMoment: (state, action: PayloadAction<number>) => {
      state.timeData = action.payload
      console.log('TCL:  state.timeData', state.timeData)
    }
  }
})

export const { addMoment } = MomentSlice.actions
export default MomentSlice.reducer
