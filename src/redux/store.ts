import { configureStore } from '@reduxjs/toolkit'
// const store = createStore(rootReducer);
import infoSliceReducer from './infoSlice'
import choiceSliceReducer from './choiceSlice'
import mutiSliceReducer from './mutiSlice'
import timeSliceReducer from './timeSlice'
import MomentSliceReducer from './moment'
const store = configureStore({
  reducer: {
    infoSlice: infoSliceReducer,
    choiceSlice: choiceSliceReducer,
    mutiSlice: mutiSliceReducer,
    timeSlice: timeSliceReducer,
    momentSlice: MomentSliceReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>

export default store
