import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { usersQueryKeys } from '../api/queryKeys'
import { parseUserId } from '../utils/parseUserId'

export function useUserQuery(id: number | string | undefined) {
  const userId = parseUserId(id)

  return useQuery({
    queryKey: usersQueryKeys.detail(userId ?? 'unknown'),
    queryFn: () => usersApi.getUserById(userId!),
    enabled: userId !== null,
  })
}
