import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

type ChoiceState = {
  index: number
}

// const choiceList: ChoiceType[] = []

const initialState: ChoiceState = {
  index: -1
}

export const choiceSlice = createSlice({
  name: 'choiceSlice',
  initialState: initialState,
  reducers: {
    addChoiceIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload
    }
  }
})

export const { addChoiceIndex } = choiceSlice.actions
export default choiceSlice.reducer
// choiceList: ChoiceType[]
// choiceList,
// addChoiceSlice: (state, action: PayloadAction<ChoiceType[]>) => {
//   const newChoice = action.payload
//   state.choiceList = newChoice
//   console.log(newChoice, 'newChoice')
// },
// addChoiceSlice
