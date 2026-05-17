import type { RootState } from '@/store/store'

export const selectSearchTerm = (state: RootState) =>
  state.usersUi.searchTerm

export const selectCurrentPage = (state: RootState) =>
  state.usersUi.currentPage

export const selectPageSize = (state: RootState) => state.usersUi.pageSize
