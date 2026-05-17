import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'
import type { PaginationParams } from '../types/api'

export interface UseUsersParams extends PaginationParams {
  search: string
}

export function useUsers({ limit, skip, search }: UseUsersParams) {
  const query = search.trim()
  const isSearch = query.length > 0

  return useQuery({
    queryKey: isSearch
      ? usersQueryKeys.search({ q: query, limit, skip })
      : usersQueryKeys.list({ limit, skip }),
    queryFn: () =>
      isSearch
        ? usersApi.searchUsers({ q: query, limit, skip })
        : usersApi.getUsers({ limit, skip }),
  })
}
