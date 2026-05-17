import {
  DEFAULT_PAGE_SIZE,
  type UsersUiState,
} from '../store/usersUiSlice'

export const SUPPORTED_PAGE_SIZES = [5, 10, 20] as const

export type SupportedPageSize = (typeof SUPPORTED_PAGE_SIZES)[number]

export function isSupportedPageSize(value: number): value is SupportedPageSize {
  return SUPPORTED_PAGE_SIZES.includes(value as SupportedPageSize)
}

function parsePositiveInt(value: string | null): number | null {
  if (value === null) {
    return null
  }

  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed)) {
    return null
  }

  return parsed
}

export function parseUsersListSearchParams(
  searchParams: URLSearchParams,
): Pick<UsersUiState, 'searchTerm' | 'currentPage' | 'pageSize'> {
  const page = parsePositiveInt(searchParams.get('page'))
  const pageSize = parsePositiveInt(searchParams.get('pageSize'))

  return {
    searchTerm: searchParams.get('search') ?? '',
    currentPage: page !== null && page >= 1 ? page : 1,
    pageSize:
      pageSize !== null && isSupportedPageSize(pageSize)
        ? pageSize
        : DEFAULT_PAGE_SIZE,
  }
}

export function buildUsersListSearchParams(
  state: Pick<UsersUiState, 'searchTerm' | 'currentPage' | 'pageSize'>,
): URLSearchParams {
  const params = new URLSearchParams()
  const search = state.searchTerm.trim()

  if (search.length > 0) {
    params.set('search', search)
  }

  if (state.currentPage > 1) {
    params.set('page', String(state.currentPage))
  }

  if (state.pageSize !== DEFAULT_PAGE_SIZE) {
    params.set('pageSize', String(state.pageSize))
  }

  return params
}

export function hasInvalidUsersListSearchParams(
  searchParams: URLSearchParams,
): boolean {
  const pageRaw = searchParams.get('page')
  if (pageRaw !== null && parsePositiveInt(pageRaw) === null) {
    return true
  }

  const pageSizeRaw = searchParams.get('pageSize')
  if (pageSizeRaw === null) {
    return false
  }

  const parsedPageSize = parsePositiveInt(pageSizeRaw)
  return parsedPageSize === null || !isSupportedPageSize(parsedPageSize)
}

export function areUsersListSearchParamsEqual(
  current: URLSearchParams,
  desired: URLSearchParams,
): boolean {
  if (hasInvalidUsersListSearchParams(current)) {
    return false
  }

  const normalizedCurrent = buildUsersListSearchParams(
    parseUsersListSearchParams(current),
  )

  return normalizedCurrent.toString() === desired.toString()
}

export function areUsersListUiStatesEqual(
  left: Pick<UsersUiState, 'searchTerm' | 'currentPage' | 'pageSize'>,
  right: Pick<UsersUiState, 'searchTerm' | 'currentPage' | 'pageSize'>,
): boolean {
  return (
    left.searchTerm === right.searchTerm &&
    left.currentPage === right.currentPage &&
    left.pageSize === right.pageSize
  )
}
