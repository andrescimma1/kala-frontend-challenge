import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'

export interface UseUsersQueryParams {
  searchTerm: string
  limit: number
  skip: number
}

export function useUsersQuery({ searchTerm, limit, skip }: UseUsersQueryParams) {
  const trimmedSearchTerm = searchTerm.trim()

  return useQuery({
    queryKey: usersQueryKeys.list({ searchTerm: trimmedSearchTerm, limit, skip }),
    queryFn: () =>
      trimmedSearchTerm.length > 0
        ? usersApi.searchUsers({ q: trimmedSearchTerm, limit, skip })
        : usersApi.getUsers({ limit, skip }),
  })
}
