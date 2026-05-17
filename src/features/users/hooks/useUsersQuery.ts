import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'
import { filterUsersBySearchTerm } from '../utils/filterUsersBySearchTerm'

export interface UseUsersQueryParams {
  searchTerm: string
  limit: number
  skip: number
}

export function useUsersQuery({ searchTerm, limit, skip }: UseUsersQueryParams) {
  const queryClient = useQueryClient()
  const trimmedSearchTerm = searchTerm.trim()

  return useQuery({
    queryKey: usersQueryKeys.list({ searchTerm: trimmedSearchTerm, limit, skip }),
    queryFn: async () => {
      if (trimmedSearchTerm.length === 0) {
        return usersApi.getUsers({ limit, skip })
      }

      const filteredUsers = await queryClient.ensureQueryData({
        queryKey: usersQueryKeys.searchCatalog(trimmedSearchTerm),
        queryFn: async () => {
          const response = await usersApi.getUsers({ limit: 0, skip: 0 })
          return filterUsersBySearchTerm(response.users, trimmedSearchTerm)
        },
      })

      return {
        users: filteredUsers.slice(skip, skip + limit),
        total: filteredUsers.length,
        skip,
        limit,
      }
    },
  })
}
