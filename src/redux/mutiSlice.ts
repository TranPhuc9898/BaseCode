import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { minutesToMilliseconds } from 'date-fns'

interface MutiState {
  index: number
}
const initialState: MutiState = {
  index: -1
}

export const mutiSlice = createSlice({
  name: 'mutiSlice',
  initialState: initialState,
  reducers: {
    addMutiIndex: (state, action: PayloadAction<number>) => {
      console.log('hello')
      state.index = action.payload
      console.log('TCL: action.payload', action.payload)
      console.log(state.index, 'Muti Slice')
    }
  }
})
export const { addMutiIndex } = mutiSlice.actions
export default mutiSlice.reducer
