import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const DEFAULT_PAGE_SIZE = 5

export interface UsersUiState {
  searchTerm: string
  currentPage: number
  pageSize: number
}

const initialState: UsersUiState = {
  searchTerm: '',
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
}

const usersUiSlice = createSlice({
  name: 'usersUi',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
      state.currentPage = 1
    },
    resetPagination(state) {
      state.currentPage = 1
    },
    hydrateFromUrl(
      state,
      action: PayloadAction<{
        searchTerm: string
        currentPage: number
        pageSize: number
      }>,
    ) {
      state.searchTerm = action.payload.searchTerm
      state.currentPage = action.payload.currentPage
      state.pageSize = action.payload.pageSize
    },
  },
})

export const {
  setSearchTerm,
  setCurrentPage,
  setPageSize,
  resetPagination,
  hydrateFromUrl,
} = usersUiSlice.actions

export default usersUiSlice.reducer
