import { configureStore } from '@reduxjs/toolkit'
import usersUiReducer from '@/features/users/store/usersUiSlice'

export const store = configureStore({
  reducer: {
    usersUi: usersUiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
