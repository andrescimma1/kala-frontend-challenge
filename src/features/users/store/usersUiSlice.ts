import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const DEFAULT_PAGE_SIZE = 5

export interface UsersUiState {
  search: string
  page: number
  pageSize: number
}

const initialState: UsersUiState = {
  search: '',
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
}

const usersUiSlice = createSlice({
  name: 'usersUi',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
      state.page = 1
    },
    resetUsersUi() {
      return initialState
    },
  },
})

export const { setSearch, setPage, setPageSize, resetUsersUi } =
  usersUiSlice.actions

export default usersUiSlice.reducer
