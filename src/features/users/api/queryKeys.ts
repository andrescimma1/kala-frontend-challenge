export interface UsersListQueryKeyParams {
  searchTerm: string
  limit: number
  skip: number
}

export const usersQueryKeys = {
  all: ['users'] as const,
  lists: () => [...usersQueryKeys.all, 'list'] as const,
  list: (params: UsersListQueryKeyParams) =>
    [...usersQueryKeys.lists(), params] as const,
  searchCatalog: (searchTerm: string) =>
    [...usersQueryKeys.all, 'search-catalog', searchTerm] as const,
  details: () => [...usersQueryKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...usersQueryKeys.details(), id] as const,
} as const
