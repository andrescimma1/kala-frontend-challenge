import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'

function parseUserId(id: number | string | undefined): number | null {
  if (id === undefined || id === '') {
    return null
  }

  const numericId = typeof id === 'number' ? id : Number(id)
  return Number.isFinite(numericId) && numericId > 0 ? numericId : null
}

export function useUser(id: number | string | undefined) {
  const userId = parseUserId(id)

  return useQuery({
    queryKey: usersQueryKeys.detail(userId ?? 'unknown'),
    queryFn: () => usersApi.getUserById(userId!),
    enabled: userId !== null,
  })
}
